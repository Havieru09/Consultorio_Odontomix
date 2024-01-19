<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PacienteRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'ididentificacion' => 'required',
            'nombre_paciente' => 'required',
            'apellidos_paciente' => 'required',
            'identificacion_paciente' => 'required|unique:paciente',
            'edad_paciente' => 'required',
            'genero_paciente' => 'required',
            'telefono_paciente' => 'required',
        ];
    }

    public function messages(): array
    {
        return [
            'ididentificacion.required' => 'El campo tipo de identificación es obligatorio',
            'nombre_paciente.required' => 'El campo nombre es obligatorio',
            'apellidos_paciente.required' => 'El campo apellidos es obligatorio',
            'identificacion_paciente.required' => 'El campo identificación es obligatorio',
            'identificacion_paciente.unique' => 'El campo identificación ya existe',
            'edad_paciente.required' => 'El campo edad es obligatorio',
            'genero_paciente.required' => 'El campo género es obligatorio',
            'telefono_paciente.required' => 'El campo teléfono es obligatorio',
        ];
    }
}
