<?php

namespace App\Http\Controllers;

abstract class Controller
{
    //
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
