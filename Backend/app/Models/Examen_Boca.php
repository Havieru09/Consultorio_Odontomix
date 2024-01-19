<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Examen_Boca extends Model
{
    protected $table = 'examen_boca';
    protected $primaryKey = 'idboca';
    public $timestamps = false;
    protected $fillable = [
        'idboca',
        'nombre_boca',
    ];
    
}
