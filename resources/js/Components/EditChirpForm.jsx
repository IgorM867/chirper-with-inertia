import { useForm } from "@inertiajs/react";
import InputError from "./InputError";
import PrimaryButton from "./PrimaryButton";

function EditChirpForm({ chirpId, chirpMessage, onEditCancel }) {
    const { data, setData, patch, clearErrors, reset, errors } = useForm({
        message: chirpMessage,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route("chirps.update", chirpId), {
            onSuccess: () => onEditCancel(false),
            preserveScroll: true,
        });
    };

    return (
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
                        onEditCancel();
                        reset();
                        clearErrors();
                    }}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default EditChirpForm;
