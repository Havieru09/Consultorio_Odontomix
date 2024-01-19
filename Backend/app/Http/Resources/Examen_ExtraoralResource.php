<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Examen_CaraResource;
use App\Http\Resources\Examen_CabezaResource;
use App\Http\Resources\Examen_atmResoruce;
use App\Http\Resources\Examen_GangliosResource;
use App\Http\Resources\Examen_LabiosResource;
use App\Http\Resources\Examen_SeñasResource;

class Examen_ExtraoralResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'idextraoral' => $this->idextraoral,
            'idexamen_cara' => $this->idexamen_cara,
            'idexamen_cabeza' => $this->idexamen_cabeza,
            'idexamen_atm' => $this->idexamen_atm,
            'idexamen_ganglios' => $this->idexamen_ganglios,
            'idexamen_labios' => $this->idexamen_labios,
            'idexamen_señasp' => $this->idexamen_señasp,
            'examen_cara' => new Examen_CaraResource($this->examen_cara),
            'examen_cabeza' => new Examen_CabezaResource($this->examen_cabeza),
            'examen_atm' => new Examen_atmResoruce($this->examen_atm),
            'examen_ganglios' => new Examen_GangliosResource($this->examen_ganglios),
            'examen_labios' => new Examen_LabiosResource($this->examen_labios),
            'examen_señasp' => new Examen_SeñasResource($this->examen_señasp),
        ];
    }
}
