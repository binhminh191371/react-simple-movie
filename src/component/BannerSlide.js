import React from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";
import useSWR from "swr";
import { fetcher, originalImg } from "../config";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "./button/Button";
import { useNavigate } from "react-router-dom";

const BannerSlide = () => {
 
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=f6ee39be5698e845cff473dedda4c852`,
    fetcher
  );
  const movie = data?.results || [];

  return (
    <div>
      <section className='banner h-[500px] bg-slate-50 page-container rounded-lg  mb-20 overflow-hidden'>
        <Swiper className='h-full' grabCursor={"true"} slidesPerView={"auto"}>
          {movie.length > 0 &&
            movie.map((item) => (
              <SwiperSlide key={item.id}>
                <BannerItem item={item}></BannerItem>
              </SwiperSlide>
            ))}
        </Swiper>
      </section>
    </div>
  );
};

function BannerItem({ item }) {
  const navigate = useNavigate()
  const {title,poster_path,id} = item;
  console.log(item);
  return (
    <div className='h-full w-full  rounded-lg bg-white relative'>
      <div className='overlay absolute inset-0 bg-gradient-to-t from-slate-800'></div>
      <img
        src={`${originalImg}/${item.poster_path}`}
        alt=''
        className='rounded-lg  w-full h-full object-cover '
      />
      <div className='absolute left-5 bottom-5 w-full text-white font-bold  mb-[50px]'>
        <h2 className='text-3xl'>{item.title}</h2>
        <div className='flex items-center gap-x-3 py-3 '>
          <span className=' p-2 rounded-lg border-white border'>Action</span>
          <span className='p-2 rounded-lg border-white border'>Adventure</span>
          <span className='p-2 rounded-lg border-white border'>Drama</span>
        </div>
      
        <button onClick={()=> navigate(`/movies/${id}`)} className='py-3 px-4 rounded-lg bg-primary text-white font-medium flex items-center gap-x-2 '>
              <span>Watch</span>
              <span className='text-xl'>
                <BsFillPlayCircleFill />
              </span>
            </button>
      </div>
    </div>
  );
}
export default BannerSlide;
