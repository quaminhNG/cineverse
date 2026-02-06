import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useScrollY from "../../hooks/useScrollY";
import NavbarMenu from "./NavbarMenu";
import Search from "../common/Search";
import Notify from "../common/Notify";
import { mockAuth } from "../../services/mockAuth";

const Navbar = ({ isOpen, setIsOpen }) => {
  const scrolled = useScrollY();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentUser = mockAuth.getCurrentUser();
    setUser(currentUser);
  }, [location]);

  const handleLogout = () => {
    mockAuth.logout();
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className={`fixed top-0 w-full z-50 flex items-center justify-between px-8 md:px-16 h-20 transition-all duration-300 ${scrolled || isOpen ? "bg-transparent" : "bg-black/60"}`}>
      {/* left*/}
      <div className="flex items-center gap-12">
        <div className="cursor-pointer">
          <Link to="/">
            <h1 className={`text-2xl md:text-3xl font-extrabold tracking-widest text-transparent bg-clip-text bg-cineverse-gradient transition-all duration-300 ${scrolled ? "brightness-125 drop-shadow-[0_0_10px_rgba(143,239,255,0.5)]" : "hover:brightness-125 hover:drop-shadow-[0_0_10px_rgba(143,239,255,0.5)]"}`}>
              CINEVERSE
            </h1>
          </Link>
        </div>

        {/* center */}
        <NavbarMenu />
      </div>

      {/* right */}
      <div className="flex items-center gap-6">
        <div className="hidden nav-lg:flex items-center gap-6 text-white">
          <Search isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />

          <button onClick={() => setIsNotifyOpen(!isNotifyOpen)}
            className="p-2 rounded-full hover:bg-white/10 transition-colors group">
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
          {isNotifyOpen && <Notify isNotifyOpen={isNotifyOpen} setIsNotifyOpen={setIsNotifyOpen} />}

          {user ? (
            <div className="flex items-center gap-3 cursor-pointer group pl-2 border-l border-white/20 relative">
              <Link to="/profile" className="text-right hidden lg:block">
                <p className="text-sm font-bold text-white group-hover:text-cineverse-cyan transition-colors max-w-[100px] truncate">{user.name}</p>
                <p className="text-[10px] text-gray-400">Premium</p>
              </Link>
              <div className="relative group/avatar">
                <Link to="/profile">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                    alt="Avatar"
                    className="w-9 h-9 rounded-full ring-2 ring-transparent group-hover:ring-cineverse-cyan transition-all"
                  />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-black"></div>
                </Link>

                <div className="absolute right-0 top-full pt-4 opacity-0 invisible group-hover/avatar:opacity-100 group-hover/avatar:visible transition-all duration-300 transform translate-y-2 group-hover/avatar:translate-y-0">
                  <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl p-2 w-40 shadow-2xl">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                      </svg>
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-cineverse-cyan text-black px-6 py-2 rounded-full font-bold hover:bg-cyan-400 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.5)] hover:shadow-[0_0_25px_rgba(6,182,212,0.7)] hover:scale-105 active:scale-95 text-sm uppercase tracking-wide"
            >
              Log In
            </Link>
          )}
        </div>
        {/* hamburger */}
        <div className="nav-lg:hidden flex items-center">
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
