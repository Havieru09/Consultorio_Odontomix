<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DetalleRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'idcabecera' => 'required|exists:cabecera_factura,idcabecerafactura',
            'iditem' => 'required|exists:items,iditem|min:1',
            'subtotal_detalle' => 'required',
        ];
    }

    public function messages(): array
    {
        return [
            'idcabecera.required' => 'La cabecera es obligatoria',
            'idcabecera.exists' => 'La cabecera seleccionada no existe',
            'iditem.required' => 'Debe seleccionar un item',
            'iditem.exists' => 'El item seleccionado no existe',
            'detalle.required' => 'El campo detalle es obligatorio',
            'cantidad.required' => 'Debe colocar una cantidad',
            'subtotal_detalle.required' => 'No se ha podido calcular el subtotal del detalle',
        ];
    }
}
