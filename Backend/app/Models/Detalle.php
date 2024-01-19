<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Detalle extends Model
{
    protected $table = 'detalle_factura';
    protected $primaryKey = 'iddetalle';
    public $timestamps = false;
    protected $fillable = [
        'iddetalle',
        'idcabecera',
        'iditem',
        'detalle',
        'cantidad',
        'descuento_detalle',
        'iva_detalle',
        'subtotal_detalle',
        'estado_detalle',
    ];

    public function item()
    {
        return $this->belongsTo(Item::class, 'iditem');
    }

    public function cabecera()
    {
        return $this->belongsTo(Cabecera::class, 'idcabecera', 'idcabecerafactura');
    }
}
