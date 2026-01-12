import React from "react";

export default function Statistics() {
  return (
    <div className=" text-center space-y-8">
      <h1 className=" font-bold text-4xl">Our Statistics</h1> {/* Statistics */}
      <section className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="bg-primary/80 p-6 rounded-xl">
          <h3 className="text-3xl font-bold text-primary-content">1500+</h3>
          <p className="text-gray-300">Our Total Projects</p>
        </div>
        <div className="bg-primary/80 p-6 rounded-xl">
          <h3 className="text-3xl font-bold text-primary-content">300+</h3>
          <p className="text-gray-300"> Running Project </p>
        </div>
        <div className="bg-primary/80 p-6 rounded-xl">
          <h3 className="text-3xl font-bold text-primary-content">1200+</h3>
          <p className="text-gray-300"> Completed Project </p>
        </div>

        <div className="bg-primary/80 p-6 rounded-xl">
          <h3 className="text-3xl font-bold text-primary-content">100%</h3>
          <p className="text-gray-300">Commitment</p>
        </div>
      </section>
    </div>
  );
}
