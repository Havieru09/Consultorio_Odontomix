<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Hash;
use App\Models\Usuario;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;

class LoginRequest extends FormRequest
{
    
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nombre_usuario' => ['required', 'exists:usuario',
            Rule::exists('usuario')->where(function ($query) {
                $query->where('nombre_usuario', $this->nombre_usuario);
            }),
        ],

            'password' => [
                'required',
                function ($attribute, $value, $fail) {
                    if (!$this->ValidaciónClave()) {
                        $fail('La clave es incorrecta');
                    }
                },
                
            ]
        ];
    }

    public function messages(): array
    {
        return [
            'nombre_usuario.required' => 'El nombre de usuario es requerido',
            'nombre_usuario.exists' => 'El nombre de usuario no existe',
            'password.required' => 'La clave es requerida',
        ];

    }

    protected function ValidaciónClave()
    {
        $usuario = Usuario::where('nombre_usuario', $this->nombre_usuario)->first();
    
        if ($usuario && Hash::check($this->password, $usuario->password)) {
            return true;
        }
    
        return false;
    }

    // public function validation()
    // {
        
    //     $rules = $this->rules();
    //     $messages = $this->messages();

    //     $validator = Validator::make($this->all(), $rules, $messages);

    //     if ($validator->fails()) {
    //         // Imprimir mensajes de error para depurar
    //         dd($validator->errors());

    //         // Devolver una respuesta JSON con los errores y código de estado 422
    //         return response()->json(['errors' => $validator->errors()], 422);
    //     }

    //     // Si la validación pasa, continuar con el resto de la lógica de tu aplicación
    //     // ...

    //     // Devolver una respuesta JSON de éxito si es necesario
    //     return response()->json(['success' => true]);
            
    // }
  

}
