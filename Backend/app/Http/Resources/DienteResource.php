<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DienteResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'iddiente' => $this->iddiente,
            'idposiciond' => $this->idposiciond,
            'idubicaciond' => $this->idubicaciond,
            'idcondicionesd' => $this->idcondicionesd,
            'idtratamientos' => $this->idtratamientos,
            'idhistorial' => $this->idhistorial,
            'descripcion_diente' => $this->descripcion_diente,
            'posicion_dental' => new Posicion_DentalResource($this->posicion_dental),
            'ubicacion_dental' => new Ubicacion_DentalResource($this->ubicacion_dental),
            'condiciones_dentales' => new Condiciones_DentalesResource($this->condiciones_dentales),
            'tratamientos_dentales' => new Tratamientos_DentalesResource($this->tratamientos_dentales),
            'historial_clinico' => new Historial_ClinicoResource($this->historial_clinico),
        ];
    }
}
