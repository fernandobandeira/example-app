<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    private $userData = [
      'username' => 'test',
      'fullname' => 'test name',
    ];

    private function createUser()
    {
      $response = $this->json('POST', '/api/users', $this->userData);
      $response->assertSuccessful();

      return $response;
    }

    public function testUserPost()
    {
        $this->createUser();

        $response = $this->json('GET', '/api/users');
        $response->assertSuccessful()
          ->assertJsonFragment($this->userData);
    }

    public function testUserPut()
    {
        $user = json_decode($this->createUser()->content());

        $req = [
          'username' => 'updated',
          'fullname' => 'updated name',
        ];

        $response = $this->json('PUT', '/api/users/'.$user->id, $req);
        $response->assertSuccessful();

        $response = $this->json('GET', '/api/users');
        $response->assertSuccessful()
          ->assertJsonFragment($req);
    }
}
