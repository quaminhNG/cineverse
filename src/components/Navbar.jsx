import useScrollY from "../hooks/useScrollY";
import NavbarMenu from "./NavbarMenu";

const Navbar = ({ isOpen, setIsOpen }) => {
  const scrolled = useScrollY();
  return (
    <nav className={`fixed top-0 w-full z-50 flex items-center justify-between px-8 md:px-16 h-20 transition-all duration-300 ${scrolled || isOpen ? "bg-transparent" : "bg-black/60"}`}>
      {/* left*/}
      <div className="flex items-center gap-12">
        <div className="cursor-pointer">
          <h1 className={`text-2xl md:text-3xl font-extrabold tracking-widest text-transparent bg-clip-text bg-cineverse-gradient transition-all duration-300 ${scrolled ? "brightness-125 drop-shadow-[0_0_10px_rgba(143,239,255,0.5)]" : "hover:brightness-125 hover:drop-shadow-[0_0_10px_rgba(143,239,255,0.5)]"}`}>
            CINEVERSE
          </h1>
        </div>

        {/* center */}
        <NavbarMenu />
      </div>

      {/* right */}
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-6 text-white">
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors group">
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

          <button className="p-2 rounded-full hover:bg-white/10 transition-colors group">
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
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
          </button>

          <div className="flex items-center gap-3 cursor-pointer group pl-2 border-l border-white/20">
            <div className="text-right hidden lg:block">
              <p className="text-sm font-bold text-white group-hover:text-cineverse-cyan transition-colors">User Name</p>
              <p className="text-[10px] text-gray-400">Premium</p>
            </div>
            <div className="relative">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                alt="Avatar"
                className="w-9 h-9 rounded-full ring-2 ring-transparent group-hover:ring-cineverse-cyan transition-all"
              />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-black"></div>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 text-gray-400 group-hover:text-white transition-transform group-hover:rotate-180"
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
          <button onClick={() => setIsOpen(!isOpen)} className="p-1">
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-7 h-7 cursor-pointer text-white hover:text-cineverse-cyan transition duration-300"
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
                strokeWidth={2}
                stroke="currentColor"
                className="w-7 h-7 cursor-pointer text-white hover:text-cineverse-cyan transition duration-300"
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
