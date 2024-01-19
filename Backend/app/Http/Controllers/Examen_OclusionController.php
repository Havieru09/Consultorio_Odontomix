<?php

namespace App\Http\Controllers;

use App\Http\Resources\Examen_OclusionResource;
use Illuminate\Http\Request;
use App\Models\Examen_Oclusion;

class Examen_OclusionController extends Controller
{
    public function index()
    {
        if (!$examen_oclusion = Examen_Oclusion::all()) {
            return response()->json(['errors' => 'No se encuentra el examen_oclusion'], 404);
        }
        return Examen_OclusionResource::collection($examen_oclusion);
    }

    public function store(Request $request)
    {
        if (!$request->nombre_oclusion) {
            return response()->json(['errors' => 'No se pudo crear el examen_oclusion'], 422);
        }
        return new Examen_OclusionResource(Examen_Oclusion::create($request->all()));
    }

    public function show($idoclusion)
    {
        if (!$examen_oclusion = Examen_Oclusion::find($idoclusion)) {
            return response()->json(['errors' => 'No se encuentra el examen_oclusion'], 404);
        }
        return new Examen_OclusionResource($examen_oclusion);
    }

    public function update(Request $request, $idoclusion)
    {
        if (!$examen_oclusion = Examen_Oclusion::find($idoclusion)) {
            return response()->json(['errors' => 'No se encuentra el Examen_Oclusion que desea actualizar'], 404);
        }
        $examen_oclusion->update($request->all());
        return new Examen_OclusionResource($examen_oclusion);
    }
}
