const Search = ({ isSearchOpen, setIsSearchOpen }) => {
    return (
        <div className="relative flex items-center group">
            <input
                type="text"
                className={`
                bg-transparent text-white placeholder-gray-400 outline-none
                transition-all duration-300 ease-in-out
              `}
                placeholder="Titles, people, genres..."
                style={{ opacity: isSearchOpen ? 1 : 0 }}
            />
            <span
                className={`
                 ${isSearchOpen ? "scale-x-100" : "scale-x-0"}
      pointer-events-none
      absolute left-0 bottom-0
      h-[2px] w-full
      bg-cineverse-gradient-2
      origin-right
      transition-all duration-300 ease-in-out
    `}
            />
            <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors group z-10"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 transition-transform group-hover:scale-110 group-hover:text-cineverse-cyan"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                </svg>
            </button>
        </div>
    );
};

export default Search;