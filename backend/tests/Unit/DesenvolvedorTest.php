<?php
namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Desenvolvedor;
use App\Models\Nivel;
use Carbon\Carbon;

class DesenvolvedorTest extends TestCase
{
    use RefreshDatabase;

    public function pode_listar_desenvolvedores()
    {
        Nivel::factory()->create(); 
        Desenvolvedor::factory()->count(3)->create();

        $response = $this->getJson('/api/desenvolvedores');

        $response->assertStatus(200)
                 ->assertJsonCount(3, 'data');
    }

    public function pode_criar_um_desenvolvedor()
    {
        $nivel = Nivel::factory()->create();

        $data = [
            "nivel_id" => $nivel->id,
            "nome" => "Julia Castro",
            "sexo" => "F",
            "data_nascimento" => "1995-06-15",
            "hobby" => "Programar"
        ];

        $response = $this->postJson('/api/desenvolvedores', $data);

        $response->assertStatus(201)
                 ->assertJsonFragment(["nome" => "Julia Castro"]);

        $desenvolvedor = Desenvolvedor::latest()->first();
        $idadeEsperada = Carbon::parse('1995-06-15')->age;
        $this->assertEquals($idadeEsperada, $desenvolvedor->idade);
    }

    public function pode_atualizar_um_desenvolvedor()
    {
        $desenvolvedor = Desenvolvedor::factory()->create();

        $data = [
            "nome" => "Novo Nome",
            "nivel_id" => $desenvolvedor->nivel_id,
            "sexo" => $desenvolvedor->sexo,
            "data_nascimento" => $desenvolvedor->data_nascimento,
            "hobby" => $desenvolvedor->hobby
        ];

        $response = $this->putJson("/api/desenvolvedores/{$desenvolvedor->id}", $data);

        $response->assertStatus(200)
                ->assertJsonFragment(["nome" => "Novo Nome"]);

        $desenvolvedorAtualizado = Desenvolvedor::find($desenvolvedor->id);
        $idadeEsperada = Carbon::parse($desenvolvedorAtualizado->data_nascimento)->age;
        $this->assertEquals($idadeEsperada, $desenvolvedorAtualizado->idade);
    }

    public function pode_excluir_um_desenvolvedor()
    {
        $nivel = Nivel::factory()->create();
        $desenvolvedor = Desenvolvedor::factory()->create(['nivel_id' => $nivel->id]);

        $response = $this->deleteJson("/api/desenvolvedores/{$desenvolvedor->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('desenvolvedores', ['id' => $desenvolvedor->id]);
    }

     public function pode_listar_desenvolvedores_por_nivel()
     {
         $nivel = Nivel::factory()->create(['nivel' => 'Júnior']);
         Desenvolvedor::factory()->create(['nivel_id' => $nivel->id, 'sexo' => 'M']);
         Desenvolvedor::factory()->create(['nivel_id' => $nivel->id, 'sexo' => 'F']);
 
         $response = $this->getJson('/api/desenvolvedores-por-nivel');
 
         $response->assertStatus(200)
                  ->assertJsonFragment(['nivel' => 'Júnior', 'masculino' => 1, 'feminino' => 1]);
     }

     public function retorna_erro_se_nenhum_nivel_existir()
     {
         $response = $this->getJson('/api/desenvolvedores-por-nivel');
 
         $response->assertStatus(404)
                  ->assertJson(['error' => 'Nenhum nível encontrado']);
     }
}

