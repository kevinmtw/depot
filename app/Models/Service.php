<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    // Table name (optional if it matches the plural of the model name)
    protected $table = 'services';

    // Mass-assignable attributes
    protected $fillable = [
        'name',
        'price_per_gallon',
        'image'
    ];

    // Casts for proper data formatting
    protected $casts = [
        'price_per_gallon' => 'decimal:2',
    ];
}
