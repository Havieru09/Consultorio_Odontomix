<?php

namespace App\Http\Controllers;

use App\Models\Examen_Cara;
use App\Http\Resources\Examen_CaraResource;
use Illuminate\Http\Request;

class Examen_CaraController extends Controller
{
    public function index()
    {   
        if (!$Examen_cara = Examen_Cara::all()) {
            return response()->json(['errors' => 'No se encuentran clientes en la base de datos'], 404);
        }
        return Examen_CaraResource::collection($Examen_cara);
    }

    public function store(Request $request)
    {
        if (!$request->nombre_cara) {
            return response()->json(['errors' => 'No se pudo crear el examen_cara'], 422);
        }
        return new Examen_CaraResource(Examen_Cara::create($request->all()));
    }

    public function show($idcara)
    {
     if (!$examen_cara = Examen_Cara::find($idcara)) {
          return response()->json(['errors' => 'No se encuentra el examen_cara'], 404);
     }
     return new Examen_CaraResource($examen_cara);
    }

    public function update(Request $request, $idcara)
    {
        if (!$examen_cara = Examen_Cara::find($idcara)) {
            return response()->json(['errors' => 'No se encuentra el Examen_Cara que desea actualizar'], 404);
        }
        $examen_cara->update($request->all());
        return new Examen_CaraResource($examen_cara);
    }

}
