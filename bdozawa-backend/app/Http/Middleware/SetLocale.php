<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->hasHeader('Accept-Language')) {
            $lang = $request->header('Accept-Language');
            if (in_array($lang, ['en', 'ar', 'ku'])) {
                App::setLocale($lang);
            }
        }

        return $next($request);
    }
}