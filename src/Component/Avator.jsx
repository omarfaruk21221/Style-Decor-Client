import React from "react";

const Avator = () => {
  return (
    <div className="avatar hover:scale-115 transition-transform duration-300">
      <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring-2 ring-offset-2">
        <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
      </div>
    </div>
  );
};

export default Avator;
