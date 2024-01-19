<?php

namespace App\Http\Controllers;

use App\Http\Requests\DetalleRequest;
use Illuminate\Http\Request;
use App\Http\Resources\DetalleResource;
use App\Models\Detalle;
use App\Models\Cabecera;

class DetalleController extends Controller
{

    public function index()
    {
        if(!$detalle = Detalle::all()){
            return response()->json(['errors'=>'No se encuentran detalles en la base de datos'],404);
        }
        return DetalleResource::collection($detalle);
    }

    public function store(DetalleRequest $request)
    {
        $request->validated();
        return new DetalleResource(Detalle::create($request->all()));
    }

    public function show($idcabecera)
    {
        if(!$detalle = Detalle::where('idcabecera', $idcabecera)->get()->first){
            dd($detalle);
            return response()->json(['errors'=>'No se encuentra un detalle con ese id'],404);
        }        
        return new DetalleResource($detalle);
    }

    public function update(Request $request, $iddetalle)
    {
        if(!$detalle = Detalle::find($iddetalle)){
            return response()->json(['errors'=>'No se encuentra un detalle con ese id'],404);
        }
        $detalle->update($request->all());
        return new DetalleResource($detalle);
    }
}
