import { FaStar, FaAward, FaPaintBrush } from "react-icons/fa";

// Import Local Assets
import decorator1 from "../../assets/decorator1.jpg";
import decorator2 from "../../assets/decorator2.jpg";
import decorator3 from "../../assets/decorator3.jpg";
import decorator4 from "../../assets/decorator4.jpg";

const DECORATORS = [
  {
    id: 1,
    name: "Elena Richardson",
    image: decorator1,
    specialty: "Modern Minimalist",
    rating: 4.9,
    projects: 124,
  },
  {
    id: 2,
    name: "Marcus Chen",
    image: decorator2,
    specialty: "Industrial Chic",
    rating: 4.8,
    projects: 98,
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    image: decorator3,
    specialty: "Bohemian Luxe",
    rating: 5.0,
    projects: 156,
  },
  {
    id: 4,
    name: "David Miller",
    image: decorator4,
    specialty: "Scandanavian",
    rating: 4.7,
    projects: 87,
  },
];

const TopDecorators = () => {
  return (
    <section>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl  font-bold mb-4">
            Top Rated Decorators
          </h2>
          <p className="text-lg text-base-content/60 max-w-2xl mx-auto">
            Meet the creative minds behind our most stunning transformations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {DECORATORS.map((decorator) => (
            <div
              key={decorator.id}
              className="group relative overflow-hidden rounded-3xl bg-base-200 hover:bg-base-300 shadow-md transition-all duration-300"
            >
              {/* Image Container */}
              <div className="h-64 overflow-hidden relative">
                <img
                  src={decorator.image}
                  alt={decorator.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white font-medium flex items-center gap-2">
                    <FaAward className="text-yellow-400" /> Top Rated
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-2">{decorator.name}</h3>
                <p className="text-primary text-sm font-medium mb-4 uppercase tracking-wider">
                  {decorator.specialty}
                </p>

                <div className="flex justify-center items-center gap-6 text-sm text-base-content/70 border-t border-base-content/10 pt-4">
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span className="font-bold text-base-content">
                      {decorator.rating}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaPaintBrush className="text-secondary" />
                    <span>{decorator.projects} Projects</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopDecorators;
