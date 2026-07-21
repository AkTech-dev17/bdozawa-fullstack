<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ItemController;

// The routes for your React frontend to communicate with
Route::get('/items', [ItemController::class, 'index']);
Route::post('/items', [ItemController::class, 'store']);