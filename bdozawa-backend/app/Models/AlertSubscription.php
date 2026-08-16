<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AlertSubscription;

class AlertSubscriptionController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'phone_number' => 'required|string|max:20',
            'platform' => 'required|in:whatsapp,viber',
            'category' => 'nullable|string',
            'search_keyword' => 'nullable|string',
        ]);

        $alert = AlertSubscription::create([
            'user_id' => auth()->id(), // Will be null if guest, which is fine
            'phone_number' => $request->phone_number,
            'platform' => $request->platform,
            'category' => $request->category,
            'search_keyword' => $request->search_keyword,
        ]);

        return response()->json([
            'message' => 'Alert successfully set!',
            'alert' => $alert
        ], 201);
    }
}