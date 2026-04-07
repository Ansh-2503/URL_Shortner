import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-black text-white">
      <h1 className="text-lg font-semibold">Shortly</h1>

      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/history">History</Link>
      </div>

      <p className="text-sm">{user?.username}</p>
    </div>
  );
};

export default Navbar;
