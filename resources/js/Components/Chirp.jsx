import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import EditChirpForm from "./EditChirpForm";
import ChirpMenu from "./ChirpMenu";
import ChirpLikes from "./ChirpLikes";
import MessageIcon from "./MessageIcon";

dayjs.extend(relativeTime);

export default function Chirp({ chirp }) {
    const { auth } = usePage().props;
    const [editing, setEditing] = useState(false);

    return (
        <div className="p-6 flex space-x-2">
            <MessageIcon />
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
                        <ChirpMenu
                            chirpId={chirp.id}
                            onEditClick={() => setEditing(true)}
                        />
                    )}
                </div>
                {editing ? (
                    <EditChirpForm
                        chirpId={chirp.id}
                        chirpMessage={chirp.message}
                        onEditCancel={() => setEditing(false)}
                    />
                ) : (
                    <>
                        <p className="mt-4 text-lg text-gray-900">
                            {chirp.message}
                        </p>
                        <ChirpLikes
                            chirpId={chirp.id}
                            initialLiked={chirp.liked}
                            initalLikeCount={chirp.like_count}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
