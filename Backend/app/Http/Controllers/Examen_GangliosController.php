<?php

namespace App\Http\Controllers;

use App\Http\Resources\Examen_GangliosResource;
use App\Models\Examen_Ganglios;
use Illuminate\Http\Request;


class Examen_GangliosController extends Controller
{
    public function index()
    {   
        if (!$examen_ganglios = Examen_Ganglios::all()) {
            return response()->json(['errors' => 'No se encuentra el examen_ganglios'], 404);
        }
        return Examen_GangliosResource::collection($examen_ganglios);
    }

    public function store(Request $request)
    {
        if (!$request->nombre_ganglios) {
            return response()->json(['errors' => 'No se pudo crear el examen_ganglios'], 422);
        }
        return new Examen_GangliosResource(Examen_Ganglios::create($request->all()));
    }

    public function show($idganglios)
    {
     if (!$examen_ganglios = Examen_Ganglios::find($idganglios)) {
          return response()->json(['errors' => 'No se encuentra el examen_ganglios'], 404);
     }
     return new Examen_GangliosResource($examen_ganglios);
    }

    public function update(Request $request, $idganglios)
    {
        if (!$examen_ganglios = Examen_Ganglios::find($idganglios)) {
            return response()->json(['errors' => 'No se encuentra el Examen_Ganglios que desea actualizar'], 404);
        }
        $examen_ganglios->update($request->all());
        return new Examen_GangliosResource($examen_ganglios);
    }
}
