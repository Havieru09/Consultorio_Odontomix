<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CabeceraResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'idcabecerafactura' => $this->idcabecerafactura,
            'idcliente' => $this->idcliente,
            'n_documento' => $this->n_documento,
            'concepto_factura' => $this->concepto_factura,
            'descuento_factura' => $this->descuento_factura,
            'total_factura' => $this->total_factura,
            'fecha_factura' => $this->fecha_factura,
            'detalle' => $this->detalle,
            'cliente' => $this->cliente,
        ];
    }
}
