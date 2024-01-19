<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Pacientes extends Model
{
    use HasFactory;

    protected $table = 'paciente';
    protected $primaryKey = 'idpaciente';
    protected $foreingKey = 'ididentificacion';
    public $timestamps = false;
    protected $fillable = [
        'idpaciente',
        'ididentificacion',
        'nombre_paciente',
        'apellidos_paciente',
        'identificacion_paciente',
        'edad_paciente',
        'altura_paciente',
        'peso_paciente',
        'genero_paciente',
        'telefono_paciente',
        'direccion_paciente',
        'correo_paciente',
    ];

    public function identificacion(): HasOne
    {
        return $this->HasOne(Tipo_Identificacion::class, 'ididentificacion', 'ididentificacion');
    }
}
