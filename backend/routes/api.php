<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DesenvolvedorController;
use App\Http\Controllers\NivelController;
use App\Http\Controllers\UserController;

Route::post('/login', [AuthController::class, 'login']);

Route::get('niveis', [NivelController::class, 'index']);
Route::post('niveis', [NivelController::class, 'store']);
Route::put('niveis/{id}', [NivelController::class, 'update']);
Route::patch('niveis/{id}', [NivelController::class, 'update']);
Route::delete('niveis/{id}', [NivelController::class, 'destroy']);

Route::get('desenvolvedores', [DesenvolvedorController::class, 'index']);
Route::get('desenvolvedores/{id}', [DesenvolvedorController::class, 'show']);
Route::post('desenvolvedores', [DesenvolvedorController::class, 'store']);
Route::put('desenvolvedores/{id}', [DesenvolvedorController::class, 'update']);
Route::patch('desenvolvedores/{id}', [DesenvolvedorController::class, 'update']);
Route::delete('desenvolvedores/{id}', [DesenvolvedorController::class, 'destroy']);

Route::get('users', [UserController::class, 'index']);
Route::post('users', [UserController::class, 'store']);
Route::get('users/{id}', [UserController::class, 'show']);
Route::put('users/{id}', [UserController::class, 'update']);
Route::delete('users/{id}', [UserController::class, 'destroy']);

Route::get('/desenvolvedores-por-nivel', [DesenvolvedorController::class, 'getDesenvolvedoresPorNivel']);

Route::post('/logout', [AuthController::class, 'logout']);

Route::middleware('auth:sanctum')->group(function () {
    
});
