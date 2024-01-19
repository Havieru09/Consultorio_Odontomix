<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\OdontogramaResource;
use App\Models\Odontograma;

class OdontogramaController extends Controller
{
    public function index()
    {
        if (!$odontograma = Odontograma::all()) {
            return response()->json(['errors' => 'No se encuentra un registro'], 404);
        }
        return OdontogramaResource::collection($odontograma);
    }

    public function store(Request $request)
    {
        return new OdontogramaResource(Odontograma::create($request->all()));
    }

    public function estado($idhistorial)
    {
        $historial = Odontograma::where('idhistorial', $idhistorial)->get();
        foreach ($historial as $historial) {
            if ($historial->estado_odontograma == 1) {
                return true;
            } else
                return false;
        }
    }
}
