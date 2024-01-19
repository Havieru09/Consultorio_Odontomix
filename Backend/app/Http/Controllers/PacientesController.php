<?php

namespace App\Http\Controllers;

use App\Http\Requests\PacienteRequest;
use Illuminate\Http\Request;
use App\Http\Resources\PacientesResource;
use App\Models\Pacientes;

class PacientesController extends Controller
{
    public function index()
    {
        if (!$pacientes = Pacientes::all()) {
            return response()->json(['errors' => 'No se encuentran pacientes en la base de datos'], 404);
        }
        return PacientesResource::collection($pacientes);
    }

    public function store(PacienteRequest $request)
    {
        $request->validated();
        return new PacientesResource(Pacientes::create($request->all()));
    }

    public function show($idpaciente)
    {
        if (!$paciente = Pacientes::find($idpaciente)) {
            return response()->json(['errors' => 'No se encuentra el paciente en la base de datos'], 404);
        }
        return new PacientesResource($paciente);
    }

    public function update(Request $request, $idpaciente)
    {
        if (!$paciente = Pacientes::find($idpaciente)) {
            return response()->json(['errors' => 'No se encuentra el paciente en la base de datos'], 404);
        }
        $paciente->update($request->all());
        return response()->json($paciente, 200);
    }

    public function destroy($idpaciente)
    {
        if (!$paciente = Pacientes::find($idpaciente)) {
            return response()->json(['errors' => 'No se encuentra el paciente en la base de datos'], 404);
        }
        $paciente->delete();
        return response()->json(['success' => 'Paciente eliminado'], 200);
    }
    
}
