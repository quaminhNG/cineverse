import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Search = ({ isSearchOpen, setIsSearchOpen }) => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const inputRef = useRef(null);

    useEffect(() => {
        if (isSearchOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isSearchOpen]);

    const handleSearch = (e) => {
        if (e.key === 'Enter' && query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query)}`);
            setIsSearchOpen(false);
            setQuery("");
        }
    };

    return (
        <div className={`relative flex items-center border-b transition-all duration-300 ${isSearchOpen ? "border-cineverse-cyan w-64" : "border-transparent w-10"}`}>
            <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-white hover:text-cineverse-cyan transition-colors"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                </svg>
            </button>
            <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleSearch}
                className={`
                bg-transparent text-white placeholder-gray-400 outline-none
                transition-all duration-300 ease-in-out px-2 w-full
                ${isSearchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
              `}
                placeholder="Titles, people, genres..."
            />
        </div>
    );
};

export default Search;