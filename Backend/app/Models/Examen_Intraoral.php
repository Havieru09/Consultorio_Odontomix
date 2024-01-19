<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Examen_Intraoral extends Model
{

    protected $table = 'examenes_intraoral';
    protected $primaryKey = 'idintraoral';
    public $timestamps = false;
    protected $fillable = [
    
        'idintraoral',
        'idexamen_encia',
        'idexamen_lengua',
        'idexamen_paladar_duro',
        'idexamen_paladar_blando',
        'faringe',
        'idexamen_piso_boca',
        'idexamen_reborde',
        'idexamen_oclusion',
    ];

    public function encia(): BelongsTo
    {
        return $this->BelongsTo(Examen_Encia::class, 'idexamen_encia');
    }

    public function lengua(): BelongsTo
    {
        return $this->BelongsTo(Examen_Lengua::class, 'idexamen_lengua');
    }

    public function paladar_duro(): BelongsTo
    {
        return $this->BelongsTo(Examen_PaladarDuro::class, 'idexamen_paladar_duro');
    }

    public function paladar_blando(): BelongsTo
    {
        return $this->BelongsTo(Examen_PaladarBlando::class, 'idexamen_paladar_blando');
    }

    public function piso_boca(): BelongsTo
    {
        return $this->BelongsTo(Examen_Boca::class, 'idexamen_piso_boca');
    }

    public function reborde(): BelongsTo
    {
        return $this->BelongsTo(Examen_Reborde::class, 'idexamen_reborde');
    }

    public function oclusion(): BelongsTo
    {
        return $this->BelongsTo(Examen_Oclusion::class, 'idexamen_oclusion');
    }    
}
