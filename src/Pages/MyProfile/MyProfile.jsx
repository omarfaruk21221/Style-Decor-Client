import React from "react";
import useAuth from "../../Hooks/useAuth";

const MyProfile = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1 className="text-4xl font-bold">{user.displayName}</h1>
    </div>
  );
};

export default MyProfile;
