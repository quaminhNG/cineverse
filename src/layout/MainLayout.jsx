import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import { useState } from "react";
import MobileMenu from "../components/layout/MobileMenu";
import HeroBanner from "../components/movie/HeroBanner";
const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-cineverse-dark min-h-screen flex flex-col">
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <HeroBanner />
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[55] nav-lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={`fixed top-0 right-0 h-screen w-[70%] sm:w-[50%] md:w-[40%] bg-black/95 backdrop-blur-xl border-l border-white/10 text-white z-[60] transition-transform duration-300 ease-out nav-lg:hidden ${isOpen ? "translate-x-0" : "translate-x-full"} shadow-2xl`}>
        <MobileMenu onClose={() => setIsOpen(false)} />
      </div>
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default MainLayout;
