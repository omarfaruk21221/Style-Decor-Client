import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// ---------- brand icons import -----
import brand1 from "../../assets/brands/amazon.png";
import brand2 from "../../assets/brands/casio.png";
import brand3 from "../../assets/brands/moonstar.png";
import brand4 from "../../assets/brands/randstad.png";
import brand5 from "../../assets/brands/star.png";
import brand6 from "../../assets/brands/amazon_vector.png";
import brand7 from "../../assets/brands/start_people.png";

const brands = [brand1, brand2, brand3, brand4, brand5, brand6, brand7];

const Brands = () => {
  return (
    <section>
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className=" text-center">
          <p className="uppercase tracking-[0.3em] text-xs text-black/60 mb-3">
            Trusted By
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Brands That Believe in Our Work
          </h2>
        </div>

        {/* Slider */}
        <Swiper
          modules={[Autoplay]}
          loop
          slidesPerView={2}
          spaceBetween={40}
          centeredSlides
          grabCursor
          autoplay={{
            delay: 1200,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
          className="opacity-80"
        >
          {brands.map((logo, index) => (
            <SwiperSlide key={index}>
              <div className="flex items-center justify-center h-24">
                <img
                  src={logo}
                  alt="Brand logo"
                  className="max-h-10 object-contain grayscale hover:grayscale-0 transition duration-300 ease-out"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Brands;
