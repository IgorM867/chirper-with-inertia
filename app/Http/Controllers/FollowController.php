<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FollowController extends Controller
{
    public function follow(Request $request, string $followingId)
    {
        $user = auth()->user();

        if (!$user->followings()->where('following_id', $followingId)->exists()) {
            $user->followings()->attach($followingId);
        }

        return back();
    }
    public function unfollow(Request $request, string $followingId)
    {
        $user = auth()->user();

        if ($user->followings()->where('following_id', $followingId)->exists()) {
            $user->followings()->detach($followingId);
        }

        return back();
    }
}
