<?php

namespace App\Http\Controllers;

use App\Http\Resources\CitaResources;
use App\Models\Cita;
use App\Http\Requests\CitaRequest;
use Illuminate\Http\Request;

class CitaController extends Controller
{
    public function index()
    {
        if (!$clientes = Cita::all()->sortBy('estado_cita')) {
            return response()->json(['errors' => 'No se encuentran las citas en la base de datos'], 404);
        }
        return CitaResources::collection($clientes);
    }

    public function store(CitaRequest $request)
    {

        $request->validated();

        return new CitaResources(Cita::create($request->all()));
    }

    public function show($idcita)
    {
        if (!$clientes = Cita::find($idcita)) {
            return response()->json(['errors' => 'Cita no encontrada'], 404);
        }
        return new CitaResources($clientes);
    }

    public function showCitasFechas(Request $request)
    {
        $fecha_iniciohora = $request->fecha1." 00:00:00";
        $fecha_finalhora = $request->fecha2." 23:59:59";
        if (!$citas = Cita::whereBetween('fechahora_cita', [$fecha_iniciohora, $fecha_finalhora])->get()) {
            return response()->json(['errors' => 'Cita no encontrada'], 404);
        }
        return CitaResources::collection($citas);
    }

    public function update(Request $request, $idcita)
    {
        if (!$clientes = Cita::find($idcita)) {
            return response()->json(['errors' => 'No se encuentra la cita que desea actualizar'], 404);
        }
        if ($request->fechahora_cita != Cita::find($idcita)->fechahora_cita) {
            $clientes->update($request->all());
            return new CitaResources($clientes);
        } else {
            $request->validate([
                'concepto_cita.required' => 'El concepto de la cita es requerido',
                'fechahora_cita.unique' => 'La fecha y hora de la cita ya fue asignado a otra cita',
            ]);
            $clientes->update($request->all());
            return new CitaResources($clientes);
        }
    }

    public function destroy($idcita)
    {
        if (!$clientes = Cita::find($idcita)) {
            return response()->json(['errors' => 'No se encuentra la cita que desea eliminar'], 404);
        }
        $clientes->delete();
        return new CitaResources($clientes);
    }
}
