<?php

namespace App\Http\Controllers;

use App\Http\Resources\Examen_LenguaResource;
use Illuminate\Http\Request;

use App\Models\Examen_Lengua;

class Examen_LenguaController extends Controller
{
    public function index()
    {
        if (!$examen_lengua = Examen_Lengua::all()) {
            return response()->json(['errors' => 'No se encuentran examen_lengua en la base de datos'], 404);
        }
        return Examen_LenguaResource::collection($examen_lengua);
    }

    public function store(Request $request)
    {
        if (!$request->nombre_lengua) {
            return response()->json(['errors' => 'Debe ingresar un nombre de lengua'], 422);
        }

        return new Examen_LenguaResource(Examen_Lengua::create($request->all()));
    }

    public function show($idlengua)
    {
        if (!$examen_lengua = Examen_Lengua::find($idlengua)) {
            return response()->json(['errors' => 'Examen_Lengua no encontrado'], 404);
        }
        return new Examen_LenguaResource($examen_lengua);
    }

    public function update(Request $request, $idlengua)
    {
        if (!$examen_lengua = Examen_Lengua::find($idlengua)) {
            return response()->json(['errors' => 'No se encuentra el Examen_Lengua que desea actualizar'], 404);
        }
        $examen_lengua->update($request->all());
        return new Examen_LenguaResource($examen_lengua);
    }

}
