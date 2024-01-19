<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Examen_SeñasResource;
use App\Models\Examen_SeñasParticulares;

class Examen_SeñasController extends Controller
{
    public function index()
    {   
        if (!$examen_señas = Examen_SeñasParticulares::all()) {
            return response()->json(['errors' => 'No se encuentra el examen_señas'], 404);
        }
        return Examen_SeñasResource::collection($examen_señas);
    }

    public function store(Request $request)
    {
        if (!$request->nombre_señasp) {
            return response()->json(['errors' => 'No se pudo crear el examen_señas'], 422);
        }
        return new Examen_SeñasResource(Examen_SeñasParticulares::create($request->all()));
    }

    public function show($idseñas)
    {
     if (!$examen_señas = Examen_SeñasParticulares::find($idseñas)) {
          return response()->json(['errors' => 'No se encuentra el examen_señas'], 404);
     }
     return new Examen_SeñasResource($examen_señas);
    }

    public function update(Request $request, $idseñas)
    {
        if (!$examen_señas = Examen_SeñasParticulares::find($idseñas)) {
            return response()->json(['errors' => 'No se encuentra el Examen_Señas que desea actualizar'], 404);
        }
        $examen_señas->update($request->all());
        return new Examen_SeñasResource($examen_señas);
    }


}
