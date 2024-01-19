<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Clientes extends Model
{
    protected $table = 'cliente';
    protected $primaryKey = 'idcliente';
    protected $foreingKey = 'ididentificacion';
    public $timestamps = false;
    protected $fillable = [
        'idcliente',
        'ididentificacion',
        'nombre_cliente',
        'apellidos_cliente', 
        'identificacion_cliente',
        'edad_cliente',
        'genero_cliente',
        'telefono_cliente',
        'direccion_cliente',
        'correo_cliente',
    ];

    public function identificacion(): HasOne
    {
        return $this->HasOne(Tipo_Identificacion::class, 'ididentificacion', 'ididentificacion');
    }

    public function cabecera()
    {
        return $this->hasMany(Cabecera::class, 'idcliente', 'idcliente');
    }
}
