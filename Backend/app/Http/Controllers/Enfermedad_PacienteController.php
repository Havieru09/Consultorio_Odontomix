<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Enfermedad_Paciente;
use App\Http\Resources\Enfermedad_PacienteResources;

class Enfermedad_PacienteController extends Controller
{
    public function index()
    {
        if (!$enfermedad_paciente = Enfermedad_Paciente::with(['enfermedades'])->get()) {
            return response()->json(['errors' => 'No se encuentra el las enfermedades del paciente'], 404);
        }

        return Enfermedad_PacienteResources::collection($enfermedad_paciente);
    }

    public function store(Request $request)
    {
        $request->validate([
            'idenfermedadpaciente' => 'required',
            'idpaciente' => 'required',
            'idenfermedad' => 'required',
            'tratamiento_enfermedad' => 'required',
        ]);

        return new Enfermedad_PacienteResources(Enfermedad_Paciente::create($request->all()));
    }

    public function show($idenfermedadpaciente)
    {
        if (!$enfermedad_paciente = Enfermedad_Paciente::findMany($idenfermedadpaciente) ) {
            return response()->json(['errors' => 'No se encuentra la enfermedad del paciente'], 404);
        }

        return new Enfermedad_PacienteResources($enfermedad_paciente);
    }

    public function update(Request $request, $idenfermedadpaciente)
    {
        if (!$enfermedad_paciente = Enfermedad_Paciente::find($idenfermedadpaciente)) {
            return response()->json(['errors' => 'No se encuentra la enfermedad del paciente que desea actualizar'], 404);
        }
        $enfermedad_paciente->update($request->all());
        return new Enfermedad_PacienteResources($enfermedad_paciente);
    }
}
