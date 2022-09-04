import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [user] = useAuthState(auth);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="navbar">
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
      </div>
      <div className="user">
        {user && (
          <>
            <p>{user?.displayName}</p>
            <button onClick={logout}>Log Out</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
