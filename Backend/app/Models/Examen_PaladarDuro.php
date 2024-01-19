<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Examen_PaladarDuro extends Model
{
    protected $table = 'examen_paladard';
    protected $primaryKey = 'idpaladard';
    public $timestamps = false;
    protected $fillable = [
        'idpaladard',
        'nombre_paladard',
    ];
}
