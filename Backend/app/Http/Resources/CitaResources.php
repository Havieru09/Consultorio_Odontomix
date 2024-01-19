<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\PacientesResource;
use App\Http\Resources\ClientesResource;


class CitaResources extends JsonResource
{

    public function toArray($request)
    {
        return [
            'idcita' => $this->idcita,
            'idcliente' => $this->idcliente,
            'idpaciente' => $this->idpaciente,
            'concepto_cita' => $this->concepto_cita,
            'fechahora_cita' => date('d-m-Y H:i:s', strtotime($this->fechahora_cita)),
            'estado_cita' => $this->estado_cita,
            'paciente' => new PacientesResource($this->paciente),
            'cliente' => new ClientesResource($this->cliente),
        ];
    }
}
