<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Cita extends Model
{
    protected $table = 'cita';
    protected $primaryKey = 'idcita';
    protected $foreingKey = 'idpaciente';
    public $timestamps = false;
    protected $casts = [
        'fechahora_cita' => 'datetime',
    ];
    protected $fillable = [
        'idcita',
        'idcliente',
        'idpaciente',
        'concepto_cita',
        'fechahora_cita',
        'estado_cita',
    ];

    public function paciente(): BelongsTo
    {
        return $this->belongsTo(Pacientes::class, 'idpaciente', 'idpaciente');
    }

    public function cliente(): BelongsTo
    {
        return $this->belongsTo(Clientes::class, 'idcliente', 'idcliente');
    }

}
