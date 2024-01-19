<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Examen_Reborde extends Model
{
    protected $table = 'examen_reborde';
    protected $primaryKey = 'idreborde';
    public $timestamps = false;
    protected $fillable = [
        'idreborde',
        'nombre_reborde',
    ];
}
