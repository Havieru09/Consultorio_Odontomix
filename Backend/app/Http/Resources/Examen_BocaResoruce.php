<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Examen_BocaResoruce extends JsonResource
{

    public function toArray($request)
    {
        return [
            'idboca' => $this->idboca,
            'nombre_boca' => $this->nombre_boca,
        ];
    }
}
