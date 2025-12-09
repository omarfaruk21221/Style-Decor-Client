import React from "react";
import useAuth from "../Hooks/useAuth";

const Avator = () => {
  const { user } = useAuth();
  return (
    <div className="avatar hover:scale-115 transition-transform duration-300">
      <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
        <img src={user.photoURL} />
      </div>
    </div>
  );
};

export default Avator;
