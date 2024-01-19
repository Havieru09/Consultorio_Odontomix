<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Ubicacion_DentalResource;
use App\Models\Ubicacion_Dental;

class Ubicacion_DentalController extends Controller
{
    public function index()
    {
        if (!$ubicacion_dental = Ubicacion_Dental::all()) {
            return response()->json(['errors' => 'No se encuentran la ubicacion dental en la base de datos'], 404);
        }
        return Ubicacion_DentalResource::collection($ubicacion_dental);
    }
}
