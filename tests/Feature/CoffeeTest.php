<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CoffeeTest extends TestCase
{
    use RefreshDatabase;

    private $coffeeData = [
      'schedule' => '2017-10-03 16:01:00',
    ];

    public function setUp() {
      parent::setUp();

      factory(User::class)->create();
    }

    public function testCoffeePost()
    {
        $response = $this->json('POST', '/api/users/1/coffees', $this->coffeeData);
        $response->assertSuccessful();

        $response = $this->json('GET', '/api/users/1/coffees');
        $response->assertSuccessful()
          ->assertJsonFragment($this->coffeeData);
    }
}
