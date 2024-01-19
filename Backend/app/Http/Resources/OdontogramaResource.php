<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OdontogramaResource extends JsonResource
{

    public function toArray(Request $request)
    {
        return [
            'idodontograma' => $this->idodontograma,
            'idhistorial' => $this->idhistorial,
            'iddiente' => $this->iddiente,
            'numero_fichaod' => $this->numero_fichaod,
            'fecha_odontograma' => $this->fecha_odontograma,
            'estado_odontograma' => $this->estado_odontograma,
            'historial_clinico' => new Historial_ClinicoResource($this->historial_clinico),
            'diente' => new DienteResource($this->diente),
        ];
    }
}
