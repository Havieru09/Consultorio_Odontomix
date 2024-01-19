<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Examen_SeñasResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'idseñas' => $this->idseñas,
            'nombre_señasp' => $this->nombre_señasp,
        ];
    }
}
