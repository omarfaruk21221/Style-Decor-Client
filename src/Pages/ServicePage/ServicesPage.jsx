import React, { useEffect, useState } from "react";
import { MdDesignServices } from "react-icons/md";
import { FaSearch, FaFilter } from "react-icons/fa";
import ServiceCard from "./ServiceCard";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Services = () => {
  const [services, setServices] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const axiosSecure = useAxiosSecure();
  const itemsPerPage = 12;

  const categories = [
    "Living Room",
    "Bedroom",
    "Kitchen",
    "Bathroom",
    "Office",
    "Dining",
    "Kids Room",
    "Entryway",
    "Outdoor",
  ];
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {

        const res = await axiosSecure.get(`/services?limit=1000`);

        let data = [];
        if (res.data.data && Array.isArray(res.data.data)) {
          data = res.data.data;
        } else if (Array.isArray(res.data)) {
          data = res.data;
        }

        setAllServices(data);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [axiosSecure]);


  useEffect(() => {
    let result = [...allServices];
    if (search) {
      result = result.filter((item) =>
        (item.service_name || item.title || "").toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category) {
      result = result.filter(
        (item) => (item.service_category || item.category) === category
      );
    }
    if (minPrice) {
      result = result.filter((item) => (item.cost || 0) >= parseFloat(minPrice));
    }
    if (maxPrice) {
      result = result.filter((item) => (item.cost || 0) <= parseFloat(maxPrice));
    }
    if (sortOrder === "asc") {
      result.sort((a, b) => (a.cost || 0) - (b.cost || 0));
    } else if (sortOrder === "desc") {
      result.sort((a, b) => (b.cost || 0) - (a.cost || 0));
    }
    const total = Math.ceil(result.length / itemsPerPage);
    setTotalPages(total > 0 ? total : 1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setServices(result.slice(startIndex, endIndex));

  }, [allServices, search, category, minPrice, maxPrice, sortOrder, currentPage]);


  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleReset = () => {
    setSearch("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setSortOrder("");
    setCurrentPage(1);
  };

  return (
    <div className="py-12 min-h-screen">
      {/* Hero Section */}
      <div className="text-center mb-12 px-4">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-primary/10 rounded-full">
            <MdDesignServices className="w-12 h-12 text-primary animate-pulse" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Our Services
        </h1>
        <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto leading-relaxed">
          Professional interior design services to transform your space into a
          beautiful and functional environment.
        </p>
      </div>

      {/* Search and Filters Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-base-100/50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-base-200">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">

            {/* Search Input */}
            <div className="w-full lg:w-1/3 relative">
              <input
                type="text"
                placeholder="Search services..."
                className="input input-bordered w-full pl-10 focus:input-primary transition-all"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
            </div>

            {/* Filters Group */}
            <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-center lg:justify-end">

              {/* Category Select */}
              <select
                className="select select-bordered w-full sm:w-auto focus:select-primary"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              {/* Price Sort */}
              <select
                className="select select-bordered w-full sm:w-auto focus:select-primary"
                value={sortOrder}
                onChange={(e) => {
                  setSortOrder(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">Sort By Price</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
              </select>

              {/* Price Range Inputs */}
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="input input-bordered w-20 focus:input-primary"
                  value={minPrice}
                  onChange={(e) => {
                    setMinPrice(e.target.value);
                    setCurrentPage(1);
                  }}
                />
                <span className="text-base-content/50">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="input input-bordered w-20 focus:input-primary"
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              {/* Reset Button */}
              {(search || category || minPrice || maxPrice || sortOrder) && (
                <button
                  onClick={handleReset}
                  className="btn btn-ghost btn-sm text-error hover:bg-error/10"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-[400px] rounded-2xl bg-base-200/50 animate-pulse" />
            ))}
          </div>
        ) : services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {services.map((service) => (
              <ServiceCard key={service._id || service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-base-200/30 rounded-3xl flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-base-300 rounded-full flex items-center justify-center mb-4 text-base-content/40">
              <FaFilter className="text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-base-content/70">No services found</h3>
            <p className="text-base-content/50 mt-2 max-w-md">
              We couldn't find any services matching your criteria. Try adjusting your filters.
            </p>
            <button
              onClick={handleReset}
              className="mt-6 btn btn-primary btn-outline"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mb-16">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn btn-circle btn-outline btn-sm md:btn-md"
          >
            ❮
          </button>

          <div className="flex gap-2 mx-2 overflow-x-auto max-w-[200px] md:max-w-none no-scrollbar">
            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              if (
                pageNum === 1 ||
                pageNum === totalPages ||
                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
              ) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`btn btn-sm md:btn-md ${currentPage === pageNum
                      ? "btn-primary text-white shadow-lg shadow-primary/30"
                      : "btn-ghost"
                      }`}
                  >
                    {pageNum}
                  </button>
                );
              } else if (
                pageNum === currentPage - 2 ||
                pageNum === currentPage + 2
              ) {
                return <span key={pageNum} className="self-end px-1">...</span>;
              }
              return null;
            })}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="btn btn-circle btn-outline btn-sm md:btn-md"
          >
            ❯
          </button>
        </div>
      )}

    </div>
  );
};
export default Services;
