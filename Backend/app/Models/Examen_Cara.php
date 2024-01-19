<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Examen_Cara extends Model
{
    protected $table = 'examen_cara';
    protected $primaryKey = 'idcara';
    public $timestamps = false;
    protected $fillable = [
        'idcara',
        'nombre_cara',
    ];
}
