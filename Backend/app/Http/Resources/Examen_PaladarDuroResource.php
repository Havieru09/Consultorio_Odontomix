<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Examen_PaladarDuroResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'idpaladard' => $this->idpaladard,
            'nombre_paladard' => $this->nombre_paladard,
        ];
    }
}
