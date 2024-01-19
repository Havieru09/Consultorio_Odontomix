<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Clientes;
use App\Models\Pacientes;
use App\Mail\ConsultaMail;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;

class EnvioCorreoController extends Controller
{
    public function envioCorreo(Request $request)
    {
        setlocale(LC_TIME, 'es_ES.UTF-8', 'Spanish_Ecuador', 'Spanish');
        $paciente = Pacientes::find($request->idpaciente);
        $cliente = Clientes::find($request->idcliente);
        $carbon = new Carbon($request->fechahora_cita);
        $msg = [
            'nombre_cliente' => $cliente->nombre_cliente,
            'apellidos_cliente' => $cliente->apellidos_cliente,
            'nombre_paciente' => $paciente->nombre_paciente,
            'apellidos_paciente' => $paciente->apellidos_paciente,
            'dia' => $carbon->day,
            'anio' => $carbon->year,
            'mes' => ucfirst($carbon->formatLocalized('%B')),
            'dia2' => ucfirst($carbon->isoFormat('dddd')),
            'concepto_cita' => $request->concepto_cita,
            'hora' => $carbon->format('H:i'),
        ];
        Mail::to($cliente->correo_cliente)->send(new ConsultaMail($msg));
    }
}