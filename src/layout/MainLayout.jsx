import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState } from "react";
import MobileMenu from "../components/MobileMenu";
import HeroBanner from "../components/HeroBanner";
const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-netflix-dark min-h-screen flex flex-col">
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <HeroBanner />
      <div className={`fixed top-0 right-0 h-screen w-[50%] bg-black text-white z-[60] transition transform duration-300 md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}>
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
