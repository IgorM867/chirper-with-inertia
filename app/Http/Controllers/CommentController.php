<?php

namespace App\Http\Controllers;

use App\Models\Chirp;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request, Chirp $chirp): RedirectResponse
    {
        $validated = $request->validate([
            'comment' => 'required|string|max:255'
        ]);
        $chirp->comments()->create(
            [
                "comment" => $validated['comment'],
                "user_id" => $request->user()->id
            ]
        );

        return back();
    }
}
