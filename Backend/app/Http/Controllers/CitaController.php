<?php

namespace App\Http\Controllers;

use App\Http\Resources\CitaResources;
use App\Models\Cita;
use App\Models\Pacientes;
use App\Http\Requests\CitaRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CitaController extends Controller
{
    public function index()
    {

        $citas = Cita::orderBy('estado_cita', 'asc')->orderBy('fechahora_cita', 'asc')->paginate(6);

        foreach ($citas as $cita) {
            $flimite = Carbon::parse($cita->fechahora_cita)->addDay()->addMinutes(30);
            $fecha = Carbon::now();

            if ($citas->estado_cita == 1) {
                if ($fecha->gt($flimite)) {
                    $cita->estado_cita = 2;
                    $cita->save();
                }
            } else {
                return response()->json([
                    'data' => CitaResources::collection($citas),
                    'total' => $citas->total(),
                    'perPage' => $citas->perPage(),
                    'currentPage' => $citas->currentPage(),
                    'lastPage' => $citas->lastPage(),
                ]);
            }
        }
    }

    public function store(CitaRequest $request)
    {

        $request->validated();

        return new CitaResources(Cita::create($request->all()));
    }

    public function show($idcita)
    {
        if (!$citas = Cita::find($idcita)) {
            return response()->json(['errors' => 'Cita no encontrada'], 404);
        }
        return new CitaResources($citas);
    }

    public function showPaciente($identificacion_paciente)
    {
        $identifiacion = Pacientes::where('identificacion_paciente', $identificacion_paciente)->first();

        if (!$citas = Cita::where('idpaciente', $identifiacion->idpaciente)->orderBy('fechahora_cita', 'asc')->paginate(6)) {
            return response()->json(['errors' => 'Cita no encontrada'], 404);
        }
        return response()->json([
            'data' => CitaResources::collection($citas),
            'total' => $citas->total(),
            'perPage' => $citas->perPage(),
            'currentPage' => $citas->currentPage(),
            'lastPage' => $citas->lastPage(),
        ]);
    }

    public function showCitasFechas(Request $request)
    {
        $fecha_iniciohora = $request->fecha1 . " 00:00:00";
        $fecha_finalhora = $request->fecha2 . " 23:59:59";
        if (!$citas = Cita::whereBetween('fechahora_cita', [$fecha_iniciohora, $fecha_finalhora])->where('estado_cita', 0)->get()) {
            return response()->json(['errors' => 'Cita no encontrada'], 404);
        }
        return CitaResources::collection($citas);
    }

    public function showCitasCondicion(Request $request)
    {
        $fecha_iniciohora = $request->fecha1 . " 00:00:00";
        $fecha_finalhora = $request->fecha2 . " 23:59:59";
        $condicion = $request->condicion;
        if ($condicion == 1) {
            $citas = Cita::whereBetween('fechahora_cita', [$fecha_iniciohora, $fecha_finalhora])->where('estado_cita', 1)->count();
            return $citas;
        } else {
            $citas = Cita::whereBetween('fechahora_cita', [$fecha_iniciohora, $fecha_finalhora])->where('estado_cita', 0)->count();
            return $citas;
        }
    }

    public function update(Request $request, $idcita)
    {
        if (!$citas = Cita::find($idcita)) {
            return response()->json(['errors' => 'No se encuentra la cita que desea actualizar'], 404);
        }
        if ($request->fechahora_cita != Cita::find($idcita)->fechahora_cita) {
            $citas->update($request->all());
            return new CitaResources($citas);
        } else {
            $request->validate([
                'concepto_cita.required' => 'El concepto de la cita es requerido',
                'fechahora_cita.unique' => 'La fecha y hora de la cita ya fue asignado a otra cita',
            ]);
            $citas->update($request->all());
            return new CitaResources($citas);
        }
    }

    public function destroy($idcita)
    {
        if (!$citas = Cita::find($idcita)) {
            return response()->json(['errors' => 'No se encuentra la cita que desea eliminar'], 404);
        }
        $citas->delete();
        return new CitaResources($citas);
    }
}
