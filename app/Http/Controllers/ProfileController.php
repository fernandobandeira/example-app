<?php

namespace App\Http\Controllers;

use App\Profile;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function index()
    {
      return Profile::All();
    }

    public function store(Request $request)
    {
      return Profile::create($request->only([
        'username',
        'fullname',
      ]));
    }

    public function update(Request $request, Profile $profile)
    {
      return tap($profile)->update($request->only([
        'username',
        'fullname',
      ]));
    }
}
