<?php

namespace App\Http\Controllers;

use App\Http\Requests\DienteRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Diente;
use App\Http\Resources\DienteResource;
use App\Models\Ubicacion_Dental;

class DienteController extends Controller
{
    public function index()
    {
        if (!$diente = Diente::all()) {
            return response()->json(['errors' => 'No se encuentra el diente'], 404);
        }

        return DienteResource::collection($diente);
    }

    public function store(Request $request)
    {
        return new DienteResource(Diente::create($request->all()));
    }

    public function show($iddiente)
    {
        if (!$diente = Diente::findMany($iddiente)) {
            return response()->json(['errors' => 'No se encuentra el diente'], 404);
        }

        return DienteResource::collection($diente);
    }

    public function update(Request $request, $iddiente, $idposiciond, $idubicaciond)
    {
        if (!$diente = Diente::where('idposiciond', $idposiciond)
            ->where('iddiente', $iddiente)
            ->where('idubicaciond', $idubicaciond)->update($request->all())) {
            return response()->json(['errors' => 'No se encuentra el diente'], 404);
        }
        
        return response()->json($diente, 200);
    }

    public function destroy($iddiente, $idposiciond, $idubicaciond)
    {

        if (!$diente = Diente::where('idposiciond', $idposiciond)
            ->where('iddiente', $iddiente)
            ->where('idubicaciond', $idubicaciond)->delete()) {
            return response()->json(['errors' => 'No se encuentra el diente'], 404);
        }
        return True;
    }

    public function destroy_dientes($iddiente, $idubicaciond, $idcondiciond, $idposiciond)
    {
        $hesmiferio = Ubicacion_Dental::where('idubicaciond', $idubicaciond)->first();
       $hesmiferio->idhemisferio_diente;

       DB::table('dientes')
       ->join('ubicaciones_dientes', 'dientes.idubicaciond', '=', 'ubicaciones_dientes.idubicaciond')
       ->join('hemisferio_diente', 'ubicaciones_dientes.idhemisferio_diente', '=', 'hemisferio_diente.idhemisferio_diente')
         ->where('dientes.iddiente', '=', $iddiente)
            ->where('dientes.idposiciond', '=', $idposiciond)
            ->where('dientes.idcondicionesd', '=', $idcondiciond)
            ->where('hemisferio_diente.idhemisferio_diente', '=', $hesmiferio->idhemisferio_diente)
            ->delete();
        return True;
    }

    // public function obtener($idubicaciond)
    // {
        

    //     return response()->json($hesmiferio, 200);
    // }

}
