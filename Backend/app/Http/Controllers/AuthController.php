<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\Usuario;
use Illuminate\Auth\Events\Login;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{

public function login(LoginRequest $request)
{
 
    $data = $request->validated();

    if (!Auth::attempt($data)) {
        return response([
            'errors' => 'Credenciales incorrectas'
        ], 401);
    }

    $user = Usuario::where('nombre_usuario', $data['nombre_usuario'])->firstOrFail();
        return response([
            'message' => 'success',
            'user' => $user
        ]);
    }
 

}