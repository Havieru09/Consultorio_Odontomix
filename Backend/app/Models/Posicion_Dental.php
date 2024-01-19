<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Posicion_Dental extends Model
{
    protected $table = 'posicion_dental';
    protected $primaryKey = 'idposiciond';
    public $timestamps = false;
    protected $fillable = [
        'idposiciond',
        'nombre_posiciond',
        'descripcion_posiciond'
    ];

    public function dientes(): BelongsTo
    {
        return $this->belongsTo(Diente::class, 'idposiciond', 'idposiciond');
    }
}
