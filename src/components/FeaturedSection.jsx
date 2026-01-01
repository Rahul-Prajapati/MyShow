import { ArrowRight } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import BlurCircle from './BlurCircle';
import MovieCard from './MovieCard';
import { useAppContext } from '../context/AppContext';

const FeaturedSection = () => {

    const navigate = useNavigate();
    const { shows } = useAppContext();

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden'>

        <div className='relative flex items-center justify-between pt-20 pb-10'>
            <BlurCircle top='0' right='-70px' />
            <p className='text-grey-300 font-medium text-lg'>
                Now Showing
            </p>

            <button 
                onClick={()=> navigate('./movies')} 
                className='group flex items-center gap-2 text-sm text-grey-300' 
            >
                View All
                <ArrowRight className='group-hover:translate-x-0.5 transition w-4.5 h-4.5' />
            </button>

        </div>

        <div className='flex gap-8 mt-4 flex-wrap max-sm:justify-center'>
            {
                shows?.slice(0,4).map((show)=>(
                    <MovieCard key={show._id} movie={show} />
                ))
            }


        </div>

        <div className='flex justify-center mt-10'>
            <button 
                className= 'bg-primary px-10 py-3 text-sm hover:bg-primary-dull transition rounded-md font-medium cursor-pointer'
                onClick={()=> {navigate('/movies'); scrollTo(0,0)}} >
                    Show More
            </button>
        </div>

    </div>
  )
}

export default FeaturedSection