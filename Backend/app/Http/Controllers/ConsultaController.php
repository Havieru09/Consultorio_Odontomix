<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Consulta;
use App\Http\Resources\ConsultaResource;

class ConsultaController extends Controller
{
    public function index()
    {

        $consulta = Consulta::orderBy('fecha_consulta', 'asc')->paginate(6);

        return response()->json([
            'data' => ConsultaResource::collection($consulta),
            'total' => $consulta->total(),
            'perPage' => $consulta->perPage(),
            'currentPage' => $consulta->currentPage(),
            'lastPage' => $consulta->lastPage(),
        ]);
        // if (!$consulta = Consulta::all()->sortBy('estado_consulta')) {
        //     return response()->json(['errors' => 'No se encuentra la consulta'], 404);
        // }

        // return ConsultaResource::collection($consulta);
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

    public function showConsultasPaciente($idpaciente)
    {
        if (!$consultas = Consulta::where('idpaciente', $idpaciente)->orderBy('fecha_consulta', 'asc')->get()) {
            return response()->json(['errors' => 'Cita no encontrada'], 404);
        }
        return ConsultaResource::collection($consultas);
    }

    public function showConsultasFechas(Request $request)
    {
        $fecha_iniciohora = $request->fecha1." 00:00:00";
        $fecha_finalhora = $request->fecha2." 23:59:59";
        if (!$consultas = Consulta::whereBetween('fecha_consulta', [$fecha_iniciohora, $fecha_finalhora])->where('estado_consulta', 0)->get()) {
            return response()->json(['errors' => 'Cita no encontrada'], 404);
        }
        return ConsultaResource::collection($consultas);
    }

    public function showConsultasCondicion(Request $request)
    {
        $fecha_iniciohora = $request->fecha1." 00:00:00";
        $fecha_finalhora = $request->fecha2." 23:59:59";
        $condicion = $request->condicion;
        if ($condicion == 1) {
            $consultas = Consulta::whereBetween('fecha_consulta', [$fecha_iniciohora, $fecha_finalhora])->where('estado_consulta', 1)->count();
            return $consultas;
        } else {
            $consultas = Consulta::whereBetween('fecha_consulta', [$fecha_iniciohora, $fecha_finalhora])->where('estado_consulta', 0)->count();
            return $consultas;
        }
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
