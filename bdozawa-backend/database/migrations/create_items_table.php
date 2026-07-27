Schema::create('items', function (Blueprint $table) {
    $table->id();
    $table->string('title'); // Supports multi-language strings natively via utf8mb4
    $table->text('description')->nullable();
    $table->string('category');
    $table->string('status'); // lost / found
    $table->timestamps();
});