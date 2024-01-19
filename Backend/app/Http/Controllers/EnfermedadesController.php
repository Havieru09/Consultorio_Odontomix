<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Enfermedades;
use App\Http\Resources\EnfermedadesResources;

class EnfermedadesController extends Controller
{

    public function index()
    {
        if (!$enfermedades = Enfermedades::all()) {
            return response()->json(['errors' => 'No se encuentra el las enfermedades'], 404);
        }

    return EnfermedadesResources::collection($enfermedades);
    }

    public function store(Request $request)
    {
      if (!$request->nombre_enfermedad) {
          return response()->json(['errors' => 'Debe ingresar un nombre de enfermedad'], 422);
      }
        return new EnfermedadesResources(Enfermedades::create($request->all()));
    }

    public function show($id)
    {
        if (!$enfermedades = Enfermedades::find($id)) {
            return response()->json(['errors' => 'No se encuentra la enfermedad'], 404);
        }

        return new EnfermedadesResources($enfermedades);
    }

    public function update(Request $request, $id)
    {
        if (!$enfermedades = Enfermedades::find($id)) {
            return response()->json(['errors' => 'No se encuentra la enfermedad que desea actualizar'], 404);
        }
        $enfermedades->update($request->all());
        return new EnfermedadesResources($enfermedades);
    }

}

