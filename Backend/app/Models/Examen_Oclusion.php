<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Examen_Oclusion extends Model
{
    protected $table = 'examen_oclusion';
    protected $primaryKey = 'idoclusion';
    public $timestamps = false;
    protected $fillable = [
        'idoclusion',
        'nombre_oclusion',
    ];
}
