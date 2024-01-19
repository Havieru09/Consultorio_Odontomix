<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class IdentificacionResource extends JsonResource
{
  
    public function toArray($request)
    {
        return [
            'ididentificacion' => $this->ididentificacion,
            'nombre_identificacion' => $this->nombre_identificacion,
        ];
    }
}
