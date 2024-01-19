<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Examen_Labios extends Model
{
    protected $table = 'examen_labios';
    protected $primaryKey = 'idlabios';
    public $timestamps = false;
    protected $fillable = [
        'idlabios',
        'nombre_labios',
    ];
}
