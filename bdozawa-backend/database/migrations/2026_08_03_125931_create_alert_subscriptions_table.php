<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
 
public function up(): void
{
    Schema::create('alert_subscriptions', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
        
        // What are they looking for?
        $table->string('category')->nullable(); // e.g., 'Pets', 'Electronics'
        $table->string('search_keyword')->nullable(); // e.g., 'White cat', 'MacBook'
        
        // Where should we send the alert?
        $table->string('platform')->default('whatsapp'); // 'whatsapp' or 'viber'
        $table->string('phone_number'); // e.g., '+9647501234567'
        
        $table->timestamps();
    });
}
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alert_subscriptions');
    }
};
