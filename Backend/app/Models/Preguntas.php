<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Preguntas extends Model
{
    protected $table = 'preguntas';
    protected $primaryKey = 'idpreguntas';
    public $timestamps = false;
    protected $fillable = [
        'idpreguntas',
        'respuesta1',
        'respuesta2',
        'respuesta3',
        'respuesta4',
    ];
}
