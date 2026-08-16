<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\AlertSubscriptionController;

// Public routes (anyone can view items or subscribe to alerts)
Route::get('/items', [ItemController::class, 'index']);
Route::get('/items/{id}', [ItemController::class, 'show']);
Route::post('/alerts/subscribe', [AlertSubscriptionController::class, 'store']);

// Protected routes (only logged-in users can post, delete items, or confirm returns)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/items', [ItemController::class, 'store']);
    Route::delete('/items/{id}', [ItemController::class, 'destroy']);
   Route::post('/items/{id}/confirm-return', [ItemController::class, 'confirmReturn']);
   Route::post('/items/{id}/verify-secret', [ItemController::class, 'verifySecret']);
   });