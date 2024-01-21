<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Historial_Clinico extends Model
{

    protected $table = 'historial_clinico';
    protected $primaryKey = 'idhistorial';
    public $timestamps = false;
    protected $casts = [
        'fecha_historial' => 'datetime',
    ];
    protected $fillable = [
        'idhistorial',
        'idconsulta',
        'idpaciente',
        'idenfermedad_paciente',
        'idexamen_extraoral',
        'idexamen_intraoral',
        'idpregunta',
        'numero_ficha',
        'fecha_historial',
        'radiografia_historial',
        'URL',
        'estado_historial',
    ];

    public function consulta()
    {
        return $this->belongsTo(Consulta::class, 'idconsulta');
    }

    public function paciente()
    {
        return $this->belongsTo(Pacientes::class, 'idpaciente');
    }

    public function enfermedad_paciente()
    {
        return $this->hasMany(Enfermedad_Paciente::class, 'idenfermedadpaciente', 'idenfermedad_paciente');
    }

    public function examen_extraoral()
    {
        return $this->belongsTo(Examen_Extraoral::class, 'idexamen_extraoral');
    }

    public function examen_intraoral()
    {
        return $this->belongsTo(Examen_Intraoral::class, 'idexamen_intraoral');
    }

    public function pregunta()
    {
        return $this->belongsTo(Preguntas::class, 'idpregunta');
    }

    public function dientes()
    {
        return $this->belongsTo(Diente::class, 'idhistorial', 'idhistorial');
    }

    protected static function boot()
    {
        parent::boot();
        date_default_timezone_set('America/Guayaquil');
        static::creating(function ($query) {
            $query->numero_ficha = Historial_Clinico::all()->count() + 1;
            $query->fecha_historial = now();
        });
    }
}
