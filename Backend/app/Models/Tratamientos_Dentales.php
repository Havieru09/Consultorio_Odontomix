<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Tratamientos_Dentales extends Model
{
    protected $table = 'tratamientos_dentales';
    protected $primaryKey = 'idtratamientosd';
    public $timestamps = false;
    protected $fillable = [
        'idtratamientosd',
        'nombre_tratamiento',
        'descripcion_tratamiento',
    ];

    public function dientes(): BelongsTo
    {
        return $this->belongsTo(Diente::class, 'idtratamientosd', 'idtratamientosd');
    }
}
