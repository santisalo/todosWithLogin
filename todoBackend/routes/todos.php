<?php

use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;
use Tymon\JWTAuth\Http\Middleware\Authenticate;

Route::middleware([Authenticate::class])->group(function () {
    Route::prefix('todos')->group(function () {
        Route::get('/getAll', [TodoController::class, 'list']);
        Route::put('/update', [TodoController::class, 'update']);
        Route::delete('/delete', [TodoController::class, 'remove']);
        Route::post('/create', [TodoController::class, 'store']);
    });
});
