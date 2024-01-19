<?php

namespace App\Http\Controllers;

use App\Http\Resources\Examen_EnciaResource;
use Illuminate\Http\Request;
use App\Models\Examen_Encia;

class Examen_EnciaController extends Controller
{
    public function index()
    {
        if (!$examen_encia = Examen_Encia::all()) {
            return response()->json(['errors' => 'No se encuentran examen_encia en la base de datos'], 404);
        }
        return Examen_EnciaResource::collection($examen_encia);
    }

    public function store(Request $request)
    {
        if (!$request->nombre_encia) {
            return response()->json(['errors' => 'No se pudo crear el examen_encia'], 422);
        }
        return new Examen_EnciaResource(Examen_Encia::create($request->all()));
    }

    public function show($idencia)
    {
        if (!$examen_encia = Examen_Encia::find($idencia)) {
            return response()->json(['errors' => 'No se encuentra el examen_encia'], 404);
        }
        return new Examen_EnciaResource($examen_encia);
    }

    public function update(Request $request, $idencia)
    {
        if (!$examen_encia = Examen_Encia::find($idencia)) {
            return response()->json(['errors' => 'No se encuentra el Examen_Encia que desea actualizar'], 404);
        }
        $examen_encia->update($request->all());
        return new Examen_EnciaResource($examen_encia);
    }
}
