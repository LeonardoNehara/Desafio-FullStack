<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Desenvolvedor extends Model
{
    use HasFactory;

    protected $table = 'desenvolvedores';

    protected $fillable = [
        'nivel_id',
        'nome',
        'sexo',
        'data_nascimento',
        'hobby',
    ];

    public function nivel()
    {
        return $this->belongsTo(Nivel::class);
    }

    public function getIdadeAttribute()
    {
        return Carbon::parse($this->data_nascimento)->age;
    }

}
