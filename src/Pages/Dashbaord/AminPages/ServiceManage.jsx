import React, { useState } from "react";
import { MdOutlineAddCircle } from "react-icons/md";
import { Link } from "react-router-dom";

const ServiceManage = () => {
  const [searchText, setSearchText] = useState("");
  return (
    <div className="px-20  ">
      <header className="bg-primary/10 mb-10  rounded-2xl p-10 text-center">
        <h1 className="text-4xl text-center font-bold">Manage Servce </h1>
        <section className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Search input */}
          <aside>
            <label className="input rounded-2xl">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                onChange={(e) => setSearchText(e.target.value)}
                type="search"
                className="grow"
                placeholder="Search User by name or email"
              />
            </label>
          </aside>
          {/* Add Service Button */}
          <aside>
            <Link
              to="/dashboard/add-service"
              className="btn btn-accent text-sm"
            >
              <MdOutlineAddCircle className="text-2xl" />
              Add New Service
            </Link>
          </aside>
        </section>
      </header>

      {/* tableshaow all dervices */}
      <main className="overflow-x-auto bg-primary/10 rounded-2xl text-center">

        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr>

          </tbody>
        </table>

      </main>
    </div>
  );
};

export default ServiceManage;
