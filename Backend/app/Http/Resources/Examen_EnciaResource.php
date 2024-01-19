<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Examen_EnciaResource extends JsonResource
{
 
    public function toArray($request)
    {
        return [
            'idencia' => $this->idencia,
            'nombre_encia' => $this->nombre_encia,
        ];
    }
}
