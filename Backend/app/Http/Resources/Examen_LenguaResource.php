<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Examen_LenguaResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'idlengua' => $this->idlengua,
            'nombre_lengua' => $this->nombre_lengua,
        ];
    }
}
