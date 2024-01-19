<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Examen_PaladarBlandoResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'idpaladarb' => $this->idpaladarb,
            'nombre_paladarb' => $this->nombre_paladarb,
        ];
    }
}
