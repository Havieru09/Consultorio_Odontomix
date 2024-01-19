<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PreguntasResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'idpreguntas' => $this->idpreguntas,
            'respuesta1' => $this->respuesta1,
            'respuesta2' => $this->respuesta2,
            'respuesta3' => $this->respuesta3,
            'respuesta4' => $this->respuesta4,
        ];
    }
}
