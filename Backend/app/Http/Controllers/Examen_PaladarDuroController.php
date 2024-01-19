<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Examen_PaladarDuroResource;
use App\Models\Examen_PaladarDuro;

class Examen_PaladarDuroController extends Controller
{
    public function index()
    {
        if (!$examen_paladar_duro = Examen_PaladarDuro::all()) {
            return response()->json(['errors' => 'No se encuentran examen_paladar_duro en la base de datos'], 404);
        }
        return Examen_PaladarDuroResource::collection($examen_paladar_duro);
    }

    public function store(Request $request)
    {
        if (!$request->nombre_paladar_duro) {
            return response()->json(['errors' => 'Debe ingresar un nombre de paladar_duro'], 422);
        }

        return new Examen_PaladarDuroResource(Examen_PaladarDuro::create($request->all()));
    }

    public function show($idpaladar_duro)
    {
        if (!$examen_paladar_duro = Examen_PaladarDuro::find($idpaladar_duro)) {
            return response()->json(['errors' => 'Examen_PaladarDuro no encontrado'], 404);
        }
        return new Examen_PaladarDuroResource($examen_paladar_duro);
    }

    public function update(Request $request, $idpaladar_duro)
    {
        if (!$examen_paladar_duro = Examen_PaladarDuro::find($idpaladar_duro)) {
            return response()->json(['errors' => 'No se encuentra el Examen_PaladarDuro que desea actualizar'], 404);
        }
        $examen_paladar_duro->update($request->all());
        return new Examen_PaladarDuroResource($examen_paladar_duro);
    }
}
