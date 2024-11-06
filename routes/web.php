<?php

use App\Http\Controllers\ChirpController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\ProfileController;
use App\Models\Chirp;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::controller(ProfileController::class)->group(function () {
        Route::get('/profile',  'edit')->name('profile.edit');
        Route::get('/profile/{id}', 'show')->name('profile.show');
        Route::patch('/profile', 'update')->name('profile.update');
        Route::delete('/profile', 'destroy')->name('profile.destroy');
    });

    Route::post('/profile/{id}/follow', [FollowController::class, 'follow'])->name('follows.follow');
    Route::delete('/profile/{id}/unfollow', [FollowController::class, 'unfollow'])->name('follows.unfollow');
});

Route::resource("chirps", ChirpController::class)
    ->only('index', "store", "update", "destroy", "show")
    ->middleware('auth', 'verified');

Route::middleware("auth")->group(function () {
    Route::post('/chirps/{chirp}/like', [LikeController::class, 'store'])->name('chirps.like');
    Route::delete('/chirps/{chirp}/unlike', [LikeController::class, 'destroy'])->name('chirps.unlike');
    Route::post('/chirps/{chirp}/comment', [CommentController::class, 'store'])->name('chirps.comment');
});


Route::get('/following', function (Request $request) {
    return Inertia::render(
        'Following',
        [
            'chirps' =>  Chirp::with('user:id,name')
                ->join('follows', 'chirps.user_id', 'follows.following_id')
                ->where('follower_id', $request->user()->id)
                ->select("chirps.*")
                ->withCount('likes')
                ->withExists('likes as liked')
                ->latest()
                ->get()
        ]
    );
})->middleware(['auth', 'verified'])->name('following');

require __DIR__ . '/auth.php';
