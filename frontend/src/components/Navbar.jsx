import { Link, useLocation } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import avatarImg from "../assets/male_avatar.png";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Cart", href: "/cart" },
  { name: "Checkout", href: "/checkout" },
];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const { currentUser, logout } = useAuth();

  const location = useLocation();

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
  };
  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6">
      <nav className="flex justify-between items-center
      bg-primary shadow-md rounded-md p-4">
        {/*Left side of the navbar*/}
        <div className="flex grow">
          <Link to="/">
            <IoMdHome className="size-9" />
          </Link>
        </div>

        {/* Title in the middle */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-5xl font-bold text-secondary
          tracking-wide">
            Book Store
          </h1>
        </div>

        {/*Right side of the navbar*/}
        <div className="relative flex items-center md:space-x-3 space-x-2">
          <div>
            {currentUser ? (
              <>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <img
                    src={avatarImg}
                    alt="User avatar"
                    className={`size-8 rounded-full ${
                      currentUser ? "ring-2 ring-blue-500" : ""
                    }`}
                  />
                </button>
                {/*Show dropdown*/}
                {isDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white
                      shadow-lg rounded-md z-40"
                  >
                    <ul className="py-2">
                      {navigation.map((item) => (
                        <li
                          key={item.name}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Link
                            to={item.href}
                            className="block
                                px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left
                                px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <FaUserAlt className="size-6" />
              </Link>
            )}
          </div>

          <Link
            to="/cart"
            className="bg-primary p-1 sm:px-6 px-2 flex items-center
            rounded-sm"
          >
            <FaCartShopping className="size-6" />
            {cartItems.length > 0 ? (
              <span
                className="text-sm font-semibold 
                sm:ml-1"
              >
                {cartItems.length}
              </span>
            ) : (
              <span
                className="text-sm 
                font-semibold sm:ml-1"
              >
                0
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
