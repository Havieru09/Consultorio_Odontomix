<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Examen_atmResoruce;
use App\Models\Examen_ATM;

class Examen_atmController extends Controller
{
    public function index()
    {   
        if (!$examen_atm = Examen_ATM::all()) {
            return response()->json(['errors' => 'No se encuentra el examen_ATM'], 404);
        }

    return Examen_atmResoruce::collection($examen_atm);
    }

   public function store(Request $request)
   {

    if (!$request->nombre_atm) {
        return response()->json(['errors' => 'Debe ingresar un nombre de atm'], 422);
    }
    return new Examen_atmResoruce(Examen_ATM::create($request->all()));
   }

    public function show($idatm)
    {
     if (!$examen_atm = Examen_ATM::find($idatm)) {
          return response()->json(['errors' => 'No se encuentra el examen_ATM'], 404);
     }
     return new Examen_atmResoruce($examen_atm);
    }

    public function update(Request $request, $idatm)
    {
        if (!$examen_atm = Examen_ATM::find($idatm)) {
            return response()->json(['errors' => 'No se encuentra el Examen_ATM que desea actualizar'], 404);
        }
        $examen_atm->update($request->all());
        return new Examen_atmResoruce($examen_atm);
    }

}
