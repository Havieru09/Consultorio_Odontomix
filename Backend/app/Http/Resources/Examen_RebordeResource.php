<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Examen_RebordeResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'idreborde' => $this->idreborde,
            'nombre_reborde' => $this->nombre_reborde,
        ];
    }
}
