<?php

namespace App\Http\Controllers;

use App\Http\Resources\RolesResource;
use App\Models\Roles;
use Illuminate\Http\Request;



class RolesController extends Controller
{
    public function index()
    {
        if (!$roles = Roles::all()) {
            return response()->json(['errors' => 'No se encuentran roles en la base de datos'], 404);
        }
        return RolesResource::collection($roles);
    }

    public function store(Request $request)
    {
        if (!$request->nombre_rol) {
            return response()->json(['errors' => 'Uno de los campos está vacio'], 422);
        }
        return new RolesResource(Roles::create($request->all()));
    }


    public function show($idroles)
    {
        if (!$roles = Roles::find($idroles)) {
            return response()->json(['errors' => 'Rol no encontrado'], 404);
        }
        return new RolesResource($roles);
    }

    public function update(Request $request, $idroles)
    {
        if (!$roles = Roles::find($idroles)) {
            return response()->json(['errors' => 'No se encuentra el rol que desea actualizar'], 404);
        }
        $roles->update($request->all());
        return new RolesResource($roles);
    }
}
