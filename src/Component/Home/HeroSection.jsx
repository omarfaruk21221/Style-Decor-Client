import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaShoppingBag,
  FaDraftingCompass,
  FaCheckCircle,
  FaTruck,
  FaHeadset,
} from "react-icons/fa";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

// Import Local Assets
import hero1 from "../../assets/hero1.jpg";
import hero2 from "../../assets/hero2.jpg";
import hero3 from "../../assets/hero3.jpg";

const HeroSection = () => {
  return (
    <section className="font-display text-slate-900 dark:text-white">
      {/* Hero Slider Section */}
      <div className="relative w-full h-[600px] md:h-[700px] group">
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          effect={"fade"}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={{
            nextEl: ".custom-swiper-button-next",
            prevEl: ".custom-swiper-button-prev",
          }}
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          className="w-full h-full"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="relative w-full h-full">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
                style={{
                  backgroundImage: `url(${hero1})`,
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
              <div className="relative h-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
                <div className="max-w-xl space-y-6 animate-fade-in-up">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-semibold uppercase tracking-wider">
                    New Arrival
                  </span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                    Redefine Your <br />{" "}
                    <span className="text-blue-400">Living Space</span>
                  </h2>
                  <p className="text-lg text-slate-200 leading-relaxed font-light">
                    Award-winning interior concepts designed to bring harmony
                    and elegance to the modern home.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <Link
                      to="/services"
                      className="h-12 px-8 rounded-lg bg-primary text-white font-bold text-sm shadow-lg hover:bg-blue-600 transition-all flex items-center gap-2"
                    >
                      Explore Collection
                      <FaArrowRight className="text-lg" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="relative w-full h-full">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
                style={{
                  backgroundImage: `url(${hero2})`,
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"></div>
              <div className="relative h-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-24 md:pb-32 items-center text-center">
                <div className="max-w-2xl space-y-6">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                    The Blue Velvet Collection
                  </h2>
                  <p className="text-lg text-slate-200 leading-relaxed font-light">
                    Experience unparalleled comfort with our new premium
                    fabrics, crafted for those who appreciate luxury.
                  </p>
                  <Link
                    to="/services"
                    className="h-12 px-8 rounded-lg bg-white text-primary font-bold text-sm shadow-lg hover:bg-slate-100 transition-all inline-flex items-center gap-2"
                  >
                    Shop Now
                    <FaShoppingBag className="text-lg" />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="relative w-full h-full">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
                style={{
                  backgroundImage: `url(${hero3})`,
                }}
              ></div>
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="relative h-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-end text-right">
                <div className="max-w-xl space-y-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/80 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wider">
                    Featured Project
                  </span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                    Form Meets <br /> Function
                  </h2>
                  <p className="text-lg text-slate-200 leading-relaxed font-light ml-auto">
                    Kitchens designed for culinary excellence. Where sleek
                    architecture meets practical design.
                  </p>
                  <Link
                    to="/services"
                    className="h-12 px-8 rounded-lg bg-primary text-white font-bold text-sm shadow-lg hover:bg-blue-600 transition-all inline-flex items-center gap-2"
                  >
                    Start Booking
                    <FaDraftingCompass className="text-lg" />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Custom Navigation Arrows */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 flex justify-between px-4 sm:px-8 pointer-events-none">
            <button className="custom-swiper-button-prev pointer-events-auto size-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110 focus:ring-2 focus:ring-primary hidden md:flex group/arrow">
              <MdArrowBackIosNew className="group-hover/arrow:-translate-x-0.5 transition-transform" />
            </button>
            <button className="custom-swiper-button-next pointer-events-auto size-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110 focus:ring-2 focus:ring-primary hidden md:flex group/arrow">
              <MdArrowForwardIos className="group-hover/arrow:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </Swiper>
      </div>

      {/* Brief Features Section */}
      <section className="bg-white dark:bg-base-200 py-12 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-base-300/50 transition-colors cursor-pointer group">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                <FaCheckCircle className="text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                  Premium Quality
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Sourced from the finest materials worldwide.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-base-300/50 transition-colors cursor-pointer group">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                <FaTruck className="text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                  Fast Delivery
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Expedited shipping on all collection items.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-base-300/50 transition-colors cursor-pointer group">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                <FaHeadset className="text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                  24/7 Support
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Our design experts are here to help anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default HeroSection;
