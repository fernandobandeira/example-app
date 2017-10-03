<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $fillable = [
      'username',
      'fullname',
    ];

    /**
    * Get the coffees for the profile.
    */
    public function coffees()
    {
        return $this->hasMany('App\Coffee');
    }
}
