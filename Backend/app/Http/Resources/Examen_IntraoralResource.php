<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Examen_EnciaResource;
use App\Http\Resources\Examen_LenguaResource;
use App\Http\Resources\Examen_PaladarDuroResource;
use App\Http\Resources\Examen_PaladarBlandoResource;
use App\Http\Resources\Examen_BocaResoruce;
use App\Http\Resources\Examen_RebordeResource;
use App\Http\Resources\Examen_OclusionResource;

class Examen_IntraoralResource extends JsonResource
{
    public function toArray($request)
    {

        return [
            'idintraoral' => $this->idintraoral,
            'idexamen_encia' => $this->idexamen_encia,
            'idexamen_lengua' => $this->idexamen_lengua,
            'idexamen_paladar_duro' => $this->idexamen_paladar_duro,
            'idexamen_paladar_blando' => $this->idexamen_paladar_blando,
            'faringe' => $this->faringe,
            'idexamen_piso_boca' => $this->idexamen_piso_boca,
            'idexamen_reborde' => $this->idexamen_reborde,
            'idexamen_oclusion' => $this->idexamen_oclusion,
            'encia' => new Examen_EnciaResource($this->encia),
            'lengua' => new Examen_LenguaResource($this->lengua),
            'paladar_duro' => new Examen_PaladarDuroResource($this->paladar_duro),
            'paladar_blando' => new Examen_PaladarBlandoResource($this->paladar_blando),
            'piso_boca' => new Examen_BocaResoruce($this->piso_boca),
            'reborde' => new Examen_RebordeResource($this->reborde),
            'oclusion' => new Examen_OclusionResource($this->oclusion),
        ];

    }
}
