<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Examen_RebordeResource;
use App\Models\Examen_Reborde;

class Examen_RebordeController extends Controller
{
    public function index()
    {
        if (!$examen_reborde = Examen_Reborde::all()) {
            return response()->json(['errors' => 'No se encuentran examen_reborde en la base de datos'], 404);
        }
        return Examen_RebordeResource::collection($examen_reborde);
}

    public function store(Request $request)
    {
        if (!$request->nombre_reborde) {
            return response()->json(['errors' => 'Debe ingresar un nombre de reborde'], 422);
        }

        return new Examen_RebordeResource(Examen_Reborde::create($request->all()));
    }

    public function show($idreborde)
    {
        if (!$examen_reborde = Examen_Reborde::find($idreborde)) {
            return response()->json(['errors' => 'Examen_Reborde no encontrado'], 404);
        }
        return new Examen_RebordeResource($examen_reborde);
    }

    public function update(Request $request, $idreborde)
    {
        if (!$examen_reborde = Examen_Reborde::find($idreborde)) {
            return response()->json(['errors' => 'No se encuentra el Examen_Reborde que desea actualizar'], 404);
        }
        $examen_reborde->update($request->all());
        return new Examen_RebordeResource($examen_reborde);
    }
}