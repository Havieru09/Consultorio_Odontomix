<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Examen_CabezaResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'idcabeza' => $this->idcabeza,
            'nombre_cabeza' => $this->nombre_cabeza,
        ];
    }
}
