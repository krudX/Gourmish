"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import SectionTitle from "./SectionTitle";
import PopularRecipeCarouselCard from "./PopularRecipeCarouselCard";

const PopularRecipesCarousel = ({ recipes }) => {
  return (
    <section className="popular-recipes">
      <div className="section-container">
        <SectionTitle>Popular Recipes</SectionTitle>

        <div className="carousel-wrap">
          <Swiper
            slidesPerView={4}
            spaceBetween={24}
            loop={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {recipes?.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <PopularRecipeCarouselCard recipe={item} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default PopularRecipesCarousel;
