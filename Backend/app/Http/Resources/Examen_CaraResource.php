<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Examen_CaraResource extends JsonResource
{
 
    public function toArray($request)
    {
        return [
            'idcara' => $this->idcara,
            'nombre_cara' => $this->nombre_cara,
        ];
    }
}
