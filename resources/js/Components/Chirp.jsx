import React, { useEffect, useState } from "react";
import Dropdown from "@/Components/Dropdown";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link, useForm, usePage, router } from "@inertiajs/react";

dayjs.extend(relativeTime);

export default function Chirp({ chirp }) {
    const { auth } = usePage().props;
    const [editing, setEditing] = useState(false);
    const [liked, setLiked] = useState(chirp.liked);
    const [likeCount, setLikeCount] = useState(chirp.like_count);

    const { data, setData, patch, clearErrors, reset, errors } = useForm({
        message: chirp.message,
    });

    useEffect(() => {
        if (liked !== chirp.liked) {
            setLiked(chirp.liked);
        }
        if (likeCount !== chirp.like_count) {
            setLikeCount(chirp.like_count);
        }
    }, [chirp]);

    const submit = (e) => {
        e.preventDefault();
        patch(route("chirps.update", chirp.id), {
            onSuccess: () => setEditing(false),
        });
    };

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
            const url = route("chirps.unlike", chirp.id);
            console.log("delete");
            router.delete(url, {
                onStart: () => unLike(),
                onCancel: () => like(),
                onError: () => like(),
                preserveScroll: true,
                preserveState: true,
            });
        } else {
            const url = route("chirps.like", chirp.id);
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
        <div className="p-6 flex space-x-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600 -scale-x-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
            </svg>
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <div>
                        <Link
                            href={route("profile.show", chirp.user.id)}
                            className="hover:underline"
                        >
                            <span className="text-gray-800">
                                {chirp.user.name}
                            </span>
                        </Link>
                        <small className="ml-2 text-sm text-gray-600">
                            {dayjs(chirp.created_at).fromNow()}
                        </small>
                        {chirp.created_at !== chirp.updated_at && (
                            <small className="text-sm text-gray-600">
                                &middot; edited
                            </small>
                        )}
                    </div>
                    {chirp.user.id === auth.user.id && (
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-gray-400"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <button
                                    className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out"
                                    onClick={() => setEditing(true)}
                                >
                                    Edit
                                </button>
                                <Dropdown.Link
                                    as="button"
                                    href={route("chirps.destroy", chirp.id)}
                                    method="delete"
                                >
                                    Delete
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    )}
                </div>
                {editing ? (
                    <form onSubmit={submit}>
                        <textarea
                            value={data.message}
                            onChange={(e) => setData("message", e.target.value)}
                            className="mt-4 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        ></textarea>
                        <InputError message={errors.message} className="mt-2" />
                        <div className="space-x-2">
                            <PrimaryButton className="mt-4">Save</PrimaryButton>
                            <button
                                className="mt-4"
                                onClick={() => {
                                    setEditing(false);
                                    reset();
                                    clearErrors();
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <>
                        <p className="mt-4 text-lg text-gray-900">
                            {chirp.message}
                        </p>
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
                                        liked
                                            ? "fill-red-600 stroke-red-600"
                                            : ""
                                    }`}
                                >
                                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                </svg>{" "}
                                {likeCount}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
