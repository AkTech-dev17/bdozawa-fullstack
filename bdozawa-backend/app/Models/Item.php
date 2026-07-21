<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    // This allows us to insert data into these specific columns
    protected $fillable = [
        'title',
        'description',
        'type',
        'location',
        'image_path',
        'contact_info',
    ];
}