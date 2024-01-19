<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Hemisferio;
use App\Http\Resources\HemisferioResource;

class HemisferioController extends Controller
{
    public function index()
    {
        $hemisferios = Hemisferio::all();
        return HemisferioResource::collection($hemisferios);
    }
}
