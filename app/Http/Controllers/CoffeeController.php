<?php

namespace App\Http\Controllers;

use App\User;
use App\Coffee;
use Illuminate\Http\Request;
use App\Http\Requests\CoffeeRequest;

class CoffeeController extends Controller
{
    public function index(User $user)
    {
      return $user->coffees;
    }

    public function store(CoffeeRequest $request, User $user)
    {
      $coffee = new Coffee($request->only(['schedule']));
      $user->coffees()->save($coffee);

      return $coffee;
    }
}
