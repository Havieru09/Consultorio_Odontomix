<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClienteRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'ididentificacion' => 'required',
            'nombre_cliente' => 'required',
            'apellidos_cliente' => 'required',
            'identificacion_cliente' => 'required|unique:cliente',
            'edad_cliente' => 'required',
            'genero_cliente' => 'required',
            'telefono_cliente' => 'required',
            'direccion_cliente' => 'required',
            'correo_cliente' => 'required',
        ];
    }

    public function messages(): array
    {
        return [
            'ididentificacion.required' => 'El campo tipo de identificación es obligatorio',
            'nombre_cliente.required' => 'El campo nombre es obligatorio',
            'apellidos_cliente.required' => 'El campo apellidos es obligatorio',
            'identificacion_cliente.required' => 'El campo identificación es obligatorio',
            'identificacion_cliente.unique' => 'Ya existe un cliente con esa identificación',
            'edad_cliente.required' => 'El campo edad es obligatorio',
            'genero_cliente.required' => 'El campo género es obligatorio',
            'telefono_cliente.required' => 'El campo teléfono es obligatorio',
            'direccion_cliente.required' => 'El campo dirección es obligatorio',
            'correo_cliente.required' => 'El campo correo es obligatorio',
        ];
    }
}
