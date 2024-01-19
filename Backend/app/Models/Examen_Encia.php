<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Examen_Encia extends Model
{

    protected $table = 'examen_encia';
    protected $primaryKey = 'idencia';
    public $timestamps = false;
    protected $fillable = [
        'idencia',
        'nombre_encia',
    ];
}
