<?php

namespace App\Http\Controllers;

use App\Http\Requests\Examen_IntraRequest;
use App\Http\Resources\Examen_IntraoralResource;
use App\Models\Examen_Intraoral;
use Illuminate\Http\Request;
use App\Models\Examen_Encia;
use App\Models\Examen_Lengua;
use App\Models\Examen_PaladarDuro;
use App\Models\Examen_PaladarBlando;
use App\Models\Examen_Boca;
use App\Models\Examen_Reborde;
use App\Models\Examen_Oclusion;

class Examen_IntraoralController extends Controller
{

    public function examenenes_intraoral()
    {
        $examen_encia = Examen_Encia::all();
        $examen_lengua = Examen_Lengua::all();
        $examen_paladar_duro = Examen_PaladarDuro::all();
        $examen_paladar_blando = Examen_PaladarBlando::all();
        $examen_piso_boca = Examen_Boca::all();
        $examen_reborde = Examen_Reborde::all();
        $examen_oclusion = Examen_Oclusion::all();

        return response()->json([
            'examen_encia' => $examen_encia,
            'examen_lengua' => $examen_lengua,
            'examen_paladar_duro' => $examen_paladar_duro,
            'examen_paladar_blando' => $examen_paladar_blando,
            'examen_piso_boca' => $examen_piso_boca,
            'examen_reborde' => $examen_reborde,
            'examen_oclusion' => $examen_oclusion,
        ]);
    }

    public function index()
    {
        if (!$examen_intra = Examen_Intraoral::all()) {
            return response()->json(['errors' => 'No se encuentra un registro'], 404);
        }
        return Examen_IntraoralResource::collection($examen_intra);
    }

    public function store(Examen_IntraRequest $request)
    {
        $request->validated();
        return new Examen_IntraoralResource(Examen_Intraoral::create($request->all()));
    }

    public function show($idintraoral)
    {
        if (!$examen_intra = Examen_Intraoral::find($idintraoral)) {
            return response()->json(['errors' => 'No se encuentra un registro'], 404);
        }
        return new Examen_IntraoralResource($examen_intra);
    }

    public function update(Request $request, $idintraoral)
    {
        if (!$examen_intra = Examen_Intraoral::find($idintraoral)) {
            return response()->json(['errors' => 'No se encuentra un registro'], 404);
        }
        $examen_intra->update($request->all());
        return new Examen_IntraoralResource($examen_intra);
    }
}
