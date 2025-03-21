<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Nivel;

class NivelTest extends TestCase
{
    use RefreshDatabase;

    public function pode_listar_niveis()
    {
        Nivel::factory()->count(3)->create();

        $response = $this->getJson('/api/niveis');

        $response->assertStatus(200)
                ->assertJsonCount(3, 'data');
    }

    public function pode_criar_um_nivel()
    {
        $data = ['nivel' => 'Sênior'];

        $response = $this->postJson('/api/niveis', $data);

        $response->assertStatus(201)
                 ->assertJsonFragment(['nivel' => 'Sênior']);
    }

    public function nao_pode_criar_um_nivel_sem_nome()
    {
        $response = $this->postJson('/api/niveis', []);

        $response->assertStatus(422)
                ->assertJson([
                    'messages' => [
                        'nivel' => ['The nivel field is required.']
                    ]
                ]);
    }

    public function pode_atualizar_um_nivel()
    {
        $nivel = Nivel::factory()->create(['nivel' => 'Júnior']);

        $data = ['nivel' => 'Pleno'];

        $response = $this->putJson("/api/niveis/{$nivel->id}", $data);

        $response->assertStatus(200)
                 ->assertJsonFragment(['nivel' => 'Pleno']);
    }

    public function pode_excluir_um_nivel()
    {
        $nivel = Nivel::factory()->create();

        $response = $this->deleteJson("/api/niveis/{$nivel->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('niveis', ['id' => $nivel->id]);
    }
}
