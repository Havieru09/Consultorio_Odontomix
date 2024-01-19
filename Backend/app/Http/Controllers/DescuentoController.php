<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Descuento;
use App\Http\Resources\DescuentoResource;

class DescuentoController extends Controller
{
    public function index()
    {
        if (!$descuentos = Descuento::all()) {
            return response()->json(['errors' => 'No se encuentra el descuento'], 404);
        }

        return DescuentoResource::collection($descuentos);
    }

    public function store(Request $request)
    {
        if (!$request->nombre_descuento || !$request->porcentaje_descuento) {
            return response()->json(['errors' => 'Faltan datos para procesar la solicitud'], 400);
        }
        return new DescuentoResource(Descuento::create($request->all()));
    }

    public function show($iddescuento)
    {
        if (!$descuento = Descuento::find($iddescuento)) {
            return response()->json(['errors' => 'No se encuentra el descuento'], 404);
        }

        return new DescuentoResource($descuento);
    }

    public function update(Request $request, $iddescuento)
    {
        if (!$descuento = Descuento::find($iddescuento)) {
            return response()->json(['errors' => 'No se encuentra el descuento'], 404);
        }

        $descuento->update($request->all());
        return new DescuentoResource($descuento);
    }

}
