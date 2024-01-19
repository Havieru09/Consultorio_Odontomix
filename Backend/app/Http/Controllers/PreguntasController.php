<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\PreguntasResource;
use App\Models\Preguntas;

class PreguntasController extends Controller
{
    public function  index()
    {
        if (!$preguntas = Preguntas::all()) {
            return response()->json(['errors' => 'No se encuentran preguntas en la base de datos'], 404);
        }
        return PreguntasResource::collection($preguntas);
    }

    public function store(Request $request)
    {
        if($request->respuesta1 == null && $request->respuesta2 == null && $request->respuesta3 == null && $request->respuesta4 == null)
        {
            return true;
        }else
       if(!$request->respuesta1 && !$request->respuesta2 && !$request->respuesta3 && !$request->respuesta4)
       {
       }
       return new PreguntasResource(Preguntas::create($request->all()));
    }

    public function show($idpreguntas)
    {
        if (!$preguntas = Preguntas::find($idpreguntas)) {
            return response()->json(['errors' => 'Pregunta no encontrada'], 404);
        }
        return new PreguntasResource($preguntas);
    }
}
