import React from "react";
import useAuth from "../../Hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div>
      Dashboard home Page Wlecome to your dashboard !! Sit {user.displayNeme}
    </div>
  );
};

export default Dashboard;
