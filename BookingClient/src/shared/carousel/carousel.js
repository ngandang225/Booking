import React, { useRef, useState } from "react";
import "./carousel.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
function Carousel({ data,handleClick }) {

  return (
    <div className="swiper-container">
      <Swiper
        className="mySwiper"
        slidesPerView={4}
        spaceBetween={20}
        slidesPerGroup={1}
        loop={false}
        loopFillGroupWithBlank={true}
      >
        {data?.length > 0 &&
          data.map((photo, i) => (
            <SwiperSlide className="slide">
              <div onClick={()=>{handleClick(photo)}}>
                <img src={photo.thumbnail} alt="" className="card-img" />
                <h5 className="place">{photo.name}</h5>
                {photo?.space > 0 && (
                  <div className="number-of-accommodation">
                    {photo.space} chỗ nghỉ
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
export default Carousel;
