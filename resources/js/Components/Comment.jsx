import { Link } from "@inertiajs/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function Comment({ comment }) {
    return (
        <div className="p-6 flex space-x-2">
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <div>
                        <Link
                            href={route("profile.show", comment.user.id)}
                            className="hover:underline"
                            as="button"
                        >
                            <span className="text-gray-800">
                                {comment.user.name}
                            </span>
                        </Link>
                        <small className="ml-2 text-sm text-gray-600">
                            {dayjs(comment.created_at).fromNow()}
                        </small>
                        {comment.created_at !== comment.updated_at && (
                            <small className="text-sm text-gray-600">
                                &middot; edited
                            </small>
                        )}
                    </div>
                </div>
                <p className="mt-4 text-lg text-gray-900">{comment.comment}</p>
            </div>
        </div>
    );
}

export default Comment;
