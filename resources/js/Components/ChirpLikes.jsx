import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";

function ChirpLikes({ chirpId, initialLiked, initalLikeCount }) {
    const [liked, setLiked] = useState(initialLiked);
    const [likeCount, setLikeCount] = useState(initalLikeCount);

    useEffect(() => {
        if (liked !== initialLiked) {
            setLiked(initialLiked);
        }
        if (likeCount !== initalLikeCount) {
            setLikeCount(initalLikeCount);
        }
    }, [initialLiked, initalLikeCount]);

    const like = () => {
        setLiked(true);
        setLikeCount((prev) => prev + 1);
    };
    const unLike = () => {
        setLiked(false);
        setLikeCount((prev) => prev - 1);
    };

    const toggleLike = () => {
        if (liked) {
            const url = route("chirps.unlike", chirpId);
            router.delete(url, {
                onStart: () => unLike(),
                onCancel: () => like(),
                onError: () => like(),
                preserveScroll: true,
                preserveState: true,
            });
        } else {
            const url = route("chirps.like", chirpId);
            router.post(
                url,
                {},
                {
                    onStart: () => like(),
                    onCancel: () => unLike(),
                    onError: () => unLike(),
                    preserveScroll: true,
                    preserveState: true,
                }
            );
        }
    };
    return (
        <div className="p-2">
            <button onClick={toggleLike}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`inline-block cursor-pointer hover:fill-red-600 hover:stroke-red-600 ${
                        liked ? "fill-red-600 stroke-red-600" : ""
                    }`}
                >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>{" "}
                {likeCount}
            </button>
        </div>
    );
}

export default ChirpLikes;
