<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string('secret_question')->nullable();
            $table->string('secret_answer')->nullable();
            // This is the crucial line that connects the item to the hub/user!
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('type'); // 'Lost' or 'Found'
            $table->string('category')->nullable();
            $table->string('location')->nullable();
            $table->string('image_url')->nullable(); // Matches React
            $table->string('contact_info')->nullable();
            $table->string('reward')->nullable();
            $table->integer('views')->default(0); // Matches React
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};