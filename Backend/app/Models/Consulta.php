<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Consulta extends Model
{
    protected $table = 'consulta';
    protected $primaryKey = 'idconsulta';
    public $timestamps = false;
    protected $fillable = [
        'idconsulta',
        'idcita',
        'motivo_consulta',
        'fecha_consulta',
        'estado_consulta',
    ];

    public function cita(): BelongsTo
    {
        return $this->belongsTo(Cita::class, 'idcita', 'idcita');
    }

}
