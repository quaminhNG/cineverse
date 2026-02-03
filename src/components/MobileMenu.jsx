const MobileMenu = ({ onClose }) => {
  return (
    <div className="flex flex-col h-full">

      <div className="px-6 py-6 mb-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              alt="Avatar"
              className="w-10 h-10 rounded"
            />
            <div className="flex flex-col">
              <span className="text-white font-semibold text-sm group-hover:text-red-600 transition">
                User Netflix
              </span>
              <span className="text-gray-400 text-xs">Switch Profiles</span>
            </div>
          </div>
          <button onClick={onClose} className="text-white hover:text-red-600 transition duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="px-6 space-y-6">
        <a
          className="block text-md font-medium text-white hover:text-red-600 transition transform hover:scale-105"
          href="#"
        >
          Home
        </a>
        <a
          className="block text-md font-medium text-white hover:text-red-600 transition transform hover:scale-105"
          href="#"
        >
          Movies
        </a>
        <a
          className="block text-md font-medium text-white hover:text-red-600 transition transform hover:scale-105"
          href="#"
        >
          Series
        </a>
        <a
          className="block text-md font-medium text-white hover:text-red-600 transition transform hover:scale-105"
          href="#"
        >
          Watch List
        </a>
      </div>
    </div>
  );
};

export default MobileMenu;
