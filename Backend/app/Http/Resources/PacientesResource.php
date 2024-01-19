<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PacientesResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'idpaciente' => $this->idpaciente,
            'ididentificacion' => $this->ididentificacion,
            'nombre_paciente' => $this->nombre_paciente,
            'apellidos_paciente' => $this->apellidos_paciente,
            'identificacion_paciente' => $this->identificacion_paciente,
            'edad_paciente' => $this->edad_paciente,
            'altura_paciente' => $this->altura_paciente,
            'peso_paciente' => $this->peso_paciente,
            'genero_paciente' => $this->genero_paciente,
            'telefono_paciente' => $this->telefono_paciente,
            'direccion_paciente' => $this->direccion_paciente,
            'correo_paciente' => $this->correo_paciente,
            'identificacion' => new IdentificacionResource($this->identificacion),
        ];
    }
}
