<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up(): void
{
    Schema::create('items', function (Blueprint $table) {
        $table->id();
        $table->string('title'); // e.g., "Lost iPhone 14", "Found Car Keys"
        $table->text('description'); // Detailed description of the item
        $table->string('type'); // Will strictly be either 'lost' or 'found'
        $table->string('location')->nullable(); // Where it was lost/found
        $table->string('image_path')->nullable(); // For the uploaded picture
        $table->string('contact_info'); // Phone number or email
        $table->timestamps();
    });
}
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};
