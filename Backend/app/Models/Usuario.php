<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Hash;


class Usuario extends Model implements \Illuminate\Contracts\Auth\Authenticatable
{
    use HasFactory;

    protected $table = 'usuario';
    protected $primaryKey = 'idusuario';
    protected $foreignKey = 'idroles';
    public $timestamps = false;
    protected $fillable = [
        'idusuario',
        'idroles',
        'nombre_usuario',
        'password',
    ];

    public function roles(): BelongsTo
    {
        return $this->belongsTo(Roles::class, 'idroles');
    }

    protected static function booted()
    {
        static::creating(function ($contraseña) {
            $contraseña->password = Hash::make($contraseña->password);
        });
        static::updating(function ($contraseña) {
            $contraseña->password = Hash::make($contraseña->password);
        });
    }

    public function getAuthIdentifierName()
    {
        return $this->nombre_usuario;
    }

    public function getAuthIdentifier()
    {
        return $this->idusuario;
    }

    public function getAuthPassword()
    {
        return $this->password;
    }

    public function getRememberToken()
    {
        return null;
    }

    public function setRememberToken($value)
    {
        return null;
    }

    public function getRememberTokenName()
    {
        return null;
    }

}
