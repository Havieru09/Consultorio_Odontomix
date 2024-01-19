<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Cabecera;

class ItemResource extends JsonResource
{
    public function toArray($request)
    {
        $n_documento = Cabecera::all()->count() + 1; 
        return [
            'iditem' => $this->iditem,
            'idtratamiento' => $this->idtratamiento,
            'descripcion_item' => $this->descripcion_item,
            'precio_item' => $this->precio_item,
            'tratamientos_dentales' => $this->tratamientos_dentales,
            'n_documento' => $n_documento,
        ];
    }
}
