<?php

namespace App\Http\Controllers;

use App\Http\Resources\Examen_CabezaResource;
use App\Models\Examen_Cabeza;
use Illuminate\Http\Request;

class Examen_CabezaController extends Controller
{
    public function index()
    {
        if (!$examen_cabeza = Examen_Cabeza::all()) {
            return response()->json(['errors' => 'No se encuentran examen_cabeza en la base de datos'], 404);
        }
        return Examen_CabezaResource::collection($examen_cabeza);
    }

    public function store(Request $request)
    {
        if (!$request->nombre_cabeza) {
            return response()->json(['errors' => 'No se pudo crear el examen_cabeza'], 422);
        }
        return new Examen_CabezaResource(Examen_Cabeza::create($request->all()));
    }

    public function show($idcabeza)
    {
        if (!$examen_cabeza = Examen_Cabeza::find($idcabeza)) {
            return response()->json(['errors' => 'No se encuentra el examen_cabeza'], 404);
        }
        return new Examen_CabezaResource($examen_cabeza);
    }

    public function update(Request $request, $idcabeza)
    {
        if (!$examen_cabeza = Examen_Cabeza::find($idcabeza)) {
            return response()->json(['errors' => 'No se encuentra el Examen_Cabeza que desea actualizar'], 404);
        }
        $examen_cabeza->update($request->all());
        return new Examen_CabezaResource($examen_cabeza);
    }

}
