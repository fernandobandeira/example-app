<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;

class UserController extends Controller
{
    public function index()
    {
      return User::All();
    }

    public function store(UserRequest $request)
    {
      return User::create($request->only([
        'username',
        'fullname',
      ]));
    }

    public function update(UserRequest $request, User $user)
    {
      return tap($user)->update($request->only([
        'username',
        'fullname',
      ]));
    }
}
