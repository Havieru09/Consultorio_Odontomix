<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Examen_OclusionResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'idoclusion' => $this->idoclusion,
            'nombre_oclusion' => $this->nombre_oclusion,
        ];
    }
}
