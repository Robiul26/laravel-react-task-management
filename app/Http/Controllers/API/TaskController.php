<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\repositories\TaskRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    public $taskRepository;

    public function __construct(TaskRepository $taskRepository) {
        $this->taskRepository = $taskRepository;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tasks = $this->taskRepository->getAll();
        return response()->json([
            'success' => true,
            'message' => 'Task List',
            'data' => $tasks
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'description' => 'required',
        ],[
            'name.required' => 'Please give Task name',
            'description.required' => 'Please give Task description',
        ]);

        
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => $validator->getMessageBag()->first(),
                    'errors' => $validator->getMessageBag(),
                ]);
            }

        $task = $this->taskRepository->create($request);
        return response()->json([
            'success' => true,
            'message' => 'Task stored',
            'data' => $task
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $task = $this->taskRepository->findById($id);
        
        if(is_null($task)){
            return response()->json([
                'success' => false,
                'message' => 'Task Details',
                'data' => $task
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Task Details',
            'data' => $task
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $task = $this->taskRepository->findById($id);
        if(is_null($task)){
            return response()->json([
                'success' => false,
                'message' => 'Task not found',
                'data' => null
            ]);
        }
        
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'description' => 'required',
        ],[
            'name.required' => 'Please give Task name',
            'description.required' => 'Please give Task description',
        ]);

        
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => $validator->getMessageBag()->first(),
                    'errors' => $validator->getMessageBag(),
                ]);
            }

        $task = $this->taskRepository->edit($request, $id);
        return response()->json([
            'success' => true,
            'message' => 'Task Updated',
            'data' => $task
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    
    public function destroy($id)
    {
        $task = $this->taskRepository->findById($id);
        if(is_null($task)){
            return response()->json([
                'success' => false,
                'message' => 'Task not found',
                'data' => null
            ]);
        }

        $task = $this->taskRepository->delete($id);
        return response()->json([
            'success' => true,
            'message' => 'Task is deleted',
            'data' => $task
        ]);
    }
}
