<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Examen_Ganglios extends Model
{
    protected $table = 'examen_ganglios';
    protected $primaryKey = 'idganglios';
    public $timestamps = false;
    protected $fillable = [
        'idganglios',
        'nombre_ganglios',
    ];
}
