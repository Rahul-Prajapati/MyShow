import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

const Releases = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // console.log(" Process: data:-- ",process.env.REACT_APP_API_BASE);

  useEffect(() => {
    //fetch(`${process.env.REACT_APP_API_BASE}/releases?page=${page}`)
    // fetch(`https://api.themoviedb.org/3/releases?page=${page}`)
    // fetch(`https://api.themoviedb.org/3/movie/upcoming?page=${page}`)
    fetch(`/api/movie/upcoming?page=${page}`)
      .then(res => res.json())
      .then(data => {
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
      });
  }, [page]);

  return (
    <>
    <div className='relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]'>
      <h2>Upcoming Releases</h2>

      <div className="movie-grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      </div>
    </>
  );
};

export default Releases;
