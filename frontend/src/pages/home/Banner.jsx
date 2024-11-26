import React from "react";
import bannerImg from '../../assets/banner.png'

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row-reverse py-16 justify-between
    items-center gap-12">
        <div className="md:w-1/2 w-full flex items-center md:justify-end">
            <img src={bannerImg}></img>
        </div>
      <div className="md:w-1/2 w-full">
        <h1 className="md:text-5xl text-2xl
            font-medium mb-7">
          New Releases This Week
        </h1>
        <p className="mb-10 text-lg">
          Get ready for an exciting week of fresh titles! Discover the latest
          additions to our collection that are sure to capture your interest.
          Whether you are in the mood for thrilling adventures, heartwarming
          stories, or thought-provoking reads, we've got something for everyone.
        </p>


      </div>

      
    </div>
  );
};

export default Banner;
