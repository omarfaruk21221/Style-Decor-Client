import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MdAutoDelete } from "react-icons/md";
import { FaUserMinus, FaUserPlus, FaUserShield } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useRole from "../../../Hooks/useRole";
import LoaderWithLogo from "../../../Component/Spiners/LoaderWithLogo";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { role: currentUserRole, roleLoading } = useRole();
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Load users with search + sort
  const {
    refetch,
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users", searchText, sortOrder],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(
          `/users?searchText=${searchText}&sortOrder=${sortOrder}`
        );
        return res.data;
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to load users");
        throw error;
      }
    },
    retry: 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // ================ Make Admin Function =================
  const handleMakeAdmin = async (user) => {
    // Confirm action
    const result = await Swal.fire({
      title: "Make Admin?",
      text: `Are you sure you want to make ${user.name} an admin?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/users/${user._id}/role`, {
        role: "admin",
      });

      if (res.data.modifiedCount > 0) {
        toast.success(`${user.name} is now an admin!`);
        refetch();
      } else {
        toast.info("User is already an admin");
      }
    } catch (error) {
      console.error("Error making admin:", error);
      const message =
        error?.response?.data?.massage ||
        error?.response?.data?.message ||
        "Failed to update user role";
      toast.error(message);
    }
  };

  // ================ Remove Admin Function =================
  const handleRemoveAdmin = async (user) => {
    // Prevent removing own admin role
    if (user.role === "admin") {
      const result = await Swal.fire({
        title: "Remove Admin Role?",
        text: `Are you sure you want to remove admin role from ${user.name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove admin!",
      });

      if (!result.isConfirmed) return;

      try {
        const res = await axiosSecure.patch(`/users/${user._id}/role`, {
          role: "user",
        });

        if (res.data.modifiedCount > 0) {
          toast.success(`${user.name} is now a regular user`);
          refetch();
        } else {
          toast.info("User is already a regular user");
        }
      } catch (error) {
        console.error("Error removing admin:", error);
        const message =
          error?.response?.data?.massage ||
          error?.response?.data?.message ||
          "Failed to update user role";
        toast.error(message);
      }
    } else {
      toast.info(`${user.name} is not an admin`);
    }
  };

  // ================ Delete User Function =================
  const handleDeleteUser = async (user) => {
    const result = await Swal.fire({
      title: "Delete User?",
      text: `Are you sure you want to delete ${user.name}? This action cannot be undone!`,
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete user!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/users/${user._id}`);

      if (res.data.deletedCount > 0) {
        toast.success(`${user.name} has been deleted`);
        refetch();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      const message =
        error?.response?.data?.massage ||
        error?.response?.data?.message ||
        "Failed to delete user";
      toast.error(message);
    }
  };

  // ================ Loading & Error States =================
  if (roleLoading || isLoading) {
    return <LoaderWithLogo />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="text-error text-6xl">⚠️</div>
        <h2 className="text-2xl font-bold text-error">Error Loading Users</h2>
        <p className="text-base-content/70">
          {error?.message || "Something went wrong"}
        </p>
        <button onClick={() => refetch()} className="btn btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  // ================ Admin Verification =================
  if (currentUserRole !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <FaUserShield className="text-error text-6xl" />
        <h2 className="text-2xl font-bold text-error">Access Denied</h2>
        <p className="text-base-content/70">
          You need admin privileges to access this page
        </p>
      </div>
    );
  }

  return (
    <div className="bg-secondary-content/50 p-6">
      <header className="bg-secondary-content py-8 px-20 rounded-xl">
        <h1 className="text-4xl text-center pb-10 text-accent font-bold">
          Manage Users: {users.length}
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
        {users.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-2xl text-base-content/50">No users found</p>
            <p className="text-base-content/30 mt-2">
              Try adjusting your search criteria
            </p>
          </div>
        ) : (
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

            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={user.image || "/default-avatar.png"}
                            alt="avatar"
                            onError={(e) => {
                              e.target.src = "/default-avatar.png";
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.name}</div>
                        <div className="text-sm opacity-50">{user.email}</div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span
                      className={`badge ${user.role === "admin"
                          ? "badge-primary"
                          : "badge-secondary"
                        }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-ghost">
                      {user.status || "active"}
                    </span>
                  </td>

                  <th className="flex gap-2">
                    {/* Make Admin Button */}
                    {user.role !== "admin" && (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-success btn-xs text-xl px-2 py-4"
                        title="Make Admin"
                      >
                        <FaUserPlus />
                      </button>
                    )}

                    {/* Remove Admin Button */}
                    {user.role === "admin" && (
                      <button
                        onClick={() => handleRemoveAdmin(user)}
                        className="btn btn-warning btn-xs text-xl px-2 py-4"
                        title="Remove Admin"
                      >
                        <FaUserMinus />
                      </button>
                    )}

                    {/* Delete User Button */}
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="btn btn-error btn-xs text-xl px-2 py-4"
                      title="Delete User"
                    >
                      <MdAutoDelete />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
};

export default ManageUsers;
