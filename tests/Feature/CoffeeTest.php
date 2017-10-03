<?php

namespace Tests\Feature;

use App\Profile;
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

      factory(Profile::class)->create();
    }

    public function testCoffeePost()
    {
        $response = $this->json('POST', '/api/profiles/1/coffees', $this->coffeeData);
        $response->assertSuccessful();

        $response = $this->json('GET', '/api/profiles/1/coffees');
        $response->assertSuccessful()
          ->assertJsonFragment($this->coffeeData);
    }
}
