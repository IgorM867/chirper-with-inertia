import {
    Description,
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import { router } from "@inertiajs/react";
import { useState } from "react";

function FollowButton({ isFollowed, username, userId }) {
    const [isHover, setIsHover] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    let content = isFollowed ? "Following" : "Follow";

    if (isHover && isFollowed) {
        content = "Unfollow";
    }

    const handleFollow = () => {
        const url = route("follows.follow", userId);
        router.post(
            url,
            {},
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    };
    const handleUnFollow = () => {
        setIsOpen(false);
        const url = route("follows.unfollow", userId);
        router.delete(url, {
            preserveScroll: true,
            preserveState: true,
        });
    };
    const handleClick = () => {
        if (isFollowed) {
            setIsOpen(true);
        } else {
            handleFollow();
        }
    };

    return (
        <>
            <button
                className={`bg-blue-400 p-2 rounded-3xl border text-base text-white ${
                    isFollowed
                        ? "w-28 hover:bg-red-500"
                        : "w-20 hover:brightness-105"
                }`}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                onClick={handleClick}
            >
                {content}
            </button>
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="relative z-50"
            >
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="max-w-72 space-y-4 rounded-lg bg-zinc-800 p-7 text-white">
                        <DialogTitle className="font-bold text-2xl">
                            Unfollow {username}?
                        </DialogTitle>
                        <Description>
                            Their chirps will no longer show up in your Chirp
                            timeline. You can still view their profile, unless
                            their chirps are protected.
                        </Description>
                        <div className="flex flex-col gap-4 px-3">
                            <button
                                className="bg-white text-black p-2 rounded-2xl hover:brightness-95"
                                onClick={handleUnFollow}
                            >
                                Unfollow
                            </button>
                            <button
                                className="border border-white p-2 rounded-2xl hover:bg-zinc-600"
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
}

export default FollowButton;
