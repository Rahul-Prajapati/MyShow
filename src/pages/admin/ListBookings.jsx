import React from 'react'
import { dummyBookingData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import { useState } from 'react';
import { useEffect } from 'react';
import dateFormat from '../../lib/dateFormat';
import { toast } from 'react-hot-toast';

const ListBookings = () => {

  const currency = import.meta.env.VITE_CURRENCY;

  const { axios, getToken, user } = useAppContext();

  const [booking, setBooking] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  const getAllBookings = async() =>{
    try {
      const { data } = await axios.get("/api/admin/all-bookings", {
        headers: { Authorization : `Bearer ${await getToken()}`}
      });

      setBooking(data.bookings);
    } catch (error) {
      toast(error);
      
    }
    setIsLoading(false);
  }

  useEffect(()=>{
    if(user){
      getAllBookings();
    }
  },[user])

  return !isloading ? (
    <>

    <Title text1="List" text2="Bookings" />

    <div className='max-w-4xl mt-6 overflow-auto'>
      <table className='w-full border-collapse rounded-md overflow-hidden text-nowrap'>
        <thead>
          <tr className='bg-primary/20 text-left text-white'>
            <th className='p-2 font-medium pl-5'>User Name</th>
            <th className='p-2 font-medium'>Movie Name</th>
            <th className='p-2 font-medium'>Show Time</th>
            <th className='p-2 font-medium'>Seats</th>
            <th className='p-2 font-medium'>Amount</th>
          </tr>
        </thead>

        <tbody className='text-sm font-light'>
          {
            booking.map((item, index) => (
              <tr key={index} className='border-b border-primary/20 bg-primary/5 even:bg-primary/10'>
                <td className='p-2 min-w-45 pl-5'>{item.user.name}</td>
                <td className='p-2'>{item.show.movie.title}</td>
                <td className='p-2'>{dateFormat(item.show.showDateTime)}</td>
                <td className='p-2'>{Object.keys(item.bookedSeats).map(seat => item.bookedSeats[seat]).join(",")}</td>
                <td className='p-2'>{currency} {item.amount}</td>
              </tr>
            ))
          }

        </tbody>

      </table>

    </div>

    </>
  )

  :

  <Loading />
}

export default ListBookings