<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CitaRequest extends FormRequest
{

    public function rules(): array
    {
        return [
            'concepto_cita' => 'required',
            'fechahora_cita' => 'unique:cita',
        ];
    }

    public function messages(): array
    {
        return [
            'concepto_cita.required' => 'El concepto de la cita es requerido',
            'fechahora_cita.unique' => 'La fecha y hora de la cita ya fue asignado a otra cita',
        ];
    }
}
