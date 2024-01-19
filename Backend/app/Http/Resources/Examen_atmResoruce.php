<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Examen_atmResoruce extends JsonResource
{

    public function toArray($request)
    {
        return [
            'idatm' => $this->idatm,
            'nombre_atm' => $this->nombre_atm,
        ];
    }
}
