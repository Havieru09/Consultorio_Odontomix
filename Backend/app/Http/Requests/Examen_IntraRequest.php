<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class Examen_IntraRequest extends FormRequest
{

    public function rules(): array
    {
        return [
            'idexamen_encia' => 'required',
            'idexamen_lengua' => 'required',
            'idexamen_paladar_duro' => 'required',
            'idexamen_paladar_blando' => 'required',
            'idexamen_piso_boca' => 'required',
            'idexamen_reborde' => 'required',
            'idexamen_oclusion' => 'required',
        ];
    }

    public function messages(): array
    {
        return [
            'idexamen_encia.required' => 'El examen de encia es requerido',
            'idexamen_lengua.required' => 'El examen de lengua es requerido',
            'idexamen_paladar_duro.required' => 'El examen de paladar duro es requerido',
            'idexamen_paladar_blando.required' => 'El examen de paladar blando es requerido',
            'idexamen_piso_boca.required' => 'El examen de piso de boca es requerido',
            'idexamen_reborde.required' => 'El examen de reborde es requerido',
            'idexamen_oclusion.required' => 'El examen de oclusion es requerido',
        ];
    }
}
