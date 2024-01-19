<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Examen_BocaResoruce;
use App\Models\Examen_Boca;

class Examen_bocaController extends Controller
{
    public function index()
    {
        if (!$examen_boca = Examen_Boca::all()) {
            return response()->json(['errors' => 'No se encuentran examen_boca en la base de datos'], 404);
        }
        return Examen_BocaResoruce::collection($examen_boca);
    }

    public function store(Request $request)
    {
        if (!$request->nombre_boca) {
            return response()->json(['errors' => 'No se pudo crear el examen_boca'], 422);
        }
        return new Examen_BocaResoruce(Examen_Boca::create($request->all()));
    }

    public function show($idboca)
    {
        if (!$examen_boca = Examen_Boca::find($idboca)) {
            return response()->json(['errors' => 'No se encuentra el examen_boca'], 404);
        }
        return new Examen_BocaResoruce($examen_boca);
    }

    public function update(Request $request, $idboca)
    {
        if (!$examen_boca = Examen_Boca::find($idboca)) {
            return response()->json(['errors' => 'No se encuentra el Examen_Boca que desea actualizar'], 404);
        }
        $examen_boca->update($request->all());
        return new Examen_BocaResoruce($examen_boca);
    }
}
