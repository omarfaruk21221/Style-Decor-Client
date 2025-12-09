import React, { useEffect, useRef, useState } from "react";
import { MdOutlineAddCircle, MdOutlineArrowBack, MdOutlineArrowForward, MdOutlineDelete, MdOutlineDetails, MdOutlineEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import ServiceModal from "../../ServiceModal";

const ServiceManage = () => {
  const [searchText, setSearchText] = useState("");
  const axiosSecure = useAxiosSecure();
  const [services, setServices] = useState([]);
  const riderModalRef = useRef();

  useEffect(() => {
    axiosSecure.get("/services").then((res) => {
      setServices(res.data);
    });
  }, []);
  console.log(services);
  // Filter & Sort State
  const [filterCategory, setFilterCategory] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // "asc" or "desc"

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  // Logic: Filter -> Sort -> Paginate
  const filteredServices = services
    .filter((service) => {
      const searchLower = searchText.toLowerCase();
      const nameMatch = service.service_name.toLowerCase().includes(searchLower);
      const emailMatch = service.createdByEmail?.toLowerCase().includes(searchLower);
      const categoryMatch = filterCategory ? service.service_category === filterCategory : true;
      return (nameMatch || emailMatch) && categoryMatch;
    })
    .sort((a, b) => {
      if (!sortOrder) return 0;
      const dateA = new Date(a.createdAt || 0);
      const dateB = new Date(b.createdAt || 0);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  // Calculate pagination based on filtered results
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentServices = filteredServices.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);

  }, [searchText, filterCategory, sortOrder]);

  // ===== handle handleShowDetails===
  const [selectedService, setSelectedService] = useState(null);

  const handleShowDetails = (service) => {
    setSelectedService(service);
    riderModalRef.current.showModal();
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  return (
    <div className="px-20  ">
      <header className="bg-primary/10 mb-10 rounded-2xl p-10 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-10">Manage Services ({filteredServices.length}) </h1>

        <section className="flex flex-col lg:flex-row justify-between items-center gap-4">

          {/* Search & Filters Group */}
          <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
            {/* Search Input */}
            <label className="input rounded-2xl flex items-center gap-2 w-full md:w-auto">
              <input
                onChange={(e) => setSearchText(e.target.value)}
                type="search"
                className="grow"
                placeholder="Search by name or email"
              />
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
            </label>

            {/* Category Filter */}
            <select
              className="select select-bordered w-full md:w-auto rounded-2xl"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="home">🏠 Home</option>
              <option value="wedding">💒 Wedding</option>
              <option value="office">🏢 Office</option>
              <option value="seminar">🎓 Seminar</option>
              <option value="party">🎉 Party</option>
            </select>

            {/* Sort Order */}
            <select
              className="select select-bordered w-full md:w-auto rounded-2xl"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Sort by Date</option>
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>

          {/* Add Service Button */}
          <aside className="w-full lg:w-auto flex justify-end">
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
      <main className="overflow-x-auto bg-primary/10 rounded-2xl text-center pb-5">
        <table className="table table-zebra mb-10">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Service Name</th>
              <th>Service Category</th>
              <th>Service Creator</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row */}
            {currentServices.map((service, index) => (
              <tr key={service._id}>
                <th>{indexOfFirstItem + index + 1}</th>
                <td>{service.service_name}</td>
                <td>{service.service_category}</td>
                <td>{service.createdByName}</td>
                <td className="flex gap-2 flex-wrap">
                  <button className="btn btn-primary btn-xs" onClick={() => handleShowDetails(service)}>
                    <MdOutlineDetails />Details
                  </button>
                  <button className="btn btn-primary btn-xs"> <MdOutlineEdit />Edit</button>
                  <button className="btn btn-error btn-xs"> <MdOutlineDelete />Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-center gap-2 mt-5">
          <button
            className="btn btn-sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <MdOutlineArrowBack />
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`btn btn-sm ${currentPage === i + 1 ? "btn-active btn-primary" : ""}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="btn btn-sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <MdOutlineArrowForward />
          </button>
        </div>

      </main>

      {/* Service Details Modal */}


      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <ServiceModal ref={riderModalRef} service={selectedService} onClose={handleCloseModal} />
    </div>
  );
};

export default ServiceManage;
