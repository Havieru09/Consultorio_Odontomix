<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Consulta;
use App\Http\Resources\ConsultaResource;

class ConsultaController extends Controller
{
    public function index()
    {
        if (!$consulta = Consulta::all()->sortBy('estado_consulta')) {
            return response()->json(['errors' => 'No se encuentra la consulta'], 404);
        }

        return ConsultaResource::collection($consulta);
    }

    public function store(Request $request)
    {
        if (!$request->idcita || !$request->motivo_consulta || !$request->fecha_consulta) {
            return response()->json(['errors' => 'Faltan datos para procesar la solicitud'], 400);
        }
        return new ConsultaResource(Consulta::create($request->all()));
    }

    public function show($idconsulta)
    {
        if (!$consulta = Consulta::find($idconsulta)) {
            return response()->json(['errors' => 'No se encuentra la consulta'], 404);
        }

        return new ConsultaResource($consulta);
    }

    public function showConsultasFechas(Request $request)
    {
        $fecha_iniciohora = $request->fecha1." 00:00:00";
        $fecha_finalhora = $request->fecha2." 23:59:59";
        if (!$consultas = Consulta::whereBetween('fechahora_cita', [$fecha_iniciohora, $fecha_finalhora])->get()) {
            return response()->json(['errors' => 'Cita no encontrada'], 404);
        }
        return ConsultaResource::collection($consultas);
    }

    public function update(Request $request, $idconsulta)
    {
        if (!$consulta = Consulta::find($idconsulta)) {
            return response()->json(['errors' => 'No se encuentra la consulta'], 404);
        }

        $consulta->update($request->all());
        return new ConsultaResource($consulta);
    }
}
