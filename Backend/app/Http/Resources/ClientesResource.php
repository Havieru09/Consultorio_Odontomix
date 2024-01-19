<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClientesResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'idcliente' => $this->idcliente,
            'ididentificacion' => $this->ididentificacion,
            'nombre_cliente' => $this->nombre_cliente,
            'apellidos_cliente' => $this->apellidos_cliente,
            'identificacion_cliente' => $this->identificacion_cliente,
            'edad_cliente' => $this->edad_cliente,
            'genero_cliente' => $this->genero_cliente,
            'telefono_cliente' => $this->telefono_cliente,
            'direccion_cliente' => $this->direccion_cliente,
            'correo_cliente' => $this->correo_cliente,
            'identificacion' => new IdentificacionResource($this->identificacion),
        ];
    }
}
