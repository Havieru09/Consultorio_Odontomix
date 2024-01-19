<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DetalleResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'iddetalle' => $this->iddetalle,
            'idcabecera' => $this->idcabecera,
            'iditem' => $this->iditem,
            'detalle' => $this->detalle,
            'cantidad' => $this->cantidad,
            'descuento_detalle' => $this->descuento_detalle,
            'subtotal_detalle' => $this->subtotal_detalle,
            'item' => $this->item,
            'cabecera' => $this->cabecera,
        ];
    }
}
