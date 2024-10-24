<?php

namespace App\Http\Controllers;

use App\Models\Chirp;
use Illuminate\Http\RedirectResponse;

class LikeController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Chirp $chirp)
    {
        $user = auth()->user();

        if (!$chirp->likes()->where('user_id', $user->id)->exists()) {
            $chirp->likes()->create([
                'user_id' => $user->id
            ]);
        }

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Chirp $chirp): RedirectResponse
    {
        $user = auth()->user();

        // Remove the like
        $chirp->likes()->where('user_id', $user->id)->delete();

        return back(); // Or send JSON response
    }
}
