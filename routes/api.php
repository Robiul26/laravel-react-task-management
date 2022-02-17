<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
use App\Http\Controllers\API\ProjectController;
use App\Http\Controllers\API\TaskController;
use App\Http\Controllers\API\Auth\AuthAPIController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResources([
    'projects' => ProjectController::class,
    'tasks' => TaskController::class,
]);

Route::get('auth/create-token',[AuthAPIController::class,'createToken']);
Route::post('auth/login',[AuthAPIController::class,'login']);
Route::post('auth/register',[AuthAPIController::class,'register']);