<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cnpj extends Model
{
    protected $table = 'cnpjs';

    public $timestamps = false;

    protected $fillable = [
        'nome', 'cnpj','municipio'
    ];

}
