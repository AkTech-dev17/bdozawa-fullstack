<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
 public function up()
{
    Schema::table('users', function (Blueprint $table) {
        $table->integer('trust_points')->default(0);
        $table->string('hero_badge')->default('New User');
        $table->integer('successful_returns')->default(0);
    });
}

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'is_verified_hub']);
        });
    }
};