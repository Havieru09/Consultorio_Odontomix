<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $table = 'items';
    protected $primaryKey = 'iditem';
    public $timestamps = false;
    protected $fillable = [
        'iditem',
        'idtratamiento',
        'descripcion_item',
        'precio_item',
    ];

    public function tratamientos_dentales()
    {
        return $this->belongsTo(Tratamientos_Dentales::class, 'idtratamiento');
    }

    public function detalle()
    {
        return $this->hasMany(Detalle::class, 'iditem');
    }
}
