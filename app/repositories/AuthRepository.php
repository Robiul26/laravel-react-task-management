<?php
namespace App\repositories;

use App\interfaces\AuthInterface;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthRepository implements AuthInterface{

    public function checkIfAuthenticated(Request $request){
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            return true;
        }else{
            return false;
        }
    }
    public function registerUser(Request $request){
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();
        return $user;

    }
    public function findUserByEmail($email){
        $user = User::where('email', $email)->first();
        return $user;
    }

}