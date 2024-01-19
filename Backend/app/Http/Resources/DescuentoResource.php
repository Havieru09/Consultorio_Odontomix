<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DescuentoResource extends JsonResource
{
 
    public function toArray($request)
    {
        return [
            'iddescuento' => $this->iddescuento,
            'nombre_descuento' => $this->nombre_descuento,
            'porcentaje_descuento' => $this->porcentaje_descuento,
        ];
    }
}
