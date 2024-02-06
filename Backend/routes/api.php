<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Examen_atmController;
use App\Http\Controllers\Examen_bocaController;
use App\Http\Controllers\Examen_cabezaController;
use App\Http\Controllers\Examen_caraController;
use App\Http\Controllers\Examen_EnciaController;
use App\Http\Controllers\Examen_GangliosController;
use App\Http\Controllers\Examen_LabiosController;
use App\Http\Controllers\Examen_LenguaController;
use App\Http\Controllers\Examen_OclusionController;
use App\Http\Controllers\Examen_PaladarBlandoController;
use App\Http\Controllers\Examen_PaladarDuroController;
use App\Http\Controllers\Examen_RebordeController;
use App\Http\Controllers\Examen_SeñasController;
use App\Http\Controllers\Examen_ExtraoralController;
use App\Http\Controllers\Examen_IntraoralController;
use App\Http\Controllers\Posicion_DentalController;
use App\Http\Controllers\Ubicacion_DentalController;
use App\Http\Controllers\Tratamientos_DentalesController;
use App\Http\Controllers\Condiciones_DentalesController;
use App\Http\Controllers\EnfermedadesController;
use App\Http\Controllers\Enfermedad_PacienteController;
use App\Http\Controllers\PreguntasController;
use App\Http\Controllers\DienteController;
use App\Http\Controllers\HemisferioController;
use App\Http\Controllers\OdontogramaController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\ClientesController;
use App\Http\Controllers\PacientesController;
use App\Http\Controllers\CitaController;
use App\Http\Controllers\ConsultaController;
use App\Http\Controllers\EnvioCorreoController;
use App\Http\Controllers\Historial_ClinicoController;
use App\Http\Controllers\IdentificacionController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\DetalleController;
use App\Http\Controllers\CabeceraController;
use Illuminate\Support\Facades\Route;

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// if ($request->has('idpreguntas')) {
//     if (Preguntas::where('idpreguntas', $request->input('idpreguntas'))->first()) {
//         return response()->json(['errors' => 'Ya existe una pregunta con ese id'], 404);
//     }
// }

//API ADMINISTRATIVA
Route::apiResource('roles', RolesController::class);
Route::apiResource('usuario', UsuarioController::class);
Route::apiResource('identificacion', IdentificacionController::class);
Route::apiResource('clientes', ClientesController::class);
Route::get('cliente/{identificacion_cliente}', [ClientesController::class, 'showCliente']);
Route::apiResource('pacientes', PacientesController::class);
Route::get('paciente/{identificacion_paciente}', [PacientesController::class, 'showPaciente']);
Route::apiResource('citas', CitaController::class);
Route::get('citas_paciente/{identificacion_paciente}', [CitaController::class, 'showPaciente']);
Route::apiResource('consultas', ConsultaController::class);
Route::get('consultas_paciente/{identificacion_paciente}', [ConsultaController::class, 'showPaciente']);
Route::apiResource('item', ItemController::class);
Route::post('envioCorreo', [EnvioCorreoController::class, 'envioCorreo']);

    //Informes
    Route::get('informe_citas', [CitaController::class, 'showCitasFechas']);
    Route::get('informe_consultas', [ConsultaController::class, 'showConsultasFechas']);
    Route::get('informe_citas_condicion', [CitaController::class, 'showCitasCondicion']);
    Route::get('informe_consultas_condicion', [ConsultaController::class, 'showConsultasCondicion']);

//API EXAMENES
Route::apiResource('examen_atm', Examen_atmController::class);
Route::apiResource('examen_boca', Examen_bocaController::class);
Route::apiResource('examen_cabeza', Examen_cabezaController::class);
Route::apiResource('examen_cara', Examen_caraController::class);
Route::apiResource('examen_encia', Examen_EnciaController::class);
Route::apiResource('examen_ganglios', Examen_GangliosController::class);
Route::apiResource('examen_labios', Examen_LabiosController::class);
Route::apiResource('examen_lengua', Examen_LenguaController::class);
Route::apiResource('examen_oclusion', Examen_OclusionController::class);
Route::apiResource('examen_paladarblando', Examen_PaladarBlandoController::class);
Route::apiResource('examen_paladarduro', Examen_PaladarDuroController::class);
Route::apiResource('examen_reborde', Examen_RebordeController::class);
Route::apiResource('señas_particulares', Examen_SeñasController::class);
Route::get('examenes_extraoral', [Examen_ExtraoralController::class, 'examenenes_extraoral']);
Route::get('examenes_intraoral', [Examen_IntraoralController::class, 'examenenes_intraoral']);
Route::get('informe/{numero_ficha}', [Historial_ClinicoController::class, 'informe']);

//API LOGIN
Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'Logout']);

//API CONTABLE
Route::apiResource('detalle', DetalleController::class);
Route::apiResource('cabecera', CabeceraController::class);
Route::get('informe_factura/{n_documento}', [CabeceraController::class, 'informe']);

//API MEDICA
Route::apiResource('historial_medico', Historial_ClinicoController::class);
Route::get('historial_medico2/{idpaciente}', [Historial_ClinicoController::class, 'show2']);
Route::get('descargar/{numero_ficha}', [Historial_ClinicoController::class, 'descargar']);
Route::apiResource('enfermedades', EnfermedadesController::class);
Route::apiResource('enfermedad_paciente', Enfermedad_PacienteController::class);
Route::apiResource('preguntas', PreguntasController::class);
Route::apiResource('examen_extraoral', Examen_ExtraoralController::class);
Route::apiResource('examen_intraoral', Examen_IntraoralController::class);
Route::apiResource('posicion_dental', Posicion_DentalController::class);
Route::apiResource('ubicacion_dental', Ubicacion_DentalController::class);
Route::apiResource('tratamientos_dentales', Tratamientos_DentalesController::class);
Route::apiResource('condiciones_dentales', Condiciones_DentalesController::class);
Route::apiResource('dientes', DienteController::class);
Route::put('dientes/{iddiente}/{idposiciond}/{idubicaciond}', [DienteController::class, 'update']);
Route::delete('dientes/{iddiente}/{idposiciond}/{idubicaciond}', [DienteController::class, 'destroy']);
Route::delete('dientes2/{iddiente}/{idubicaciond}/{idcondiciond}/{idposiciond}', [DienteController::class, 'destroy_dientes']);
Route::apiResource('hemisferio', HemisferioController::class);
Route::apiResource('odontograma', OdontogramaController::class);
Route::get('odontograma_estado/{idhistorial}', [OdontogramaController::class, 'estado']);