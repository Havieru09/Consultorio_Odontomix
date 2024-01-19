<?php

namespace App\Http\Controllers;

use App\Http\Resources\Collection\ModuloMedicoCollection;
use App\Http\Resources\Examen_LabiosResource;
use App\Models\Examen_Labios;
use Illuminate\Http\Request;

class Examen_LabiosController extends Controller
{
    public function index()
    {
        if (!$examen_labios = Examen_Labios::all()) {
            return response()->json(['errors' => 'No se encuentran examen_labios en la base de datos'], 404);
        }
        return Examen_LabiosResource::collection($examen_labios);
    }

    public function store(Request $request)
    {
        if (!$request->nombre_labios) {
            return response()->json(['errors' => 'Debe ingresar un nombre de labios'], 422);
        }

        return new Examen_LabiosResource(Examen_Labios::create($request->all()));
    }

    public function show($idlabios)
    {
        if (!$examen_labios = Examen_Labios::find($idlabios)) {
            return response()->json(['errors' => 'Examen_Labios no encontrado'], 404);
        }
        return new Examen_LabiosResource($examen_labios);
    }

    public function update(Request $request, $idlabios)
    {
        if (!$examen_labios = Examen_Labios::find($idlabios)) {
            return response()->json(['errors' => 'No se encuentra el Examen_Labios que desea actualizar'], 404);
        }
        $examen_labios->update($request->all());
        return new Examen_LabiosResource($examen_labios);
    }
}
