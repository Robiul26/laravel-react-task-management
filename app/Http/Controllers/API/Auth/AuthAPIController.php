<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\repositories\AuthRepository;
use GrahamCampbell\ResultType\Success;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthAPIController extends Controller
{
    public $authRepository;

    public function __construct(AuthRepository $authRepository) {
        $this->authRepository = $authRepository;
    }
    
    public function createToken()
    {
        $user = User::first();
        $token = $user->createToken('Token Name')->accessToken;
        return $token;
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ],[
            'email.required' => 'Enter your Email',
            'password.required' => 'Enter your Password',
        ]);
 
        if ($validator->fails()) {
            return response()->json([
                'success'=> false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag()

            ]);
        }

        if($this->authRepository->checkIfAuthenticated($request)){
            $user = $this->authRepository->findUserByEmail($request->email);
            $accessToken = $user->createToken('authToken')->accessToken;
            return response()->json([
                'success' =>true,
                'message'=>'Logged in successfully',
                'user'=>$user,
                'access_token'=>$accessToken
            ]);
        }else{
            return response()->json([
                'success'=>false,
                'message'=>'Sorry Invalid Email and Password',
                'errors'=> null
            ]);
        }



    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:4',
            'email' => 'required|unique:users|email|string',
            'password' => 'required|confirmed|min:6',
        ],[
            'name.required' => 'Enter your Name',
            'email.required' => 'Enter your Email',
            'email.unique' => 'Your Email is already used, Please login or use another email!',
            'password.required' => 'Enter your Password',
        ]);
 
        if ($validator->fails()) {
            return response()->json([
                'success'=> false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag()

            ]);
        }

        $user = $this->authRepository->registerUser($request);
        if(!is_null($user)){
            $user = $this->authRepository->findUserByEmail($request->email);
            $accessToken = $user->createToken('accessToken')->accessToken;
            return response()->json([
                'success'=>true,
                'message'=>'Register successfully',
                'user'=>$user,
                'access_token'=>$accessToken
            ]);
        }else{
            return response()->json([
                'success'=>false,
                'message'=>'Registration cannot successfull ',
                'errors'=>null
            ]);
        }
    }
}
