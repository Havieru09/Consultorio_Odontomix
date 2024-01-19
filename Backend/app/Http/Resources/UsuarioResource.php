<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Hash;

class UsuarioResource extends JsonResource
{
   
    public function toArray($request)
    {
        return [
           'idusuario' => $this->idusuario,
           'idroles' => $this->idroles,
            'nombre_usuario' => $this->nombre_usuario,
            'password' => Hash::make($this->password),
            'roles' => new RolesResource($this->roles),
        ];
    }
}
