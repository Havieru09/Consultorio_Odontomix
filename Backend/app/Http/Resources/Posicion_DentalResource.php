<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Posicion_DentalResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'idposiciond' => $this->idposiciond,
            'nombre_posiciond' => $this->nombre_posiciond,
            'descripcion_posiciond' => $this->descripcion_posiciond,
        ];
    }
}
