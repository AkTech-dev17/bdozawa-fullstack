<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item; // Imports your model

class ItemController extends Controller
{
    // 1. Fetch all items (Read)
    public function index()
    {
        $items = Item::all();
        return response()->json($items, 200);
    }

    // 2. Create a new item (Create)
    public function store(Request $request)
    {
        // Validate the incoming data from React
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'type' => 'required|string',
            'contact_info' => 'required|string',
        ]);

        // Save it to the database
        $item = Item::create($request->all());
        
        return response()->json($item, 201);
    }
}