<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Examen_PaladarBlandoResource;
use App\Models\Examen_PaladarBlando;

class Examen_PaladarBlandoController extends Controller
{
    public function index()
    {
        if (!$examen_paladarblando = Examen_PaladarBlando::all()) {
            return response()->json(['errors' => 'No se encuentran examen_paladarblando en la base de datos'], 404);
        }
        return Examen_PaladarBlandoResource::collection($examen_paladarblando);
    }

    public function store(Request $request)
    {
        if (!$request->nombre_paladarblando) {
            return response()->json(['errors' => 'Debe ingresar un nombre de paladarblando'], 422);
        }

        return new Examen_PaladarBlandoResource(Examen_PaladarBlando::create($request->all()));
    }

    public function show($idpaladarblando)
    {
        if (!$examen_paladarblando = Examen_PaladarBlando::find($idpaladarblando)) {
            return response()->json(['errors' => 'Examen_PaladarBlando no encontrado'], 404);
        }
        return new Examen_PaladarBlandoResource($examen_paladarblando);
    }

    public function update(Request $request, $idpaladarblando)
    {
        if (!$examen_paladarblando = Examen_PaladarBlando::find($idpaladarblando)) {
            return response()->json(['errors' => 'No se encuentra el Examen_PaladarBlando que desea actualizar'], 404);
        }
        $examen_paladarblando->update($request->all());
        return new Examen_PaladarBlandoResource($examen_paladarblando);
    }
}
