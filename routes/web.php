<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard/dashboard');
    })->name('dashboard');
    
    Route::get('dashboard/orders', function () {
        return Inertia::render('dashboard/orders');
    })->name('dashboard.orders');
    
    Route::get('dashboard/services', function () {
        return Inertia::render('dashboard/services');
    })->name('dashboard.services');

    Route::get('dashboard/gallery', function () {
        return Inertia::render('dashboard/gallery');
    })->name('dashboard.gallery');

    Route::get('/dashboard/testimonials', function () {
        return Inertia::render('dashboard/testimonials');
    })->name('dashboard.testimonials');
});

Route::middleware('guest')->group(function () {
    Route::get('login', function () {
        return Inertia::render('login');
    })->name('login');
    
    Route::get('/', function () {
        return Inertia::render('home');
    })->name('home');
    
    Route::get('/about-us', function () {
        return Inertia::render('about-us');
    })->name('aboutus');
    
    Route::get('/services', function () {
        return Inertia::render('services');
    })->name('services');
    
    Route::get('/orders', function () {
        return Inertia::render('orders');
    })->name('orders');
    
    Route::get('/gallery', function () {
        return Inertia::render('gallery');
    })->name('gallery');

    Route::get('/testimonials', function () {
        return Inertia::render('testimonials');
    })->name('testimonials');

    Route::get('/contact', function () {
        return Inertia::render('contact');
    })->name('contact');
});

require __DIR__.'/api.php';