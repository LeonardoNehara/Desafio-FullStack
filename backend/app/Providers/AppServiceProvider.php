<?php

namespace App\Providers;

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    { }

    public function boot()
    {
        if (app()->environment('local')) {
            Artisan::call('db:seed');
        }
    }
}
