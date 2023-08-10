<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TodoController extends Controller
{
    public function store(Request $request)
    {
        $input = $request->only('content');

        $validator = Validator::make($input, [
            'content' => 'required|string'
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors(), 'Validation Error', 422);
        }

        $user = Todo::create($input);

        $success['id'] = $user->id;

        return $this->sendResponse($success, 'todo created successfully', 201);
    }

    public function remove(Request $request)
    {
        $input = $request->only('id');

        $validator = Validator::make($input, [
            'id' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors(), 'Validation Error', 422);
        }

        $todo = Todo::find($input['id']);
        if (!$todo) {
            return $this->sendError("todo not found", 'Validation Error', 404);
        }

        Todo::destroy($input['id']);

        $success = null;

        return $this->sendResponse($success, 'todo deleted successfully', 201);
    }


    public function update(Request $request)
    {
        $input = $request->only('id', 'content');

        $validator = Validator::make($input, [
            'id' => 'required|integer',
            'content' => 'required|string'
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors(), 'Validation Error', 422);
        }

        $todo = Todo::find($input['id']);
        if (!$todo) {
            return $this->sendError("todo not found", 'Validation Error', 404);
        }

        $todo->content = $input['content'];
        $todo->save();

        $success['id'] = $todo->id;

        return $this->sendResponse($success, 'todo updated successfully', 202);
    }

    public function list()
    {
        $todos = Todo::all("id", "content");

        $success = $todos;

        return $this->sendResponse($success, 'todos listed successfully', 200);
    }
}
