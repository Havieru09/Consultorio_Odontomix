<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RolesResource extends JsonResource
{

    public function toArray(Request $request): array
    {
        return [
            'idroles' => $this->idroles,
            'nombre_roles' => $this->nombre_roles,
        ];
    }
}
