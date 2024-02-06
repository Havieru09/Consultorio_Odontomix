<!DOCTYPE html>
<html>
<head>
    <title>Factura</title>
</head>
<body>
    <table class="header-table" style="width: 100%">
        <tr style="width: 100%" >
            <td><img src="http://localhost:5173/img/logo-sinfondo.png" style="max-height: 100px; text-align: end" alt="Logo" /></td>
            <td>
                <h1 style="font-size: 13px; font-weight: 900; text-align: center;">CENTRO DE ATENCIÓN ODONTOLÓGICA – OD. JUAN MURILLO LLANOS
                </h1>
                <h2 style="font-size: 13px; text-align: center">Cdla. Luis Morejón Almeida Manzana A2 Villa 16/ Calle 1 S-O y José de la
                    Cuadra.</h2>
                <h3 style="text-align: center">Celular: 0982247948. Bio: https://biolink.info/odontomix</h3>
            </td>
        </tr>
    </table>
    <table class="header-table" style="width: 100%">
        <tr style="width: 100%">
            <h1 style="text-align: center">Factura</h1>
        </tr>
    </table>
    <table style="width: 100%; border-collapse: collapse; text-align: center ">
        <tr>
            <td>N° Factura:</td>
            <td>{{ $datos->n_documento }}</td>
            <td>Concepto:</td>
            <td>{{ $datos->concepto_factura }}</td>
        </tr>
    </table>
    <hr>
    <table style="width: 100%; border-collapse: collapse; text-align: center; line-height: 40px;">
        <tr>
            <td>Cliente:</td>
            <td>{{ $datos->cliente->nombre_cliente }}</td>
            <td>CI:</td>
            <td>{{ $datos->cliente->identificacion_cliente }}</td>
        </tr>
        <tr>
            <td>Direccion:</td>
            <td>{{ $datos->cliente->direccion_cliente }}</td>
            <td>Telefono:</td>
            <td>{{ $datos->cliente->telefono_cliente }}</td>            
        </tr>
        <tr>
            <td>Email</td>
            <td>{{ $datos->cliente->correo_cliente }}</td>
            <td>Fecha:</td>
            <td>{{ $datos->fecha_factura }}</td>
        </tr>
    </table>

    
    {{-- @dd($datos->cliente) --}}
    {{-- @dd($datos) --}}

    {{-- <h2>Detalle</h2> --}}
    
    <table style="width: 100%; border-collapse: collapse; border: 1px solid black;  margin-top: 30px ; line-height: 40px; text-align: center">
        <thead>
            <tr>
                <th style="background-color: #f2f2f2; border: 1px solid black; padding: 8px">Nombre del Servicio</th>
                <th style="background-color: #f2f2f2; border: 1px solid black; padding: 8px">Descripción</th>
                <th style="background-color: #f2f2f2; border: 1px solid black; padding: 8px">Precio</th>
                <th style="background-color: #f2f2f2; border: 1px solid black; padding: 8px">Cantidad</th>
                <th style="background-color: #f2f2f2; border: 1px solid black; padding: 8px">IVA</th>
                <th style="background-color: #f2f2f2; border: 1px solid black; padding: 8px">Descuento</th>
                <th style="background-color: #f2f2f2; border: 1px solid black; padding: 8px">Subtotal</th>
            </tr>
        </thead>
        <tbody style="border: 1px solid black; ">
            @php $subtotalGeneral = 0; @endphp
            @foreach ($datos->detalle as $item)
                @php
                    $subtotalItem = $item->cantidad * $item->item->precio_item; // Subtotal por ítem
                    $subtotalGeneral += $subtotalItem; // Acumulamos para el subtotal general
                @endphp
                <tr style="text-align: center">
                    <td style="border: 1px solid black; padding: 8px">Profilaxis Normal</td>
                    <td style="border: 1px solid black; padding: 8px">{{ $item->detalle }}</td>
                    <td style="border: 1px solid black; padding: 8px">{{ $item->item->precio_item }}</td>
                    <td style="border: 1px solid black; padding: 8px">{{ $item->cantidad }}</td>
                    <td style="border: 1px solid black; padding: 8px">{{ $item->iva_detalle }}</td>
                    <td style="border: 1px solid black; padding: 8px">{{ $item->descuento_detalle }}</td>
                    <td style="border: 1px solid black; padding: 8px">{{ $subtotalItem }}</td>
                </tr>                
            @endforeach
        </tbody>
    </table>
    {{-- @dd($datos) --}}
    <table style="width: 100%; border-collapse: collapse; border: 1px solid black;  margin-top: 30px ; line-height: 40px; margin-left: auto; margin-right: auto;">
        <tr>
            <td style="padding: 0 20px; text-align: center;">Subtotal:</td>
            <td style="padding: 0 20px; text-align: left;">{{ $subtotalGeneral }}</td>
        </tr>
        <tr>
            <td style="padding: 0 20px; text-align: center;">IVA:</td>
            <td style="padding: 0 20px; text-align: left;">{{ $datos->tiva_factura }}</td>
        </tr>
        <tr>
            <td style="padding: 0 20px; text-align: center;">Descuento:</td>
            <td style="padding: 0 20px; text-align: left;">{{ $datos->descuento_factura }}</td>
        </tr>
        <tr>
            <td style="padding: 0 20px; text-align: center;">Total:</td>
            <td style="padding: 0 20px; text-align: left;">{{ $datos->total_factura }}</td>
        </tr>
    </table>
</body>
</html>
