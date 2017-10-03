<?php

namespace App\Http\Controllers;

use App\Coffee;
use App\User;
use Illuminate\Http\Request;

class CoffeeController extends Controller
{
    public function index(User $user)
    {
      return $user->coffees;
    }

    public function store(Request $request, User $user)
    {
      $coffee = new Coffee($request->only(['schedule']));
      $user->coffees()->save($coffee);

      return $coffee;
    }
}
