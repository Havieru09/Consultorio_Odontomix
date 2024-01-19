<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class Enfermedad_Paciente extends Model
{
    use HasFactory;

    protected $table = 'enfermedad_paciente';
    protected $primaryKey = 'idenfermedadpaciente';
    protected $foreignKey = 'idpaciente';
    public $timestamps = false;
    protected $fillable = [
        'idenfermedadpaciente',
        'idpaciente',
        'idenfermedad',
        'tratamiento_enfermedad',
    ];

    public function pacientes(): BelongsTo
    {
        return $this->belongsTo(Pacientes::class, 'idpaciente', 'idpaciente');
    }

    public function enfermedades()
    {
        return $this->belongsTo(Enfermedades::class, 'idenfermedad', 'idenfermedades');
    }

}
