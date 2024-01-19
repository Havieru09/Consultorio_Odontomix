<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Examen_SeñasParticulares extends Model
{
    protected $table = 'examen_señasp';
    protected $primaryKey = 'idseñas';
    public $timestamps = false;
    protected $fillable = [
        'idseñas',
        'nombre_señasp',
    ];
}
