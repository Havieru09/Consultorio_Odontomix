<?php

namespace App\Http\Resources;

use App\Http\Resources\EnfermedadesResources;
use App\Http\Resources\PacientesResource;
use Illuminate\Http\Resources\Json\JsonResource;

class Enfermedad_PacienteResources extends JsonResource
{

    public function toArray($request)
    {
        return [
            'idenfermedadpaciente' => $this->idenfermedadpaciente,
            'idpaciente' => $this->idpaciente,
            'idenfermedad' => $this->idenfermedad,
            'tratamiento_enfermedad' => $this->tratamiento_enfermedad,
            'pacientes' => new PacientesResource($this->pacientes),
            // 'enfermedades_loaded' => $this->relationLoaded('enfermedades'),
            'enfermedades' => new EnfermedadesResources($this->whenLoaded('enfermedades')),
        ];
    }
}
