import React, { useState, useContext } from "react";
import { AiOutlineMenu, AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { FaUserFriends, FaWallet } from "react-icons/fa";
import { MdHelp } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SiIfood } from "react-icons/si";
import { FaUser } from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";
import { FaSignOutAlt } from "react-icons/fa";
import { CartContext } from "../Menu/CartProvider";


export const Navbar = () => {
  const [nav, setNav] = useState(false);
  const location = useLocation();
  const Loggedin = location.state?.isLoggedin || false;
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className="max-w-[1640px] mx-auto flex justify-between items-center p-4">
      {/* Left side */}
      <div className="flex items-center">
        <div onClick={() => setNav(!nav)} className="cursor-pointer">
          <AiOutlineMenu size={30} />
        </div>
        <SiIfood size={30} className="ml-10" />
        <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2">
          Best <span className="font-bold">Eats</span>
        </h1>
      </div>

      {/* Search Input */}
      <div className="bg-gray-200 rounded-full flex items-center px-2 w-[100px] sm:w-[300px] lg:w-[300px]">
        <AiOutlineSearch size={25} />
        <input
          className="bg-transparent p-2 w-full focus:outline-none"
          type="text"
          placeholder="Search foods"
        />
      </div>
      {Loggedin ? (
        <div className="flex ">
          <Link to="/offer">
            <button className="bg-black text-white hidden md:flex items-center py-2 rounded-full hover:scale-110  duration-300">
              <BiSolidOffer size={20} className="mr-2" />
              New Offer
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex ">
          <Link to="/login">
            <button className="bg-black text-white hidden md:flex items-center py-2 rounded-full hover:scale-110  duration-300">
              <FaUser size={20} className="mr-2" />
              Sign In
            </button>
          </Link>
        </div>
      )}

      {/* Cart button */}
      
        <button className="bg-black text-white hidden md:flex items-center py-2 rounded-full hover:scale-110  duration-300"
          onClick={()=>navigate("/cart",{ state: { isLoggedin: true } })}>
          <BsFillCartFill size={20} className="mr-2" /> Cart ({cart.length})
        </button>
      

      {/* Mobile Menu */}
      {nav ? (
        <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>
      ) : (
        ""
      )}

      {/* Side drawer menu */}
      <div
        className={
          nav
            ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300"
            : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
        }
      >
        <AiOutlineClose
          onClick={() => setNav(!nav)}
          size={30}
          className="absolute right-4 top-4 cursor-pointer"
        />
        <h2 className="text-2xl p-4">
          Best <span className="font-bold">Eats</span>
        </h2>
        <nav>
          <ul className="flex flex-col p-4 text-gray-800">
            <Link to="/my-orders">
              <li className="text-xl py-4 flex cursor-pointer">
                <TbTruckDelivery size={25} className="mr-4" /> Orders
              </li>
            </Link>
            <li className="text-xl py-4 flex cursor-pointer">
              <FaWallet size={25} className="mr-4" /> Wallet
            </li>
            <Link to="/help">
              <li className="text-xl py-4 flex cursor-pointer">
                <MdHelp size={25} className="mr-4" /> Help
              </li>
            </Link>
            <Link to="/signout">
              <li className="text-xl py-4 flex cursor-pointer">
                <FaSignOutAlt size={25} className="mr-4" /> Signout
              </li>
            </Link>
            <Link to="/invite">
              <li className="text-xl py-4 flex cursor-pointer">
                <FaUserFriends size={25} className="mr-4" /> Invite Friends
              </li>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
