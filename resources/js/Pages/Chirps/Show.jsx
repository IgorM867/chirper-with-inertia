import Chirp from "@/Components/Chirp";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

function Show({ chirp }) {
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
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-arrow-left"
                        >
                            <path d="m12 19-7-7 7-7" />
                            <path d="M19 12H5" />
                        </svg>
                    </button>
                    Chirp
                </header>
                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    <Chirp key={chirp.id} chirp={chirp} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Show;
