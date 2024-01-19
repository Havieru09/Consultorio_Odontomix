<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Examen_Cabeza extends Model
{
    protected $table = 'examen_cabeza';
    protected $primaryKey = 'idcabeza';
    public $timestamps = false;
    protected $fillable = [
        'idcabeza',
        'nombre_cabeza',
    ];
}
