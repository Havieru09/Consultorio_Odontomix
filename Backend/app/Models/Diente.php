<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Diente extends Model
{
    protected $table = 'dientes';
    protected $primaryKey = 'iddiente';
    public $timestamps = false;
    protected $fillable = [
        'iddiente',
        'idposiciond',
        'idubicaciond',
        'idcondicionesd',
        'idtratamientos',
        'idhistorial',
        'descripcion_diente',
    ];

    public function posicion_dental()
    {
        return $this->belongsTo(Posicion_Dental::class, 'idposiciond');
    }
    
    public function ubicacion_dental()
    {
        return $this->belongsTo(Ubicacion_Dental::class, 'idubicaciond');
    }

    public function condiciones_dentales()
    {
        return $this->belongsTo(Condiciones_Dentales::class, 'idcondicionesd');
    }

    public function tratamientos_dentales()
    {
        return $this->belongsTo(Tratamientos_Dentales::class, 'idtratamientos');
    }

    public function historial_clinico()
    {
        return $this->belongsTo(Historial_Clinico::class, 'idhistorial');
    }
}
