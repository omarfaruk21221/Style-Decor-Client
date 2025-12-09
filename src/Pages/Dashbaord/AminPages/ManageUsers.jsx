import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { MdAutoDelete } from "react-icons/md";
import { useState } from "react";
import { FaUserMinus, FaUserPlus } from "react-icons/fa";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Load users with search + sort
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users", searchText, sortOrder],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?searchText=${searchText}&sortOrder=${sortOrder}`
      );
      return res.data;
    },
  });

  // ================ make admin function =================
  const handleMakeAdmin = (user) => {
    console.log("make admin", user);
    toast.success("Make admin successful");
    refetch();
  };

  // ================= remove admin function =================
  const handleRemoveAdmin = (user) => {
    console.log("remove admin", user);
    toast.success("Remove admin successful");
    refetch();
  };

  return (
    <div className="bg-secondary-content/50 p-6 ">
      <header className=" bg-secondary-content py-8 px-20 rounded-xl ">
        <h1 className="text-4xl text-center pb-10 text-accent font-bold">
          Manage Users : {users.length}
        </h1>

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

          {/* SORT DROPDOWN */}
          <aside>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn m-1">
                Sort: {sortOrder === "asc" ? "A → Z" : "Z → A"}
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <a onClick={() => setSortOrder("asc")}>Ascending (A-Z)</a>
                </li>
                <li>
                  <a onClick={() => setSortOrder("desc")}>Descending (Z-A)</a>
                </li>
              </ul>
            </div>
          </aside>
        </section>
      </header>

      {/* ====================== TABLE ======================= */}
      <main className="overflow-x-auto max-w-6xl bg-primary/10 p-4 rounded-lg mt-6 mx-auto">
        <table className="table">
          <thead>
            <tr className="text-md">
              <th>#</th>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          {users.map((user, index) => (
            <tbody key={user._id}>
              <tr>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user.image} alt="avatar" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-sm opacity-50">{user.email}</div>
                    </div>
                  </div>
                </td>

                <td>{user.role}</td>
                <td>{user.status || "pending"}</td>

                <th>
                  <button
                    onClick={() => handleMakeAdmin(user)}
                    className="btn btn-natural  btn-xs text-xl px-2 py-4 hover:bg-green-600 mr-2"
                  >
                    <FaUserPlus />
                  </button>

                  <button className="btn btn-natural btn-xs text-xl px-2 py-4 hover:bg-amber-600 mr-2">
                    <FaUserMinus />
                  </button>

                  <button
                    onClick={() => handleRemoveAdmin(user)}
                    className="btn btn-natural btn-xs text-xl px-2 py-4 hover:bg-red-600 mr-2"
                  >
                    <MdAutoDelete />
                  </button>
                </th>
              </tr>
            </tbody>
          ))}
        </table>
      </main>
    </div>
  );
};

export default ManageUsers;
