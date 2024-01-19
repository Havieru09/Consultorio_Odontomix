<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Examen_Extraoral extends Model
{
    protected $table = 'examenes_extraoral';
    protected $primaryKey = 'idextraoral';
    public $timestamps = false;
    protected $fillable = [
        'idextraoral',
        'idexamen_cara',
        'idexamen_cabeza',
        'idexamen_atm',
        'idexamen_ganglios',
        'idexamen_labios',
        'idexamen_señasp',
    ];

    public function examen_cara()
    {
        return $this->belongsTo(Examen_Cara::class, 'idexamen_cara');
    }

    public function examen_cabeza()
    {
        return $this->belongsTo(Examen_Cabeza::class, 'idexamen_cabeza');
    }

    public function examen_atm()
    {
        return $this->belongsTo(Examen_Atm::class, 'idexamen_atm');
    }

    public function examen_ganglios()
    {
        return $this->belongsTo(Examen_Ganglios::class, 'idexamen_ganglios');
    }

    public function examen_labios()
    {
        return $this->belongsTo(Examen_Labios::class, 'idexamen_labios');
    }

    public function examen_señasp()
    {
        return $this->belongsTo(Examen_SeñasParticulares::class, 'idexamen_señasp');
    }
}
