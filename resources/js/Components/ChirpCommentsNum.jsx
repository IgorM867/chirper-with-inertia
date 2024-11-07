function ChirpCommentsNum({ commentsCount }) {
    return (
        <button className="flex items-center gap-1">
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
                className={`inline-block cursor-pointer hover:fill-blue-500 hover:stroke-blue-500`}
            >
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
            </svg>{" "}
            {commentsCount}
        </button>
    );
}

export default ChirpCommentsNum;
