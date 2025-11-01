import { Route, Routes, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import Movies from "./pages/Movies"
import MoviesDetails from "./pages/MoviesDetails"
import SeatLayout from "./pages/SeatLayout"
import MyBookings from "./pages/MyBookings"
import Favorite from "./pages/Favorite"
import { Toaster } from "react-hot-toast";

function App() {

  const isAdminRoute = useLocation().pathname.startsWith('/admin')
  

  return (
    <>
      <Toaster />

      { !isAdminRoute && <Navbar />}

      <Routes>
        <Route path="/" element={ < HomePage />} />
        <Route path="/movies" element={ < Movies />} />
        <Route path="/movies/:id" element={ < MoviesDetails />} />
        <Route path="/movies/:id/date" element={ < SeatLayout />} />
        <Route path="/my-bookings" element={ < MyBookings />} />
        <Route path='/favorite' element={ < Favorite />} />
        
      </Routes>

      { !isAdminRoute && <Footer />}
      
    </>
  )
}

export default App
