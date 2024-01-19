<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EnfermedadesResources extends JsonResource
{

    public function toArray($request)
    {
        return [
            'idenfermedades' => $this->idenfermedades,
            'nombre_enfermedad' => $this->nombre_enfermedad,
        ];
    }
}
