<?php

namespace App\Http\Controllers;

use App\Models\Nivel;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Exception;
use Illuminate\Validation\ValidationException;

class NivelController extends Controller
{
    public function index()
    {
        try {
            $perPage = 10;
            $niveis = Nivel::paginate($perPage);

            if ($niveis->isEmpty()) {
                return response()->json(['error' => 'Nenhum nível encontrado'], 404);
            }

            return response()->json([ 
                'data' => $niveis->items(),
                'meta' => [
                    'total' => $niveis->total(),
                    'per_page' => $niveis->perPage(),
                    'current_page' => $niveis->currentPage(),
                    'last_page' => $niveis->lastPage(),
                ]
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Erro ao buscar níveis'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'nivel' => 'required|string|max:255',
            ]);

            $nivel = Nivel::create($request->all());

            return response()->json($nivel, 201);
        } catch (ValidationException $e) {
            return response()->json(['error' => 'Erro de validação', 'messages' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['error' => 'Erro ao cadastrar nível'], 400);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $nivel = Nivel::findOrFail($id);

            $request->validate([
                'nivel' => 'required|string|max:255',
            ]);

            $nivel->update($request->all());

            return response()->json($nivel, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Nível não encontrado'], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'Erro ao atualizar nível'], 400);
        }
    }

    public function destroy($id)
    {
        try {
            $nivel = Nivel::findOrFail($id);
            $nivel->delete();

            return response()->noContent();
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Nível não encontrado'], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'Erro ao excluir nível'], 400);
        }
    }
}
