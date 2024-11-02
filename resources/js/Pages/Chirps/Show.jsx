import Chirp from "@/Components/Chirp";
import Comment from "@/Components/Comment";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";

function Show({ chirp }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        comment: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("chirps.comment", chirp.id), { onSuccess: () => reset() });
    };
    return (
        <AuthenticatedLayout>
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <header className="flex items-center text-2xl font-bold gap-4">
                    <button
                        className="hover:backdrop-brightness-90 rounded-full p-2"
                        onClick={() => window.history.back()}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m12 19-7-7 7-7" />
                            <path d="M19 12H5" />
                        </svg>
                    </button>
                    Chirp
                </header>
                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    <Chirp key={chirp.id} chirp={chirp} />
                    <form onSubmit={submit}>
                        <div className="flex items-center py-4 gap-5">
                            <textarea
                                value={data.comment}
                                placeholder="Post your reply?"
                                className="block flex-grow border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                onChange={(e) =>
                                    setData("comment", e.target.value)
                                }
                            ></textarea>
                            <PrimaryButton disabled={processing}>
                                Reply
                            </PrimaryButton>
                        </div>
                        <InputError message={errors.message} className="mt-2" />
                    </form>
                    {chirp.comments.map((comment) => (
                        <Comment key={comment.id} comment={comment} />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Show;
