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
import Dashboard from "./pages/admin/Dashboard"
import Layout from "./pages/admin/Layout"
import AddShows from "./pages/admin/AddShows"
import ListShows from "./pages/admin/ListShows"
import ListBookings from "./pages/admin/ListBookings"
import { useAppContext } from "./context/AppContext"
import { SignIn } from "@clerk/clerk-react"
import Loading from "./components/Loading"

function App() {

  // Around 9 hr stripe webhook url

  const isAdminRoute = useLocation().pathname.startsWith('/admin');

  const { user } = useAppContext();

  return (
    <>
      <Toaster />

      { !isAdminRoute && <Navbar />}

      <Routes>
        <Route path="/" element={ < HomePage />} />
        <Route path="/movies" element={ < Movies />} />
        <Route path="/movies/:id" element={ < MoviesDetails />} />
        <Route path="/movies/:id/:date" element={ < SeatLayout />} />
        <Route path="/my-bookings" element={ < MyBookings />} />
        <Route path="/loading/:nextUrl" element={ < Loading />} />
        <Route path='/favorite' element={ < Favorite />} />

        <Route path='/admin/*' element={ user ? < Layout /> : (
          <div className="min-h-screen flex justify-center items-center">
            <SignIn fallbackRedirectUrl = {'/admin'} />
          </div>
        )} >
          <Route index element={< Dashboard />} />
          <Route path="add-shows" element={< AddShows />} />
          <Route path="list-shows" element={< ListShows />} />
          <Route path="list-bookings" element={< ListBookings />} />
        </Route>
        
      </Routes>

      { !isAdminRoute && <Footer />}
      
    </>
  )
}

export default App
