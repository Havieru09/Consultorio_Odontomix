<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Ubicacion_DentalResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'idubicaciond' => $this->idubicaciond,
            'idhemisferio_diente' => $this->idhemisferio_diente,
            'ubicacion_diente' => $this->ubicacion_diente,
            'nombre_diente' => $this->nombre_diente,
            'hemisferio' => new HemisferioResource($this->hemisferio)
        ];
    }
}
