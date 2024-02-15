<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />

</head>

<body class="antialiased">
    <h1 class="text-center text-4xl font-semibold">Notificación del Sistema de Agendamiento de Citas del consultorio Odontomix</h1>
    <p class="text-center text-2xl font-semibold">Estimado Sr/Sra. {{$msg['nombre_cliente']}} {{$msg['apellidos_cliente']}}</p>
    <p class="text-center text-2xl font-semibold">Confirmamos que su cita al odontologo para el paciente {{$msg['nombre_paciente']}} {{$msg['apellidos_paciente']}} para el día {{$msg['dia2']}}, {{$msg['dia']}} {{$msg['mes']}} {{$msg['anio']}} a las {{$msg['hora']}}</p>
    <p class="text-center text-2xl font-semibold">Saludos Cordiales</p>
    <p class="text-center text-2xl font-semibold">Este correo ha sido generado automáticamente por el sistema, por favor no responda al mismo.</p>
    <p class="text-center text-2xl font-semibold">Gracias por usar nuestros servicios</p>
</body>
</html>