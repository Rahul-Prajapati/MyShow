import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className='px-6 md:px-16 lg:px-36 mt-40 w-full text-gray-300' >

      <div className='flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-14'>

        <div className='md:max-w-96'>

          <img src={assets.logo} className='w-36 h-auto' alt='logo' />

          <p className='mt-6 text-sm'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi saepe sint porro ea, molestias blanditiis repellendus sit nesciunt cum magni, cupiditate aperiam eaque minima amet! Expedita neque similique qui perferendis.
          </p>

          <div className='flex gap-4 mt-4 items-center'>
            <img src={assets.googlePlay} alt="android playstore" />
            
            <img src={assets.appStore} alt="apple appstore" />
          </div>

        </div>

        <div className='flex flex-1 items-start md:justify-end gap-20 md:gap-40'>

          <div>
            <h2 className='font-semibold mb-5'> Company </h2>

            <ul className='text-sm space-y-2'>
              <li><a href='#'>Home</a></li>
              <li><a href='#'>About us</a></li>
              <li><a href='#'>Contact us</a></li>
              <li><a href='#'>Privacy policy</a></li>

            </ul>
          </div>

          <div>
            <h2 className='font-semibold mb-5'>Get in touch</h2>

            <div className='text-sm space-y-2'>
              <p>+1-234-567-890</p>
              <p>conatct@example.com</p>
            </div>

          </div>
        </div>

      </div>

      <p className='pt-4 text-center text-sm pb-5'>
        Copyright {new Date().getFullYear()} © MyShow. All Right Reserved
      </p>

    </footer>
  )
}

export default Footer