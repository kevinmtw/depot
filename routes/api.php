<?php

use App\Http\Controllers\Orders\OrdersController;
use App\Http\Controllers\Services\ServicesController;
use App\Http\Controllers\Gallery\GalleryController;
use App\Http\Controllers\Testimonials\TestimonialsController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

Route::middleware('auth')->group(function () {
    Route::post('/api/logout', [AuthenticatedSessionController::class, 'destroy'])->name('post.logout');

    Route::get('/api/orders', [OrdersController::class, 'index'])->name('get.order');
    Route::get('/api/orders/count', [OrdersController::class, 'count'])->name('get.order.count');
    Route::patch('/api/orders/{id}', [OrdersController::class, 'update'])->name('update.order');
    Route::delete('/api/orders/{id}', [OrdersController::class, 'destroy'])->name('delete.order');

    Route::get('/api/services/count', [ServicesController::class, 'count'])->name('get.service.count');
    Route::post('/api/services', [ServicesController::class, 'store'])->name('post.service');
    Route::patch('/api/services/{id}', [ServicesController::class, 'update'])->name('update.service');
    Route::delete('/api/services/{id}', [ServicesController::class, 'destroy'])->name('delete.service');

    Route::post('/api/gallery', [GalleryController::class, 'store'])->name('post.gallery');
    Route::patch('/api/gallery/{id}', [GalleryController::class, 'update'])->name('update.gallery');
    Route::delete('/api/gallery/{id}', [GalleryController::class, 'destroy'])->name('delete.gallery');

    Route::get('/api/testimonials/count', [TestimonialsController::class, 'count'])->name('get.testimonials.count');
    Route::patch('/api/testimonials/{id}', [TestimonialsController::class, 'update'])->name('update.testimonials');
    Route::delete('/api/testimonials/{id}', [TestimonialsController::class, 'destroy'])->name('delete.testimonials');
});

Route::middleware('guest')->group(function () {
    Route::post('/api/login', [AuthenticatedSessionController::class, 'store'])->name('post.login');
});

Route::post('/api/testimonials', [TestimonialsController::class, 'store'])->name('post.testimonials');
Route::post('/api/orders', [OrdersController::class, 'store'])->name('post.order');
Route::get('/api/services', [ServicesController::class, 'index'])->name('get.service');
Route::get('/api/gallery', [GalleryController::class, 'index'])->name('get.gallery');
Route::get('/api/testimonials', [TestimonialsController::class, 'index'])->name('get.testimonials');