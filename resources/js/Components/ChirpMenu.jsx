import Dropdown from "./Dropdown";

function ChirpMenu({ chirpId, onEditClick }) {
    return (
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
                    onClick={onEditClick}
                >
                    Edit
                </button>
                <Dropdown.Link
                    as="button"
                    href={route("chirps.destroy", chirpId)}
                    method="delete"
                >
                    Delete
                </Dropdown.Link>
            </Dropdown.Content>
        </Dropdown>
    );
}

export default ChirpMenu;
