import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-gray-400 py-10 px-8 md:px-16 mt-auto border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex gap-6 mb-6 text-white text-xl">
          <FaFacebookF className="cursor-pointer hover:text-gray-200" />
          <FaInstagram className="cursor-pointer hover:text-gray-200" />
          <FaTwitter className="cursor-pointer hover:text-gray-200" />
          <FaYoutube className="cursor-pointer hover:text-gray-200" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[13px] mb-6">
          <ul className="flex flex-col gap-3">
            <li className="hover:underline cursor-pointer">Audio Description</li>
            <li className="hover:underline cursor-pointer">Investor Relations</li>
            <li className="hover:underline cursor-pointer">Legal Notices</li>
          </ul>
          <ul className="flex flex-col gap-3">
            <li className="hover:underline cursor-pointer">Help Center</li>
            <li className="hover:underline cursor-pointer">Jobs</li>
            <li className="hover:underline cursor-pointer">Cookie Preferences</li>
          </ul>
          <ul className="flex flex-col gap-3">
            <li className="hover:underline cursor-pointer">Gift Cards</li>
            <li className="hover:underline cursor-pointer">Terms of Use</li>
            <li className="hover:underline cursor-pointer">Corporate Information</li>
          </ul>
          <ul className="flex flex-col gap-3">
            <li className="hover:underline cursor-pointer">Media Center</li>
            <li className="hover:underline cursor-pointer">Privacy</li>
            <li className="hover:underline cursor-pointer">Contact Us</li>
          </ul>
        </div>

        <div className="mb-6">
          <button className="border border-gray-400 text-gray-400 hover:text-white px-4 py-1 text-sm bg-transparent cursor-pointer">
            Service Code
          </button>
        </div>

        <div className="text-[11px]">
          &copy; 2024 Your Company Name, Inc.
        </div>
      </div>
    </footer>
  );
};

export default Footer;