import { Link, useLocation } from "react-router-dom";

const NavbarMenu = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] font-bold" : "text-gray-300";

    return (
        <div className="hidden nav-lg:flex justify-center gap-8">
            <Link
                to="/"
                className={`block text-lg transition-all duration-300 ease-out hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] ${isActive('/')}`}
            >
                Home
            </Link>
            <Link
                to="/tv-shows"
                className={`block text-lg transition-all duration-300 ease-out hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] ${isActive('/tv-shows')}`}
            >
                Tv Shows
            </Link>
            <Link
                to="/movies"
                className={`block text-lg transition-all duration-300 ease-out hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] ${isActive('/movies')}`}
            >
                Movies
            </Link>
            <Link
                to="/new-popular"
                className={`block text-lg transition-all duration-300 ease-out hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] ${isActive('/new-popular')}`}
            >
                New & Popular
            </Link>
            <Link
                to="/my-list"
                className={`block text-lg transition-all duration-300 ease-out hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] ${isActive('/my-list')}`}
            >
                My Lists
            </Link>
        </div>
    );
};

export default NavbarMenu;
