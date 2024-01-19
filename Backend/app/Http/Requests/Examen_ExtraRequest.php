<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class Examen_ExtraRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'idexamen_cara' => 'required',
            'idexamen_cabeza' => 'required',
            'idexamen_atm' => 'required',
            'idexamen_ganglios' => 'required',
            'idexamen_labios' => 'required',
            'idexamen_señasp' => 'required',
        ];
    }

    public function messages(): array
    {
        return [
            'idexamen_cara.required' => 'El campo cara es requerido',
            'idexamen_cabeza.required' => 'El campo cabeza es requerido',
            'idexamen_atm.required' => 'El campo ATM es requerido',
            'idexamen_ganglios.required' => 'El campo ganglios es requerido',
            'idexamen_labios.required' => 'El campo labios es requerido',
            'idexamen_señasp.required' => 'El campo señas particulares es requerido',
        ];
    }
}
