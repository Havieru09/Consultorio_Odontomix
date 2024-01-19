<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Examen_ATM extends Model
{

    protected $table = 'examen_atm';
    protected $primaryKey = 'idatm';
    public $timestamps = false;
    protected $fillable = [
        'idatm',
        'nombre_atm',
    ];
}
