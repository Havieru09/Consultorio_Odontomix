<?php

namespace App\Http\Controllers;

use App\Http\Requests\Examen_ExtraRequest;
use Illuminate\Http\Request;
use App\Http\Resources\Examen_ExtraoralResource;
use App\Models\Examen_Extraoral;
use App\Models\Examen_Cara;
use App\Models\Examen_Cabeza;
use App\Models\Examen_Atm;
use App\Models\Examen_Ganglios;
use App\Models\Examen_Labios;
use App\Models\Examen_SeñasParticulares;


class Examen_ExtraoralController extends Controller
{

    public function examenenes_extraoral()
    {
        $examen_cara = Examen_Cara::all();
        $examen_cabeza = Examen_Cabeza::all();
        $examen_atm = Examen_Atm::all();
        $examen_ganglios = Examen_Ganglios::all();
        $examen_labios = Examen_Labios::all();
        $examen_señasp = Examen_SeñasParticulares::all();

        return response()->json([
            'examen_cara' => $examen_cara,
            'examen_cabeza' => $examen_cabeza,
            'examen_atm' => $examen_atm,
            'examen_ganglios' => $examen_ganglios,
            'examen_labios' => $examen_labios,
            'examen_señasp' => $examen_señasp,
        ]);
    }

    public function index()
    {
       if(!$examen_extraoral = Examen_Extraoral::all()){
            return response()->json(['errors'=>'No se encuentra un registro'],404);
        }
        return Examen_ExtraoralResource::collection($examen_extraoral);
    }

    public function store(Examen_ExtraRequest $request)
    {
        $request->validated();
        return new Examen_ExtraoralResource(Examen_Extraoral::create($request->all()));
    }

    public function show($idextraoral)
    {
        if(!$examen_extraoral = Examen_Extraoral::find($idextraoral)){
            return response()->json(['errors'=>'No se encuentra un registro'],404);
        }
        return new Examen_ExtraoralResource($examen_extraoral);
    }

    public function update (Request $request, $idextraoral)
    {
        if(!$examen_extraoral = Examen_Extraoral::find($idextraoral)){
            return response()->json(['errors'=>'No se encuentra un registro'],404);
        }
        $examen_extraoral->update($request->all());
        return new Examen_ExtraoralResource($examen_extraoral);
    }

}
