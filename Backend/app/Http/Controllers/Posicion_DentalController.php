<?php

namespace App\Http\Controllers;

use App\Http\Resources\Posicion_DentalResource;
use App\Models\Posicion_Dental;
use Illuminate\Http\Request;

class Posicion_DentalController extends Controller
{
    public function index()
    {
        if (!$posicion_dental = Posicion_Dental::all()) {
            return response()->json(['errors' => 'No se encuentran la posicion dental en la base de datos'], 404);
        }
        return Posicion_DentalResource::collection($posicion_dental);
    }
}
