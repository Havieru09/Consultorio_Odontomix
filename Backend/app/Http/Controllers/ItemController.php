<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\ItemResource;
use App\Models\Item;

class ItemController extends Controller
{
    public function index()
    {
        return ItemResource::collection(Item::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'idtratamiento' => 'required',
            'descripcion_item' => 'required',
            'precio_item' => 'required',
        ]);
        return new ItemResource(Item::create($request->all()));
    }

    public function show($iditem)
    {
        if (!$item = Item::find($iditem)) {
            return response()->json(['errors' => 'Item no encontrado'], 404);
        }
        return new ItemResource($item);
    }

    public function update(Request $request, $iditem)
    {
        if (!$item = Item::find($iditem)) {
            return response()->json(['errors' => 'No se encuentra el Item que desea actualizar'], 404);
        }
        $item->update($request->all());
        return new ItemResource($item);
    }

    public function destroy($iditem)
    {
        if (!$item = Item::find($iditem)) {
            return response()->json(['errors' => 'No se encuentra el Item que desea eliminar'], 404);
        }
        $item->delete();
        return response()->json(['exito' => 'Item eliminado con id: ' . $item->iditem], 200);
    }
}
