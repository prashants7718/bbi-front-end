import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50 mb-4">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-20"
          />
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8">
          <Link
            to="/"
            className="text-[#004c80] hover:text-[#f88da7] font-semibold transition"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-[#004c80] hover:text-[#f88da7] font-semibold transition"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-[#004c80] hover:text-[#f88da7] font-semibold transition"
          >
            Contact
          </Link>
        </nav>

        {/* Buttons */}
        <div className="space-x-4">
          <Link to="/login">
            <button className="px-4 py-2 text-white bg-[#f88da7] hover:bg-[#ff647f] font-semibold rounded-lg transition">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="px-4 py-2 text-white bg-[#ffc3e1] hover:bg-[#ff94c2] font-semibold rounded-lg transition">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
