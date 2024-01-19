<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cabecera extends Model
{
    protected $table = 'cabecera_factura';
    protected $primaryKey = 'idcabecerafactura';
    public $timestamps = false;
    protected $fillable = [
        'idcabecerafactura',
        'idcliente',
        'n_documento',
        'concepto_factura',
        'descuento_factura',
        'tiva_factura',
        'total_factura',
        'fecha_factura',
        'estado_factura',
    ];
    
    public function detalle()
    {
        return $this->hasMany(Detalle::class, 'idcabecera');
    }

    public function cliente()
    {
        return $this->belongsTo(Clientes::class, 'idcliente');
    }

    protected static function boot()
    {
        parent::boot();
        date_default_timezone_set('America/Guayaquil');
        static::creating(function ($query) {
            $query->n_documento = Cabecera::all()->count() + 1;
            $query->estado_factura = 0;
            $query->fecha_factura = now();
        });
    }
}
