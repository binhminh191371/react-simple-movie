import React from 'react';
import {AiFillStar} from "react-icons/ai"
import { BsFillPlayCircleFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import { originalImg } from '../../config';
import Button from '../button/Button';
const MovieCard = ({item}) => {
    const {title,vote_average,release_date,poster_path,id} = item;
    const navigate = useNavigate();
    return (
       
          <div className="flex flex-col movie-card rounded-lg p-3  bg-gradient-to-t from-slate-800 to-slate-700 h-full select-none">
            <img src={`${originalImg}/${poster_path}`} alt="" 
            className="w-full h-[250px] object-cover rounded-lg mb-5"/>
            <div className="flex flex-col flex-1">
            <h3 className=" text-xl m-auto">{title}</h3>
            <div className="flex  justify-between items-center text-sm mt-3 mb-3 ">
              <span className="opacity-50">{new Date(release_date).getFullYear()}</span>
              <div className="flex items-center justify-between">
              <span className="opacity-50">{vote_average} </span>
              <AiFillStar className="text-[#fda900] ml-1 text-base "></AiFillStar>
              </div>
              
            </div>
           <Button onClick={()=> navigate(`/movies/${id}`)}>Watch now

            <BsFillPlayCircleFill></BsFillPlayCircleFill> </Button>
          </div>
          </div>
        
    );
};

export default MovieCard;