import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

const Theatre = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // fetch(`${BASE_URL}/theatre?page=${page}`)
    fetch(`https://api.themoviedb.org/3/theatre?page=${page}`)
      .then(res => res.json())
      .then(data => {
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
      });
  }, [page]);

  return (
    <>
    <div className='relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]'>
      <h2>Now Playing in Theatres</h2>

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

export default Theatre;
