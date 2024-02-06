<!DOCTYPE html>
<html>
<head>
    <title>Factura</title>
</head>
<body>
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
    <h1>Factura</h1>
    <p><strong>Número de Documento:</strong> {{ $datos->n_documento }}</p>
    <p><strong>Concepto de Factura:</strong> {{ $datos->concepto_factura }}</p>
    <p><strong>Descuento Total de Factura:</strong> {{ $datos->descuento_factura }}</p>
    <p><strong>IVA Total de Factura:</strong> {{ $datos->iva_total }}</p>
    <p><strong>Total de Factura:</strong> {{ $datos->total_factura }}</p>
    <p><strong>Fecha de Factura:</strong> {{ $datos->fecha_factura }}</p>

    <h2>Ítems:</h2>
    <table border="1">
        <thead>
            <tr>
                <th>Cantidad</th>
                <th>Descuento</th>
                <th>IVA</th>
                <th>Subtotal</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($datos->detalle as $item)
                <tr>
                    <td>{{ $item->cantidad }}</td>
                    <td>{{ $item->descuento_detalle }}</td>
                    <td>{{ $item->iva_detalle }}</td>
                    <td>{{ $item->subtotal_detalle }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
