import React from "react";
import HowItsWorkDatas from "../../../public/Data/HowItsWorkData.json";

const HowItsWork = () => {
  return (
    <section className=" bg-base-100 text-black">
      <div className="container mx-auto space-y-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            How It Works
          </h1>
          <p className="text-black/60 text-lg leading-relaxed">
            A simple, structured process designed to deliver premium results
            with clarity, precision, and professionalism.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {HowItsWorkDatas.map((data) => (
            <div
              key={data.id}
              className="group relative border border-black/10 rounded-2xl p-4 space-y-3 shadow-md bg-base-100 transition-all duration-300 hover:border-black"
            >
              {/* Large Step Number */}
              {/* <span className="absolute -top-8 left-6 text-7xl font-extrabold text-black/5 select-none">
                {index + 1}
              </span> */}
              {/* Icon */}
              <div>
                <img
                  src={data.icon}
                  alt={data.title}
                  className="w-10 h-10 opacity-70 group-hover:opacity-100 transition"
                />
              </div>
              {/* Title */}
              <h2 className="text-md font-semibold tracking-wide">
                {data.title}
              </h2>
              {/* Description */}
              <p className="text-xs leading-relaxed text-black/70">
                {data.description}
              </p>
              {/* Minimal Divider */}
              <div className=" h-px w-12 bg-black/20 group-hover:w-full transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItsWork;
