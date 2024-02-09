<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClienteRequest;
use Illuminate\Http\Request;
use App\Http\Resources\ClientesResource;
use App\Models\Cita;
use App\Models\Clientes;

class ClientesController extends Controller
{

    public function index()
    {
        $clientes = Clientes::paginate(10);

        return response()->json([
            'data' => ClientesResource::collection($clientes),
            'total' => $clientes->total(),
            'perPage' => $clientes->perPage(),
            'currentPage' => $clientes->currentPage(),
            'lastPage' => $clientes->lastPage(),
        ]);
    }


    public function store(ClienteRequest $request)
    {
        $request->validated();
        return new ClientesResource(Clientes::create($request->all()));
    }

    public function show($idcliente)
    {
        if (!$clientes = Clientes::find($idcliente)) {
            return response()->json(['errors' => 'Cliente no encontrado'], 404);
        }
        return new ClientesResource($clientes);
    }

    public function showCliente($identificacion_cliente)
    {
        if (!$clientes = Clientes::where('identificacion_cliente', $identificacion_cliente)->first()) {
            return response()->json(['errors' => 'Cliente no encontrado'], 404);
        }
        return new ClientesResource($clientes);
    }

    
    public function todo()
    {
        $clientes = Clientes::all();
        return response()->json([
            'data' => ClientesResource::collection($clientes),
        ]);
    }

    public function update(Request $request, $idcliente)
    {
        if (!$clientes = Clientes::find($idcliente)) {
            return response()->json(['errors' => 'No se encuentra el cliente que desea actualizar'], 404);
        }
        $clientes->update($request->all());
        return new ClientesResource($clientes);
    }

    public function destroy($idcliente)
    {
        if (Cita::where('idcliente', $idcliente)->exists()) {
            return response()->json(['errors' => 'No se puede eliminar el cliente porque tiene documentos relacionados'], 404);
        }
        if (!$clientes = Clientes::find($idcliente)) {
            return response()->json(['errors' => 'No se encuentra el cliente que desea eliminar'], 404);
        }

        $clientes->delete();
        return new ClientesResource($clientes);
    }
}
