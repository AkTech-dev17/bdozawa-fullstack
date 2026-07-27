<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    // This tells Laravel: "It is safe to save data into these specific columns!"
    protected $fillable = [
        'title',
        'description',
        'type',
        'contact_info'
    ];
}