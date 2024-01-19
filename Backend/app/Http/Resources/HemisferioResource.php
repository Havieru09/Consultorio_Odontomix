<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HemisferioResource extends JsonResource
{

    public function toArray(Request $request): array
    {
        return [
            'idhemisferio_diente' => $this->idhemisferio_diente,
            'nombre_hemisferio' => $this->nombre_hemisferio,
            'descripcion_hemisferio' => $this->descripcion_hemisferio,
        ];
    }
}
