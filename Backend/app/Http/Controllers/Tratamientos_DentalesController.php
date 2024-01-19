<?php

namespace App\Http\Controllers;

use App\Http\Resources\Tratamientos_DentalesResource;
use App\Models\Tratamientos_Dentales;
use Illuminate\Http\Request;

class Tratamientos_DentalesController extends Controller
{
    public function index()
    {
        if (!$tratamientos = Tratamientos_Dentales::all()) {
            return response()->json(['errors' => 'No se encuentran tratamientos en la base de datos'], 404);
        }
        return Tratamientos_DentalesResource::collection($tratamientos);
    }
}
