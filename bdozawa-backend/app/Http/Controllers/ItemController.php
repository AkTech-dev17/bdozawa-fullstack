<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\User;
use App\Models\AlertSubscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ItemController extends Controller
{
    public function index()
    {
        // Fetch all items with their associated user, newest first
        $items = Item::with('user')->latest()->get();

        // Format the data exactly how your React Search.tsx expects it
        $formattedItems = $items->map(function ($item) {
            return [
                'id' => $item->id,
                'title' => $item->title,
                'description' => $item->description,
                'type' => $item->type,
                'category' => $item->category,
                'location' => $item->location,
                'views' => $item->views,
                
                // Laravel automatically calculates "2 hours ago", "1 day ago", etc.
                'timeAgo' => $item->created_at->diffForHumans(), 
                
                'image_url' => $item->image_url,
                'contact_info' => $item->contact_info,
                'reward' => $item->reward,
                
                // Pulling data and trust profile badges from the connected User model
                'owner_name' => $item->user ? $item->user->name : 'Unknown User',
                'is_verified_hub' => $item->user ? $item->user->is_verified_hub : false,
                'hero_badge' => $item->user ? $item->user->hero_badge : 'New User',
                'trust_points' => $item->user ? $item->user->trust_points : 0,
            ];
        });

        return response()->json($formattedItems);
    }

    public function store(Request $request)
    {
        // Validate incoming data including secret challenge fields
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|string', // 'lost' or 'found'
            'category' => 'nullable|string',
            'location' => 'nullable|string',
            'image_url' => 'nullable|string',
            'contact_info' => 'nullable|string',
            'reward' => 'nullable|string',
            'secret_question' => 'nullable|string',
            'secret_answer' => 'nullable|string',
        ]);

        // Securely assign the item to the currently logged-in user
        $validated['user_id'] = auth()->id(); 
        $validated['views'] = 0;

        // Create and save the item in the database
        $item = Item::create($validated);

        // TRIGGER SMART ALERTS FOR MATCHING SUBSCRIPTIONS
        $this->triggerSmartAlerts($item);

        return response()->json([
            'message' => 'Item posted successfully!',
            'item' => $item
        ], 201);
    }

    public function show($id)
    {
        $item = Item::with('user')->findOrFail($id);

        return response()->json([
            'id' => $item->id,
            'title' => $item->title,
            'description' => $item->description,
            'type' => $item->type,
            'category' => $item->category,
            'location' => $item->location,
            'views' => $item->views,
            'timeAgo' => $item->created_at->diffForHumans(),
            'image_url' => $item->image_url,
            'contact_info' => $item->contact_info,
            'reward' => $item->reward,
            'owner_name' => $item->user ? $item->user->name : 'Unknown User',
            'is_verified_hub' => $item->user ? $item->user->is_verified_hub : false,
            'hero_badge' => $item->user ? $item->user->hero_badge : 'New User',
            'trust_points' => $item->user ? $item->user->trust_points : 0,
            'secret_question' => $item->secret_question, // Exposed safely so claimants see the prompt
            // NOTE: secret_answer is intentionally omitted for security!
        ]);
    }

    public function verifySecret(Request $request, $id)
    {
        $item = Item::findOrFail($id);
        
        $request->validate([
            'answer' => 'required|string'
        ]);

        // Case-insensitive trimmed comparison for user-friendly accuracy
        if ($item->secret_answer && strcasecmp(trim($request->answer), trim($item->secret_answer)) === 0) {
            return response()->json([
                'success' => true,
                'message' => 'Verification successful! Ownership confirmed.',
                'contact_info' => $item->contact_info ?? 'Verified chat unlocked.'
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Incorrect answer. Please try again.'
        ], 422);
    }

    /**
     * Find matching alerts and send notifications
     */
    private function triggerSmartAlerts(Item $item)
    {
        // Find any alerts where the category matches (or the user selected 'All Categories')
        $matchingAlerts = AlertSubscription::where(function ($query) use ($item) {
            $query->where('category', $item->category)
                  ->orWhereNull('category'); // Matches if they didn't specify a category
        })->get();

        foreach ($matchingAlerts as $alert) {
            // Create the notification message
            $message = "Bdozawa Alert! A new {$item->type} item in {$item->category} has been posted: {$item->title}. Check it out here: http://localhost:5173/item/{$item->id}";

            // Log the alert to storage/logs/laravel.log for testing
            if ($alert->platform === 'whatsapp') {
                Log::info("WhatsApp triggered to {$alert->phone_number}: {$message}");
            } else if ($alert->platform === 'viber') {
                Log::info("Viber triggered to {$alert->phone_number}: {$message}");
            }
        }
    }

    public function confirmReturn($id)
    {
        $item = Item::findOrFail($id);
        $finder = User::findOrFail($item->user_id);
        
        $finder->successful_returns += 1;
        $finder->trust_points += 50;

        if ($finder->successful_returns >= 10) {
            $finder->hero_badge = 'Local Hero 🌟';
        } elseif ($finder->successful_returns >= 3) {
            $finder->hero_badge = 'Verified Finder 🛡️';
        } else {
            $finder->hero_badge = 'Trusted Member ✨';
        }

        $finder->save();

        return response()->json([
            'message' => 'Return confirmed successfully!',
            'finder' => $finder
        ]);
    }
}