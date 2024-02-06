<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClienteRequest;
use Illuminate\Http\Request;
use App\Http\Resources\ClientesResource;
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
        // if (!$clientes = Clientes::all()) {
        //     return response()->json(['errors' => 'No se encuentran clientes en la base de datos'], 404);
        // }
        // return ClientesResource::collection($clientes);
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
        if (!$clientes = Clientes::find($idcliente)) {
            return response()->json(['errors' => 'No se encuentra el cliente que desea eliminar'], 404);
        }
        $clientes->delete();
        return new ClientesResource($clientes);
    }
}
