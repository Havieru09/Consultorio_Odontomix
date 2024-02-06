<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\CabeceraResource;
use App\Models\Cabecera;
use Barryvdh\DomPDF\Facade\Pdf as FacadePdf;

class CabeceraController extends Controller
{
    public function index()
    {
        if(!$cabecera = Cabecera::with(['detalle.item'])->get()){
            return response()->json(['errors'=>'No se encuentra un registro'],404);
        }
        return CabeceraResource::collection($cabecera);
    }

    public function store(Request $request)
    {
        return new CabeceraResource(Cabecera::create($request->all()));
    }

    public function show($n_documento)
    {
        if(!$cabecera = Cabecera::with(['detalle.item'])->where('n_documento',$n_documento)->first()){
            return response()->json(['errors'=>'No se encuentra un registro'],404);
        }
        return new CabeceraResource($cabecera);
    }

    public function informe($n_documento)
    {
        $datos = Cabecera::with(['detalle'])->with(['cliente'])->where('n_documento', $n_documento)->first();
        // dd($datos->detalle->item);
        $datos = ['datos' => $datos];
        $pdf = FacadePdf::loadView('InformeFactura', $datos);
        return $pdf->download('InformeFactura.pdf');
    }

    public function update(Request $request, $n_documento)
    {
        if(!$cabecera = Cabecera::find($n_documento)){
            return response()->json(['errors'=>'No se encuentra un registro'],404);
        }
        $cabecera->update($request->all());
        return new CabeceraResource($cabecera);
    }

    public function anular($n_documento)
    {
        if(!$cabecera = Cabecera::find($n_documento)){
            return response()->json(['errors'=>'No se encuentra un registro'],404);
        }
        $cabecera->update(['estado_factura'=>1]);
        return new CabeceraResource($cabecera);
    }
}