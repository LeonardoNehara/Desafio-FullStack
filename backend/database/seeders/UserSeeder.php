<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        // if (User::where('email', 'usuario@email.com')->doesntExist()) {
        //     User::create([
        //         'name' => 'Adm',
        //         'email' => 'adm@email.com',
        //         'password' => Hash::make('senha123'),
        //     ]);
        // }
    }
}

