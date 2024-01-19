<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Odontograma extends Model
{
    protected $table = 'odontograma';
    protected $primaryKey = 'idodontograma';
    public $timestamps = false;
    protected $fillable = [
        'idodontograma',
        'idhistorial',
        'iddiente',
        'numero_fichaod',
        'fecha_odontograma',
        'estado_odontograma',
    ];

    public function historial_clinico()
    {
        return $this->belongsTo(Historial_Clinico::class, 'idhistorial');
    }

    public function diente()
    {
        return $this->belongsTo(Diente::class, 'iddiente');
    }

    protected static function boot()
    {
        parent::boot();
        date_default_timezone_set('America/Guayaquil');
        static::creating(function ($query) {
            $query->numero_fichaod = odontograma::all()->count() + 1;
            $query->fecha_odontograma = now();
        });
    }
}
