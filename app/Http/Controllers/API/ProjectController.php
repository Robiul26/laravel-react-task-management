<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\repositories\ProjectRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{
    public $projectRepository;

    public function __construct(ProjectRepository $projectRepository) {
        $this->projectRepository = $projectRepository;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $projects = $this->projectRepository->getAll();
        return response()->json([
            'success' => true,
            'message' => 'Project List',
            'data' => $projects
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
            'name' => 'required|unique:projects|max:255',
            'description' => 'required',
        ],[
            'name.required' => 'Please give project name',
            'description.required' => 'Please give project description',
        ]);

        
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => $validator->getMessageBag()->first(),
                    'errors' => $validator->getMessageBag(),
                ]);
            }

        $project = $this->projectRepository->create($request);
        return response()->json([
            'success' => true,
            'message' => 'Project stored',
            'data' => $project
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
        $project = $this->projectRepository->findById($id);
        
        if(is_null($project)){
            return response()->json([
                'success' => false,
                'message' => 'Project Details',
                'data' => $project
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Project Details',
            'data' => $project
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
        $project = $this->projectRepository->findById($id);
        if(is_null($project)){
            return response()->json([
                'success' => false,
                'message' => 'Project not found',
                'data' => null
            ]);
        }
        
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'description' => 'required',
        ],[
            'name.required' => 'Please give project name',
            'description.required' => 'Please give project description',
        ]);

        
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => $validator->getMessageBag()->first(),
                    'errors' => $validator->getMessageBag(),
                ]);
            }

        $project = $this->projectRepository->edit($request, $id);
        return response()->json([
            'success' => true,
            'message' => 'Project Updated',
            'data' => $project
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
        $project = $this->projectRepository->findById($id);
        if(is_null($project)){
            return response()->json([
                'success' => false,
                'message' => 'Project not found',
                'data' => null
            ]);
        }

        $project = $this->projectRepository->delete($id);
        return response()->json([
            'success' => true,
            'message' => 'Project is deleted',
            'data' => $project
        ]);
    }
}
