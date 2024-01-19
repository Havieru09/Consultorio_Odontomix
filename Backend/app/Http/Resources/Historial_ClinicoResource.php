<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Historial_Clinico;
use App\Http\Resources\PacienteResource;
use App\Http\Resources\ConsultaResource;
use App\Http\Resources\Enfermedad_PacienteResources;
use App\Http\Resources\Examen_ExtraoralResource;
use App\Http\Resources\Examen_IntraoralResource;
use App\Http\Resources\PreguntasResource;

class Historial_ClinicoResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'idhistorial' => $this->idhistorial,
            'idconsulta' => $this->idconsulta,
            'idpaciente' => $this->idpaciente,
            'idenfermedad_paciente' => $this->idenfermedad_paciente,
            'idexamen_extraoral' => $this->idexamen_extraoral,
            'idexamen_intraoral' => $this->idexamen_intraoral,
            'idpregunta' => $this->idpregunta,
            'numero_ficha' => $this->numero_ficha,
            'fecha_historial' => date('d-m-Y', strtotime($this->fecha_historial)),
            'estado_historial' => $this->estado_historial,
            'consulta' => new ConsultaResource($this->consulta),
            'paciente' => new PacientesResource($this->paciente),
            'enfermedad_paciente' => Enfermedad_PacienteResources::collection($this->whenLoaded('enfermedad_paciente')),
            'examen_extraoral' => new Examen_ExtraoralResource($this->examen_extraoral),
            'examen_intraoral' => new Examen_IntraoralResource($this->examen_intraoral),
            'pregunta' => new PreguntasResource($this->pregunta),
        ];
    }
}
