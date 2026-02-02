import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { setUser } from "../../reduxStore/authSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    dispatch(setUser(null));
    navigate("/login");
    toast.success("Logged out successfully");
  };

  return (
    <nav className="fixed w-full  z-50 backdrop-blur-md bg-white/30 shadow-lg">
      <div className="container mx-auto flex items-center justify-between h-16 px-6 md:px-12">
        
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="w-24 h-24 object-contain" />
          <span className="text-xl md:text-2xl font-bold text-blue-900 tracking-wider">
            {/* HealthCare */}
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/doctors"
            className="hover:text-blue-700 transition-colors duration-300 font-medium"
          >
            Doctors
          </Link>
          <Link
            to="/about"
            className="hover:text-blue-700 transition-colors duration-300 font-medium"
          >
            About Us
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <User
                onClick={() => navigate("/profile")}
                className="h-6 w-6 cursor-pointer text-blue-900 hover:text-blue-700 transition-colors duration-300"
              />
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300"
              >
                <FaSignOutAlt className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 font-semibold"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X className="h-6 w-6 text-blue-900" /> : <Menu className="h-6 w-6 text-blue-900" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-md shadow-lg py-4 px-6 flex flex-col space-y-3 animate-fadeIn">
          <Link
            to="/doctors"
            onClick={() => setIsOpen(false)}
            className="py-2 rounded-lg hover:bg-blue-50 text-center font-medium transition-colors duration-300"
          >
            Doctors
          </Link>
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="py-2 rounded-lg hover:bg-blue-50 text-center font-medium transition-colors duration-300"
          >
            About Us
          </Link>

          {user ? (
            <>
              <button
                onClick={() => { navigate("/profile"); setIsOpen(false); }}
                className="flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-blue-50 transition-colors duration-300 font-medium"
              >
                <User className="w-5 h-5" /> Profile
              </button>
              <button
                onClick={() => { handleLogout(); setIsOpen(false); }}
                className="flex items-center justify-center gap-2 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-all duration-300 font-medium"
              >
                <FaSignOutAlt className="w-4 h-4" /> Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => { navigate("/login"); setIsOpen(false); }}
              className="w-full py-2 rounded-full bg-blue-700 hover:bg-blue-800 text-white shadow-lg transition-all duration-300 font-semibold"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
