<?php

use Faker\Generator as Faker;

$factory->define(App\Profile::class, function (Faker $faker) {
    return [
        'username' => $faker->unique()->userName,
        'fullname' => $faker->name,
    ];
});
