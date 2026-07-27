<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;

class ItemController extends Controller
{
    // Fetch items to display on the feed
    public function index()
    {
        return Item::orderBy('created_at', 'desc')->get();
    }

    // Save a brand new item from your React form
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|string',
            'contact_info' => 'required|string',
        ]);

        $item = Item::create($request->all());

        return response()->json($item, 201);
    }
    // Delete an item when it is resolved
    public function destroy($id)
    {
        $item = Item::find($id);
        
        if ($item) {
            $item->delete();
            return response()->json(['message' => 'Item successfully removed!'], 200);
        }

        return response()->json(['message' => 'Item not found.'], 404);
    }
}