import Chirp from "@/Components/Chirp";
import FollowButton from "@/Components/FollowButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Show({ auth, chirps, user, followed }) {
    return (
        <AuthenticatedLayout
            header={
                <header>
                    <div className="flex items-center gap-5 pb-3">
                        <h2 className="inline-block text-3xl font-semibold leading-tight text-gray-800">
                            {user.name}{" "}
                        </h2>
                        {auth.user.id !== user.id && (
                            <FollowButton
                                isFollowed={followed}
                                username={user.name}
                                userId={user.id}
                            />
                        )}
                    </div>
                    <div className="flex gap-5">
                        <p>
                            <span className="font-bold">
                                {user.followings_count}
                            </span>{" "}
                            Following
                        </p>
                        <p>
                            <span className="font-bold">
                                {user.followers_count}
                            </span>{" "}
                            Followers
                        </p>
                    </div>
                </header>
            }
        >
            <Head title="Chirps" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {chirps.map((chirp) => (
                        <Chirp key={chirp.id} chirp={chirp} />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
