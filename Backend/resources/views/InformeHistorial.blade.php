<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    {{-- @vite('resources/css/app.css') --}}
    <style>
        body {
            font-size: 12px;
            /* Ajusta el tamaño de la fuente a 12px */
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        td,
        th {
            padding: 8px;
            border: none;
            /* Elimina los bordes de las celdas */
        }

        .borderExterno {
            border: 1px solid black;
        }

        .borderInferior {
            border-bottom: 1px solid black;
        }

        .tds {
            text-align: center;

        }

        .header-table {
            width: 100%;
        }

        .info-table {
            width: 100%;
        }

        img {
            max-height: 100px;
        }
    </style>
</head>
{{-- @dd($datos->enfermedad_paciente->count()) --}}

<body class="antialiased">
    <table class="header-table">
        <tr>
            <td><img src="http://localhost:5173/img/logo-sinfondo.png" style="max-height: 100px;" alt="Logo" /></td>
            <td>
                <h1 style="font-size: 13px; font-weight: 900;">CENTRO DE ATENCIÓN ODONTOLÓGICA – OD. JUAN MURILLO LLANOS
                </h1>
                <h2 style="font-size: 13px">Cdla. Luis Morejón Almeida Manzana A2 Villa 16/ Calle 1 S-O y José de la
                    Cuadra.</h2>
                <h3 style="text-align: center">Celular: 0982247948. Bio: https://biolink.info/odontomix</h3>
            </td>
        </tr>
    </table>
    <hr>
    <table style="width: 100%; border-collapse: collapse;">
        <tr>
            <td>Fecha de la consulta</td>
            <td>{{ $datos->fecha_historial }}</td>
            <td>Numero de Ficha</td>
            <td>{{ $datos->numero_ficha }}</td>
        </tr>
        <tr>
            <td colspan="2">Nombre del paciente</td>
            <td colspan="2">{{ $datos->consulta->cita->paciente->nombre_paciente }}
                {{ $datos->consulta->cita->paciente->apellidos_paciente }}</td>
        </tr>
        <tr>
            <td colspan="2">Motivo por el cual visito el consultorio dental</td>
            <td colspan="2">{{ $datos->consulta->cita->concepto_cita }}</td>
        </tr>
    </table>

    <table style="margin-bottom: none;">
        <td>
            <table style="width: 100%; border-collapse: collapse; border: 1px solid black;  margin-top: 23%">
                <tr>
                    <td style="font-weight: 900">Edad</td>
                    <td>{{ $datos->consulta->cita->paciente->edad_paciente }}</td>
                </tr>
                <td style="font-weight: 900">Género</td>
                <td>{{ $datos->consulta->cita->paciente->genero_paciente == 'M'
                    ? 'Masculino'
                    : ($datos->consulta->cita->paciente->genero_paciente == 'F'
                        ? 'Femenino'
                        : '') }}
                </td>
                </tr>
                <tr>
                    <td style="font-weight: 900">Altura</td>
                    <td>{{ $datos->consulta->cita->paciente->altura_paciente }} Metros</td>
                </tr>
                <tr>
                    <td style="font-weight: 900">Peso</td>
                    <td>{{ $datos->consulta->cita->paciente->peso_paciente }} Kg</td>
                </tr>
                <tr>
                    <td style="font-weight: 900">Dirección de domicilio</td>
                    <td>{{ $datos->consulta->cita->paciente->direccion_paciente }}</td>
                </tr>
                <tr>
                    <td style="font-weight: 900">Teléfono / Celular</td>
                    <td>{{ $datos->consulta->cita->paciente->telefono_paciente }}</td>
                </tr>
            </table>
        </td>

        <td>
            <table style="width: 100%; border-collapse: collapse; border: 1px solid black; ">
                <tr>
                    <td style="text-align: center; font-weight: 900; border-bottom: 1px solid black">Ha presentado
                        complicaciones</td>
                </tr>
                <tr>
                    <td style="text-align: center; ">{{ $datos->pregunta?->respuesta1 ?? 'Ninguno' }}</td>
                </tr>
                <tr>
                    <td style="text-align: center; font-weight: 900; border: 1px solid black">¿Está siendo tratado por
                        un médico actualmente?</td>
                </tr>
                <tr>
                    <td style="text-align: center;">{{ $datos->pregunta?->respuesta2 ?? 'Ninguno' }}</td>
                </tr>
                <tr>
                    <td style="text-align: center; font-weight: 900; border: 1px solid black">¿Está tomando algún tipo
                        de medicamento?</td>

                </tr>
                <tr>
                    <td style="text-align: center;">{{ $datos->pregunta?->respuesta3 ?? 'Ninguno' }}</td>
                </tr>
                <tr>
                    <td style="text-align: center; font-weight: 900; border: 1px solid black">¿Es usted alérgico/a algún
                        medicamento?</td>

                </tr>
                <tr>
                    <td style="text-align: center;">{{ $datos->pregunta?->respuesta4 ?? 'Ninguno' }}</td>
                </tr>
            </table>
        </td>

    </table>
    <table style="width: 100%;border-collapse: collapse;   border: 1px solid black; margin: 0 auto; margin-top: none; border-bottom: none">
        <tr>
            <td style="text-align: center; margin: 0 auto; width: 100%;">Enfermedades que padece el paciente</td>
        </tr>     
    </table> 
    <table style="width: 100%; border-collapse: collapse;  border: 1px solid black; margin: 0 auto; margin-top: none; ">
              
        @if ($datos->enfermedad_paciente->count() > 0)
            @foreach ($datos->enfermedad_paciente as $enfermedad)
                <tr>
                    <td>
                        <span style="font-weight: 900">Enfermedad: </span> {{ $enfermedad->enfermedades->nombre_enfermedad }}
                    </td>
                    <td style="text-align: start">
                        <span style="font-weight: 900">Tratamiento: </span> {{ $enfermedad->tratamiento_enfermedad }}
                    </td>
                </tr>
            @endforeach
        @else
            Ninguna
        @endif
    </table>
    <table style="">
        <td>
            <table style="width: 100%; border-collapse: collapse; border: 1px solid black;">
                <tr>
                    <th colspan="2">Examenes Extraorales</th>
                </tr>
                <tr>
                    <td style="font-weight: 900">Cabeza:</td>
                    <td>{{$datos->examen_extraoral->examen_cabeza->nombre_cabeza ?? 'No especificado'}}</td>
                    
                </tr>
                <tr>
                    <td style="font-weight: 900">Cara:</td>
                    <td>{{$datos->examen_extraoral->examen_cara->nombre_cara ?? 'No especificado'}}</td>
                </tr>
                <tr>
                    <td style="font-weight: 900">ATM:</td>
                    <td>{{$datos->examen_extraoral->examen_atm->nombre_atm ?? 'No especificado'}}</td>
                    
                </tr>
                <tr>
                    <td style="font-weight: 900">Ganglios:</td>
                    <td>{{$datos->examen_extraoral->examen_ganglios->nombre_ganglios ?? 'No especificado'}}</td>
                </tr>
                <tr>
                    <td style="font-weight: 900">Labios:</td>
                    <td>{{$datos->examen_extraoral->examen_labios->nombre_labios ?? 'No especificado'}}</td>
                    
                </tr>
                <tr>
                    <td style="font-weight: 900">Señas Particulares:</td>
                    <td>{{$datos->examen_extraoral->examen_señasp->nombre_señasp ?? 'No especificado'}}</td>
                </tr>
            </table>
        
            
        </td>
        <td>
            <table style="width: 100%; border-collapse: collapse; border: 1px solid black;">
                <tr>
                    <th colspan="2">Examenes Intraorales</th>
                </tr>
                <tr>
                    <td style="font-weight: 900">Encía:</td>
                    <td>{{$datos->examen_intraoral->encia->nombre_encia ?? 'No especificado'}}</td>
                    
                </tr>
                <tr>
                    <td style="font-weight: 900">Lengua:</td>
                    <td>{{$datos->examen_intraoral->lengua->nombre_lengua ?? 'No especificado'}}</td>
                </tr>
                <tr>
                    <td style="font-weight: 900">Paladar Duro:</td>
                    <td>{{$datos->examen_intraoral->paladar_duro->nombre_paladard ?? 'No especificado'}}</td>
                    
                </tr>
                <tr>
                    <td style="font-weight: 900">Paladar Blando:</td>
                    <td>{{$datos->examen_intraoral->paladar_blando->nombre_paladarb ?? 'No especificado'}}</td>
                </tr>
                <tr>
                    <td style="font-weight: 900">Faringe:</td>
                    <td>{{$datos->examen_intraoral->faringe ?? 'No especificado'}}</td>
                    
                </tr>
                <tr>
                    <td style="font-weight: 900">Piso de la Boca:</td>
                    <td>{{$datos->examen_intraoral->piso_boca->nombre_boca ?? 'No especificado'}}</td>
                </tr>
                <tr>
                    <td style="font-weight: 900">Reborde Residual:</td>
                    <td>{{$datos->examen_intraoral->reborde->nombre_reborde ?? 'No especificado'}}</td>
                    
                </tr>
                <tr>
                    <td style="font-weight: 900">Tipo de Oclusión:</td>
                    <td>{{$datos->examen_intraoral->oclusion->nombre_oclusion ?? 'No especificado'}}</td>
                </tr>
            </table>
        </td>
    </table>

</body>

</html>
