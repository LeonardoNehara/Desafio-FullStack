<?php

namespace App\Http\Controllers;
use App\Models\Desenvolvedor;
use App\Models\Nivel;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Exception;
use Carbon\Carbon;

class DesenvolvedorController extends Controller
{
    public function index()
    {
        try {
            $perPage = 10; 
            $desenvolvedores = Desenvolvedor::with('nivel')->paginate($perPage);  
    
            if ($desenvolvedores->isEmpty()) {
                return response()->json(['error' => 'Nenhum desenvolvedor encontrado'], 404);
            }
    
            $desenvolvedores->getCollection()->transform(function ($dev) {
                $dev->idade = Carbon::parse($dev->data_nascimento)->age;
                return $dev;
            });
    
            return response()->json([
                'data' => $desenvolvedores->items(),
                'meta' => [
                    'total' => $desenvolvedores->total(),
                    'per_page' => $desenvolvedores->perPage(),
                    'current_page' => $desenvolvedores->currentPage(),
                    'last_page' => $desenvolvedores->lastPage(),
                ]
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Erro ao buscar desenvolvedores'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'nivel_id' => 'required|exists:niveis,id',
                'nome' => 'required|string|max:255',
                'sexo' => 'required|in:M,F',
                'data_nascimento' => 'required|date',
                'hobby' => 'required|string|max:255',
            ]);

            $desenvolvedor = Desenvolvedor::create($request->all());

            return response()->json($desenvolvedor, 201);
        } catch (Exception $e) {
            return response()->json(['error' => 'Erro ao cadastrar desenvolvedor'], 400);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $desenvolvedor = Desenvolvedor::findOrFail($id);

            $request->validate([
                'nivel_id' => 'required|exists:niveis,id',
                'nome' => 'required|string|max:255',
                'sexo' => 'required|in:M,F',
                'data_nascimento' => 'required|date',
                'hobby' => 'required|string|max:255',
            ]);

            $desenvolvedor->update($request->all());

            return response()->json($desenvolvedor, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Desenvolvedor não encontrado'], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'Erro ao atualizar desenvolvedor'], 400);
        }
    }

    public function destroy($id)
    {
        try {
            $desenvolvedor = Desenvolvedor::findOrFail($id);
            $desenvolvedor->delete();

            return response()->noContent();
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Desenvolvedor não encontrado'], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'Erro ao excluir desenvolvedor'], 400);
        }
    }

    public function getDesenvolvedoresPorNivel()
    {
        try {
            $dados = Nivel::with(['desenvolvedores' => function ($query) {
                $query->select('id', 'nivel_id', 'sexo');
            }])->get()->map(function ($nivel) {
                return [
                    'nivel' => $nivel->nivel,
                    'masculino' => $nivel->desenvolvedores->where('sexo', 'M')->count(),
                    'feminino' => $nivel->desenvolvedores->where('sexo', 'F')->count(),
                ];
            });

            if ($dados->isEmpty()) {
                return response()->json(['error' => 'Nenhum nível encontrado'], 404);
            }

            return response()->json($dados, 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Erro ao buscar desenvolvedores por nível'], 500);
        }
    }

    public function show($id)
    {
        try {
            $desenvolvedor = Desenvolvedor::with('nivel')->findOrFail($id);
            $desenvolvedor->idade = Carbon::parse($desenvolvedor->data_nascimento)->age;

            return response()->json($desenvolvedor, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Desenvolvedor não encontrado'], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'Erro ao buscar desenvolvedor'], 500);
        }
    }

}
