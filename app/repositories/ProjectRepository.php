<?php
namespace App\repositories;

use App\interfaces\CrudInterface;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectRepository implements CrudInterface{

    public function getAll(){
        $projects = Project::orderBy('id','desc')->withCount('tasks')->get();
        return $projects;
    }

    public function findById($id){
        $project = Project::with('tasks')->find($id);
        return $project;
    }

    public function create(Request $request){

        $project = new Project();
        $project->name = $request->name;
        $project->description = $request->description;
        $project->user_id = $request->user_id;
        $project->save();
        return $project;
    }

    public function edit(Request $request, $id){
        $project = Project::find($id);
        $project->name = $request->name;
        $project->description = $request->description;
        $project->status = $request->status;
        $project->user_id = $request->user_id;
        $project->save();
        return $project;
    }
    
    public function delete($id){
        $project = Project::find($id);
        $project->tasks()->delete();
        $project->delete();
        return $project;
    }

}