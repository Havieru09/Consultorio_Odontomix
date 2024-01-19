<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Descuento extends Model
{
    use HasFactory;

    protected $table = 'descuentos';
    protected $primaryKey = 'iddescuento';
    public $timestamps = false;
    protected $fillable = [
        'iddescuento',
        'nombre_descuento',
        'porcentaje_descuento',
    ];
}
