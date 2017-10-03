<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ProfileTest extends TestCase
{
    use RefreshDatabase;

    private $profileData = [
      'username' => 'test',
      'fullname' => 'test name',
    ];

    private function createProfile()
    {
      $response = $this->json('POST', '/api/profiles', $this->profileData);
      $response->assertSuccessful();

      return $response;
    }

    public function testProfilePost()
    {
        $this->createProfile();

        $response = $this->json('GET', '/api/profiles');
        $response->assertSuccessful()
          ->assertJsonFragment($this->profileData);
    }

    public function testProfilePut()
    {
        $profile = json_decode($this->createProfile()->content());

        $req = [
          'username' => 'updated',
          'fullname' => 'updated name',
        ];

        $response = $this->json('PUT', '/api/profiles/'.$profile->id, $req);
        $response->assertSuccessful();

        $response = $this->json('GET', '/api/profiles');
        $response->assertSuccessful()
          ->assertJsonFragment($req);
    }
}
