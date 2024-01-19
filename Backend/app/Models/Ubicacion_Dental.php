<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Ubicacion_Dental extends Model
{
    protected $table = 'ubicaciones_dientes';
    protected $primaryKey = 'idubicaciond';
    public $timestamps = false;
    protected $fillable = [
        'idubicaciond',
        'idhemisferio_diente',
        'ubicacion_diente',
        'nombre_diente'
    ];

    public function dientes():BelongsTo
    {
        return $this->belongsTo(Diente::class, 'idubicaciond', 'idubicaciond');
    }

    public function hemisferio():BelongsTo
    {
        return $this->belongsTo(Hemisferio::class, 'idhemisferio_diente', 'idhemisferio_diente');
    }
}
