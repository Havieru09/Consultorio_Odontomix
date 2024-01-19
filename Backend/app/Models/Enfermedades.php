<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enfermedades extends Model
{
    use HasFactory;

    protected $table = 'enfermedades';
    protected $primaryKey = 'idenfermedades';
    public $timestamps = false;
    protected $fillable = [
        'idenfermedades',
        'nombre_enfermedad',
    ];

    public function enfermedad_pacientes()
    {
        return $this->hasMany(Enfermedad_Paciente::class, 'idenfermedad');
    }
}
