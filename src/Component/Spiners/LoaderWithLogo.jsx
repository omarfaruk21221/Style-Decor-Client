import React from "react";

const LoaderWithLogo = () => {
  return (
    <div className="max-w-full min-h-screen mx-auto flex flex-col justify-center items-center ">
      <img
        className="max-w-90 max-h-90 mx-auto"
        src="../../../public/assets/logo3.png"
        alt="Style Decore"
      />
      <div className="-mt-20 ">
        <progress className="progress bg-primary text-secondary  w-56 "></progress>
      </div>
    </div>
  );
};

export default LoaderWithLogo;
