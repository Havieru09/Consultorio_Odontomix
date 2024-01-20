<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Condiciones_DentalesResource;
use App\Models\Condiciones_Dentales;

class Condiciones_DentalesController extends Controller
{
    public function index()
    {
       if (!$condiciones = Condiciones_Dentales::all()) {
           return response()->json(['errors' => 'No se encuentran condiciones en la base de datos'], 404);
       }
         return Condiciones_DentalesResource::collection($condiciones);
    }

    public function update(Request $request, $idcondicionesd)
    {
        if (!$condicion = Condiciones_Dentales::find($idcondicionesd)) {
            return response()->json(['errors' => 'No se encuentra la condicion en la base de datos'], 404);
        }
        $condicion->update($request->all());

        return Condiciones_DentalesResource::make($condicion);
}
}