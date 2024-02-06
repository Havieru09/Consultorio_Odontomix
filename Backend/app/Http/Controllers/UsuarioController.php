<?php

namespace App\Http\Controllers;

use App\Http\Resources\UsuarioResource;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsuarioController extends Controller
{
    public function index()
    {

        if (!$usuarios = Usuario::all()) {
            return response()->json(['errors' => 'No se encuentran usuarios en la base de datos'], 404);
        }
        return UsuarioResource::collection($usuarios);
    }

    public function store(Request $request)
    {
        if(Usuario::where('nombre_usuario', 'LIKE', $request->nombre_usuario)->first()){
            return response()->json(['errors' => 'Ya existe un usuario con ese nombre'], 404);
        }
        
        $request->validate([
            'nombre_usuario' => 'required',
            'password' => 'required',
            'idroles' => 'required',
        ]);
        return new UsuarioResource(Usuario::create($request->all()));
    }

    public function show($idusuario)
    {
        if (!$usuarios = Usuario::find($idusuario)) {
            return response()->json(['errors' => 'Usuario no encontrado'], 404);
        }
        return new UsuarioResource($usuarios);
    }

    public function update(Request $request, $idusuario)
    {
        if (!$usuarios = Usuario::find($idusuario)) {
            return response()->json(['errors' => 'No se encuentra el usuario que desea actualizar'], 404);
        }
        $usuarios->update($request->all());
        return new UsuarioResource($usuarios);
    }

    public function destroy($idusuario)
    {
        if (!$usuarios = Usuario::find($idusuario)) {
            return response()->json(['errors' => 'No se encuentra el usuario que desea eliminar'], 404);
        }
        $usuarios->delete();
        return new UsuarioResource($usuarios);
    }
}
