<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Historial_ClinicoResource;
use App\Models\Historial_Clinico;
use App\Models\Pacientes;
use App\Models\Clientes;
use App\Models\Enfermedad_Paciente;
use App\Models\Enfermedades;
use Barryvdh\DomPDF\Facade\Pdf as FacadePdf;
use Illuminate\Support\Facades\URL;

class Historial_ClinicoController extends Controller
{

    public function index()
    {
        if (!$historial = Historial_Clinico::with(['enfermedad_paciente.enfermedades'])->get()) {
            return response()->json(['errors' => 'No se encuentra un registro'], 404);
        }
        return Historial_ClinicoResource::collection($historial);
    }

    public function store(Request $request)
    {
        $historial = new Historial_Clinico();
        if ($request->hasFile('radiografia_historial') && $request->file('radiografia_historial')->isValid()) {
            $archivo = $request->file('radiografia_historial');
            $ruta = $archivo->store('public/radiografias');
            $request->$ruta;
        } else {
            $archivo_contenido = null;
        }
        return new Historial_ClinicoResource(Historial_Clinico::create($request->all()));
    }

    public function informe($numero_ficha)
    {
        $datos = Historial_Clinico::with(['enfermedad_paciente.enfermedades'])->with(['consulta.cita'])
            ->with(['examen_extraoral.examen_cara'])->with(['examen_extraoral.examen_cabeza'])->with(['examen_extraoral.examen_atm'])
            ->with(['examen_extraoral.examen_ganglios'])->with(['examen_extraoral.examen_labios'])
            ->with(['examen_extraoral.examen_señasp'])->with(['examen_intraoral.piso_boca'])->with(['examen_intraoral.encia'])
            ->with(['examen_intraoral.lengua'])->with(['examen_intraoral.paladar_blando'])->with(['examen_intraoral.paladar_duro'])
            ->with(['examen_intraoral.reborde'])->with(['examen_intraoral.oclusion'])->with(['pregunta'])
            ->where('numero_ficha', $numero_ficha)->first();
        // return response()->json($datos);
        // dd($datos->consulta->cita->concepto_cita);
        $datos = ['datos' => $datos];
        // dd($datos);
        $pdf = FacadePdf::loadView('InformeHistorial', $datos);
        return $pdf->download('InformeHistorial.pdf');
    }

    public function show($numero_ficha)
    {
        if (!$historial = Historial_Clinico::with(['enfermedad_paciente.enfermedades'])->where('numero_ficha', $numero_ficha)->first()) {
            return response()->json(['errors' => 'No se encuentra un registro'], 404);
        }
        return new Historial_ClinicoResource($historial);
    }

    public function obtener_radio($numero_ficha)
    {
        if (!$historial = Historial_Clinico::where('numero_ficha', $numero_ficha)->first()) {
            return response()->json(['errors' => 'No se encuentra un registro'], 404);
        }
        echo($historial->radiografia_historial);
        $tipo = 'image/png';
        $imagen = $historial->radiografia_historial;
        // return response($imagen)->header('Content-Type', $tipo);
    }

    public function show2($idpaciente)
    {
        if (!$historial = Historial_Clinico::where('idpaciente', $idpaciente)->where('estado_historial', 1)
            ->orderBy('numero_ficha', 'desc')->first()) {
            return response()->json(['errors' => 'No se encuentra un registro'], 404);
        }
        return new Historial_ClinicoResource($historial);
    }

    public function update(Request $request, $idhistorial)
    {
        if (!$historial = Historial_Clinico::find($idhistorial)) {
            return response()->json(['errors' => 'No se encuentra un registro'], 404);
        }
        $historial->update($request->all());
        return new Historial_ClinicoResource($historial);
    }
}
