<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
      return User::All();
    }

    public function store(Request $request)
    {
      return User::create($request->only([
        'username',
        'fullname',
      ]));
    }

    public function update(Request $request, User $user)
    {
      return tap($user)->update($request->only([
        'username',
        'fullname',
      ]));
    }
}
