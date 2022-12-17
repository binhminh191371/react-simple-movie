import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import useSWR from "swr";
import MovieCard from "../component/movie/MovieCard";
import { fetcher, tmdbAPI } from "../config";
import useDebounce from "../hook/useDebounce";
import ReactPaginate from "react-paginate";
import Loading from "../component/Loading";

const itemsPerPage = 20;
const MoviePage = () => {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const [nextPage, setNextPage] = useState(1);
  const [fillter, setFillter] = useState("");
  const fillterDebounce = useDebounce(fillter, 500);
  const [url, setUrl] = useState(tmdbAPI.getNextPage(nextPage, "popular"));
  const handleFillterChange = (e) => {
    setFillter(e.target.value);
  };
  const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error;
  useEffect(() => {
    if (fillterDebounce) {
      setUrl(tmdbAPI.getMovieSearch(fillterDebounce, nextPage));
    } else {
      setUrl(tmdbAPI.getNextPage(nextPage, "popular"));
    }
  }, [fillterDebounce, nextPage]);

  const movie = data?.results || [];
  useEffect(() => {
    if (!data || !data.total_results) return;
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data, itemOffset]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;
    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
  };

  return (
    <div className='py-10  page-container  text-white'>
      <div className='flex mb-10'>
        <div className='flex-1'>
          <input
            type='text'
            onChange={handleFillterChange}
            className='w-full p-4 bg-slate-600 cursor-text outline-none rounded-l-lg'
            placeholder='Enter your film...'
          />
        </div>
        <button className='p-3 bg-primary rounded-r-lg'>
          <AiOutlineSearch className='text-3xl'></AiOutlineSearch>
        </button>
      </div>

      {loading && <Loading></Loading>}
      <div className='grid grid-cols-4 gap-10'>
        {!loading &&
          movie.length > 0 &&
          movie.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>
      <div className='mt-10'>
        <ReactPaginate
          breakLabel='...'
          nextLabel='next >'
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel='< previous'
          renderOnZeroPageCount={null}
          className='Pagination'
        />
      </div>
    </div>
  );
};



export default MoviePage;
