import Chirp from "@/Components/Chirp";
import FollowButton from "@/Components/FollowButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Show({ auth, chirps, user, followed }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-3xl font-semibold leading-tight text-gray-800 flex items-center gap-4">
                    {user.name}{" "}
                    {auth.user.id !== user.id && (
                        <FollowButton
                            isFollowed={followed}
                            username={user.name}
                            userId={user.id}
                        />
                    )}
                </h2>
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
