<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Tipo_Identificacion extends Model
{
    use HasFactory;

    protected $table = 'tipo_identificacion';
    protected $primaryKey = 'ididentificacion';
    public $timestamps = false;
    protected $fillable = [
        'ididentificacion',
        'nombre_identificacion',
    ];

    public function pacientes(): BelongsTo
    {
        return $this->BelongsTo(Paciente::class, 'ididentificacion');
    }

    public function clientes(): BelongsTo
    {
        return $this->BelongsTo(Clientes::class, 'ididentificacion');
    }
}
