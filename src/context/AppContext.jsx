import { createContext, useContext, useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from 'axios';
import {toast} from 'react-hot-toast'
import { useLocation, useNavigate } from "react-router-dom";

export const AppContext = createContext()

export const AppProvider = ({ children }) => {

    const [isAdmin, setIsAdmin] = useState(false);
    const [Shows, setShows] = useState([]);
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    const image_base_url = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

    const { user } = useUser();
    const {getToken} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const fetchIsAdmin = async () => {
        try {
            const { data } = await axios.get('/api/admin/is-admin', 
            {headers : {
                Authorization : `Bearer ${await getToken()}`
            }})
            setIsAdmin(data.isAdmin)

            if(!data.isAdmin && location.pathname.startsWidth('/admin')){
                navigate('/')
                toast.error('You are not authorized to access admin dashboard');
            }
        } catch (error) {
            console.error(error)
        }
    }

    const fetchShows = async ()=> {
        try {
            const { data } = await axios.get('/api/show/all')
            if(data.success){
                setShows(data.Shows)
            } else{
                toast.error(data.message || "Data is not available");
            }
        } catch(error){
            console.error(error)
        }
    }

    const fetchFavoriteMovies = async ()=> {
        try {
            const { data } = await axios.get('/api/user/favorite', {
                headers: {
                    Authorization:`Bearer ${await getToken()}`
                }
            })
            if(data.success){
                setFavoriteMovies(data.movies);
            } else{
                toast.error(data.message);
            }
        } catch(error){
            console.error(error)
        }
    }

    useEffect(()=>{
        if(user){
            fetchIsAdmin()
            fetchFavoriteMovies()
        }
    },[])

    useEffect(()=>{
            fetchShows();
    },[])


    const value = {
        axios, 
        fetchIsAdmin,
        user,
        getToken,
        navigate,
        isAdmin,
        Shows,
        favoriteMovies,
        fetchFavoriteMovies,
        image_base_url
    }

    return (
        <AppContext.Provider value={value}>
            { children }
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext) 