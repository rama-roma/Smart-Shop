import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Swipper({img}) {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      navigation
      modules={[Autoplay, Pagination, Navigation]}
      className="
        w-full 
        h-auto 
        rounded-[16px] 
        overflow-hidden
        bg-gray-100 
        dark:bg-[#1e1e1e]
      "
    >
      {[1,2,3,4,5].map((n) => (
        <SwiperSlide
          key={n}
          className="
            flex 
            items-center 
            justify-center 
            text-3xl 
            font-bold
            text-black 
            dark:text-white
            bg-[#ffd36a]
            dark:bg-[#2b2b2b]
          "
        >
          <img src={img} alt="" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
