<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Examen_GangliosResource extends JsonResource
{

    
    public function toArray($request)
    {
        return [
            'idganglios' => $this->idganglios,
            'nombre_ganglios' => $this->nombre_ganglios,
        ];
    }
}
