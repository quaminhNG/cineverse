const NavbarMenu = () => {
    return (
        <div className="hidden nav-lg:flex justify-center gap-8 text-gray-300">
            <a
                className="block text-lg font-medium transition-all duration-300 ease-out hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                href="#"
            >
                Home
            </a>
            <a
                className="block text-lg font-medium transition-all duration-300 ease-out hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                href="#"
            >
                Tv Shows
            </a>
            <a
                className="block text-lg font-medium transition-all duration-300 ease-out hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                href="#"
            >
                Movies
            </a>
            <a
                className="block text-lg font-medium transition-all duration-300 ease-out hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                href="#"
            >
                New & Popular
            </a>
            <a
                className="block text-lg font-medium transition-all duration-300 ease-out hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                href="#"
            >
                My Lists
            </a>
        </div>
    );
};

export default NavbarMenu;
