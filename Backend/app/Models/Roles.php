<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Roles extends Model
{
    use HasFactory;

    protected $table = 'roles';
    public $timestamps = false;
    protected $primaryKey = 'idroles';

    protected $fillable = [
        'idroles',
        'nombre_roles',
    ];

    public function usuarios(): BelongsTo
    {
        return $this->BelongsTo(Usuario::class);
    }
}
