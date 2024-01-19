<?php

namespace App\Http\Resources;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Tratamientos_DentalesResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'idtratamientosd' => $this->idtratamientosd,
            'nombre_tratamiento' => $this->nombre_tratamiento,
            'descripcion_tratamiento' => $this->descripcion_tratamiento,
        ];
    }
}
