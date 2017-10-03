<?php

namespace App\Http\Controllers;

use App\Coffee;
use App\Profile;
use Illuminate\Http\Request;

class CoffeeController extends Controller
{
    public function index(Profile $profile)
    {
      return $profile->coffees;
    }

    public function store(Request $request, Profile $profile)
    {
      $coffee = new Coffee($request->only(['schedule']));
      $profile->coffees()->save($coffee);

      return $coffee;
    }
}
