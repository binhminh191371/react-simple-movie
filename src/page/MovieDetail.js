import React from "react";
import { useParams } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import MovieCard from "../component/movie/MovieCard";
import { fetcher, originalImg, tmdbAPI } from "../config";
import "swiper/scss";

// https://api.themoviedb.org/3/movie/{movie_id}?api_key=
const MovieDetail = () => {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMoiveDetail(movieId), fetcher);
  if (!data) return null;
  const { backdrop_path, poster_path, title, genres, overview } = data;
  return (
    <div className='py-10'>
      <div className='w-full h-[600px] relative  rounded-lg '>
        <div className='absolute inset-0 bg-black bg-opacity-60'></div>
        <div
          className='w-full h-full bg-cover bg-no-repeat rounded-lg  '
          style={{
            backgroundImage: `url(${originalImg}/${backdrop_path})`,
          }}
        ></div>
      </div>
      <div className='w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative pb-10'>
        <img
          src={`${originalImg}/${poster_path}`}
          alt=''
          className='w-full h-full object-cover rounded-lg'
        />
      </div>
      <h1 className='text-center text-4xl font-bold mb-10 text-white'>
        {title}
      </h1>
      <div className='flex items-center justify-center gap-x-5 mb-10 text-w'>
        {genres.length > 0 &&
          genres.map((item) => (
            <span
              className='py-2 px-4 border border-primary text-primary rounded-lg'
              key={item.id}
            >
              {item.name}
            </span>
          ))}
      </div>
      <p className='text-center text-sm leading-relaxed max-w-[730px] mx-auto mb-10'>
        {overview}
      </p>
      <MovieCredit></MovieCredit>
      <MovieVideos></MovieVideos>
      <MovieSimilar></MovieSimilar>
    </div>
  );
};

function MovieCredit() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "credits"), fetcher);
  if (!data) return null;
  const { cast } = data;
  if (!cast || cast.length <= 0) return null;
  return (
    <div className='py-10'>
      <h2 className='te   xt-center text-3xl mb-10 font-bold'>Casts</h2>
      <div className='grid  grid-cols-4 gap-x-5 px-5'>
        {cast.slice(0, 4).map((item) => (
          <div className='cast-item' key={item.id}>
            <img
              src={`${originalImg}/${item.profile_path}`}
              alt=''
              className='w-full h-[350px] object-cover rounded-lg mb-3'
            />
            <h3 className='text-xl text-center font-medium'>{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
function MovieVideos() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "videos"), fetcher);
  if (!data) return null;

  const { results } = data;
  console.log(data);
  if (!results || results.length <= 0) return null;
  return (
    <div className='py-10 mb-20'>
      <div className='flex flex-col gap-10'>
        {results.slice(0, 1).map((item) => (
          <div key={item.id} className='w-full h-[650px] aspect-video'>
            <div className='bg-secondary inline-block p-4 rounded-lg mb-11 text-xl font-medium '>
              <h3>{item.name}</h3>
            </div>
            <iframe
              className='w-full h-full object-fill'
              src={`https://www.youtube.com/embed/${item.key}`}
              title='Highlights | ANH vs IRAN | Tam sư đại thắng, khẳng định sức mạnh ứng cử viên vô địch!'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
}

function MovieSimilar() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "similar"), fetcher);
  if (!data) return null;

  const { results } = data;
  if (!results || results.length <= 0) return null;
  console.log(data);
  return (
    <div className='py-10 px-5'>
      <h2 className='text-3xl font-medium mb-10 flex justify-center items-end'>
        Similar movies
      </h2>
      <div className='movie-list '>
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {results.length > 0 &&
            results.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
export default MovieDetail;
