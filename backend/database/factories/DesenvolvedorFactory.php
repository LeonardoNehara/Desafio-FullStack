<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Desenvolvedor;
use App\Models\Nivel;

class DesenvolvedorFactory extends Factory
{
    protected $model = Desenvolvedor::class;

    public function definition()
    {
        return [
            'nivel_id' => Nivel::factory(),
            'nome' => $this->faker->name(),
            'sexo' => $this->faker->randomElement(['M', 'F']),
            'data_nascimento' => $this->faker->date(),
            'hobby' => $this->faker->sentence(),
        ];
    }
}
