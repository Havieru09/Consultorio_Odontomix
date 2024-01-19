<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Examen_Lengua extends Model
{
    protected $table = 'examen_lengua';
    protected $primaryKey = 'idlengua';
    public $timestamps = false;
    protected $fillable = [
        'idlengua',
        'nombre_lengua',
    ];
}
