<?php
namespace App\interfaces;

use Illuminate\Http\Request;

interface AuthInterface {
    public function checkIfAuthenticated(Request $request);
    public function registerUser(Request $request);
    public function findUserByEmail(Request $request);
}