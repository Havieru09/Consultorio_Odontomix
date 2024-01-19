<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hemisferio extends Model
{
    protected $table = 'hemisferio_diente';
    protected $primaryKey = 'idhemisferio_diente';
    public $timestamps = false;
    protected $fillable = [
        'idhemisferio_diente',
        'nombre_hemisferio',
        'descripcion_hemisferio'
    ];
}
