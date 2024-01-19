<?php

namespace App\Http\Controllers;

use App\Http\Resources\IdentificacionResource;
use Illuminate\Http\Request;
use App\Models\Tipo_Identificacion;

class IdentificacionController extends Controller
{
    public function index()
    {
        if (!$tipo_identificacion = Tipo_Identificacion::all()) {
            return response()->json(['errors' => 'No se encuentran el tipo_identificacion en la base de datos'], 404);
        }
        return IdentificacionResource::collection($tipo_identificacion);
}

    public function store(Request $request)
    {
        if (!$request->nombre_identificacion) {
            return response()->json(['errors' => 'Debe ingresar un nombre de identificacion'], 422);
        }

        return new IdentificacionResource(Tipo_Identificacion::create($request->all()));
    }

    public function show($ididentificacion)
    {
        if (!$tipo_identificacion = Tipo_Identificacion::find($ididentificacion)) {
            return response()->json(['errors' => 'Tipo_Identificacion no encontrado'], 404);
        }
        return new IdentificacionResource($tipo_identificacion);
    }

    public function update(Request $request, $ididentificacion)
    {
        if (!$tipo_identificacion = Tipo_Identificacion::find($ididentificacion)) {
            return response()->json(['errors' => 'No se encuentra el Tipo_Identificacion que desea actualizar'], 404);
        }
        $tipo_identificacion->update($request->all());
        return new IdentificacionResource($tipo_identificacion);
    }
    
}
