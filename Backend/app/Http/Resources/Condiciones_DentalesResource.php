<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Condiciones_DentalesResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'idcondicionesd' => $this->idcondicionesd,
            'nombre_condicion' => $this->nombre_condicion,
            'descripcion_condicion' => $this->descripcion_condicion,
            'color_condicion' => $this->color_condicion,
        ];
    }
}
