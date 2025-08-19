import React from "react";
import logo from "../asstes/logo.png";
import flag from "../asstes/flag.png";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white flex items-center justify-between px-4 py-2 md:px-4 shadow-lg">
      <div className="flex items-center">
        <Link href="/">
          <Image src={logo} alt="Logo" className="h-12 w-16 object-contain" />
        </Link>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Image src={flag} alt="Flag" className="h-8 w-8 object-contain" />
          <span className="text-sm md:text-base font-medium uppercase tracking-wide">
            English
          </span>
        </div>

        <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out">
          Sign In
        </button>
      </div>
    </header>
  );
};

export default Header;
