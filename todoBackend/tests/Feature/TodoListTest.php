<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;

use Tests\TestCase;

class TodoListTest extends TestCase
{
    use RefreshDatabase;

    public function test_todo_list_returns_status_ok(): void
    {
        $response = $this->get('/todos/getAll');
        $response->assertStatus(200);
    }

    public function test_todo_list_returns_empty_list_of_todos(): void
    {
        $response = $this->get('/todos/getAll');
        $expectedData = '{"data":[],"message":"todos listed successfully"}';
        $response->assertContent($expectedData);
    }

    public function test_todo_list_returns_list_of_todos(): void
    {
        $response = $this->post('/todos/create', [
            'content' => 'test content',
        ]);
        $response = $this->get('/todos/getAll');
        $expectedData = '{"data":[{"id":1,"content":"test content"}],"message":"todos listed successfully"}';
        $response->assertContent($expectedData);
    }
}
