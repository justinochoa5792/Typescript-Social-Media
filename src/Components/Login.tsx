import React from "react";
import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider);
    navigate("/");
  };

  return (
    <div>
      <h2>Sign in with Google</h2>
      <button onClick={signInWithGoogle}>Sign in</button>
    </div>
  );
};

export default Login;
