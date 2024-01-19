<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ConsultaResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'idconsulta' => $this->idconsulta,
            'idcita' => $this->idcita,
            'motivo_consulta' => $this->motivo_consulta,
            'fecha_consulta' => date('d-m-Y H:i:s', strtotime($this->fecha_consulta)),
            'estado_consulta' => $this->estado_consulta,
            'cita' => new CitaResources($this->cita),
        ];
    }
}
