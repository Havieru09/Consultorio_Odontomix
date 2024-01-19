<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Examen_LabiosResource extends JsonResource
{
  
    public function toArray($request)
    {
        return [
            'idlabios' => $this->idlabios,
            'nombre_labios' => $this->nombre_labios,
        ];
    }
    }

