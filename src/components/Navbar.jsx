import useScrollY from "../hooks/useScrollY";
const Navbar = ({ isOpen, setIsOpen }) => {
  const scrolled = useScrollY();
  return (
    <nav className={`fixed top-0 w-full z-50 flex items-center justify-between px-12 h-16 transition-all duration-300 ${scrolled || isOpen ? "bg-transparent" : "bg-black"}`}>
      {/* left*/}
      <div className="flex items-center gap-12">
        <div className="cursor-pointer">
          <img
            src="/src/assets/images/netflix_PNG25.png"
            className="w-28"
            alt="Logo"
          />
        </div>

        {/* center */}
        <div className="hidden md:flex justify-center gap-6 text-white">
          <a
            className="text-md font-medium transition transform duration-500 ease-out hover:text-red-600 hover:scale-110"
            href=""
          >
            Home
          </a>
          <a
            className="text-md font-medium transition transform duration-500 ease-out hover:text-red-600 hover:scale-110"
            href=""
          >
            Movies
          </a>
          <a
            className="text-md font-medium transition transform duration-500 ease-out hover:text-red-600 hover:scale-110"
            href=""
          >
            Series
          </a>
          <a
            className="text-md font-medium transition transform duration-500 ease-out hover:text-red-600 hover:scale-110"
            href=""
          >
            Watch List
          </a>
        </div>
      </div>

      {/* right */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-4 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer transition transform duration-500 ease-out hover:text-red-600 hover:scale-110"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer transition transform duration-500 ease-out hover:text-red-600 hover:scale-110"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
            />
          </svg>

          <div className="flex items-center gap-1 cursor-pointer group">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              alt="Avatar"
              className="w-8 h-8 rounded"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 ml-1 transition duration-400 group-hover:rotate-180 group-hover:text-red-600 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>
        {/* hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 cursor-pointer text-white hover:text-red-600 transition duration-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 cursor-pointer text-white hover:text-red-600 transition duration-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
