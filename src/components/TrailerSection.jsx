import React from 'react'
import { useState } from 'react'
import { dummyTrailers } from '../assets/assets'
import BlurCircle from './BlurCircle';
import ReactPlayer from 'react-player'

const TrailerSection = () => {

    const [currentTrailer, setCurrentTrailer ] = useState(dummyTrailers[0]);

    console.log(currentTrailer.videoUrl);
  return (
    <div className='px-6 md:px-16 lg-px-24 xl:px-44 py-20 pverflow-hidden'>
        <p className='text-gray-300 font-medium text-lg max-w-[960px] mx-auto'>
            Trailer
        </p>

        <div className='relative mt-6'>
            <BlurCircle top='-100px' right='-100px' />

            <ReactPlayer
             url={currentTrailer.videoUrl} 
             controls={false}
             width="960px" height="540px"
             className=" mx-auto max-w-full"  />
            
            {/* <img src={currentTrailer.image} className='mx-auto max-w-full' width="960px" height="540px"/>
             <ReactPlayer url={currentTrailer.videoUrl} controls={true}
             width="960px" height="540px" className='mx-auto max-w-full' /> */}

        </div>
        
    </div>
  )
}

export default TrailerSection