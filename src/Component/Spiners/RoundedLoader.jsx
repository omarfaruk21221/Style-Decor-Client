import React from "react";

const RoundedLoader = () => {
  return (
    <div className="max-w-full min-h-screen mx-auto flex flex-col justify-center items-center ">
      <img
        className="max-w-90 max-h-90 mx-auto"
        src="../../../public/assets/logo3.png"
        alt="Style Decore"
      />
      <div className="-mt-20 ">
        <span className="loading loading-infinity text-primary"></span>
        <span className="loading loading-infinity text-secondary"></span>
        <span className="loading loading-infinity text-accent"></span>
        <span className="loading loading-infinity text-neutral"></span>
        <span className="loading loading-infinity text-info"></span>
        <span className="loading loading-infinity text-success"></span>
        <span className="loading loading-infinity text-warning"></span>
        <span className="loading loading-infinity text-error"></span>
      </div>
    </div>
  );
};

export default RoundedLoader;
