<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Examen_PaladarBlando extends Model
{
    protected $table = 'examen_paladarb';
    protected $primaryKey = 'idpaladarb';
    public $timestamps = false;
    protected $fillable = [
        'idpaladarb',
        'nombre_paladarb',
    ];
}
