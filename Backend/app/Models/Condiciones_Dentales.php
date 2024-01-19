<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Condiciones_Dentales extends Model
{
    protected $table = 'condiciones_dentales';
    protected $primaryKey = 'idcondicionesd';
    public $timestamps = false;
    protected $fillable = [
        'idcondicionesd',
        'nombre_condicion',
        'descripcion_condicion',
        'color_condicion',
    ];


    public function dientes(): BelongsTo
    {
        return $this->BelongsTo(Diente::class, 'idcondicionesd', 'idcondicionesd');
    }
}
