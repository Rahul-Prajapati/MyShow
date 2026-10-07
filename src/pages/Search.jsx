// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import MovieCard from "../components/MovieCard";
// import Pagination from "../components/Pagination";

// const Search = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const query = searchParams.get("q");
//   const page = Number(searchParams.get("page")) || 1;

//   const [movies, setMovies] = useState([]);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     if (!query) return;

//     fetch(`${API_BASE}/search?query=${query}&page=${page}`)
//       .then(res => res.json())
//       .then(data => {
//         setMovies(data.results || []);
//         setTotalPages(data.total_pages || 1);
//       });
//   }, [query, page]);

//   return (
//     <>
//       <h2>Search Results for "{query}"</h2>

//       <div className="movie-grid">
//         {movies.map(movie => (
//           <MovieCard key={movie.id} movie={movie} />
//         ))}
//       </div>

//       <Pagination
//         page={page}
//         totalPages={totalPages}
//         onPageChange={(p) =>
//           setSearchParams({ q: query, page: p })
//         }
//       />
//     </>
//   );
// };

// export default Search;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState([]);

  const navigate = useNavigate();

  // ✅ Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      console.log("Debounce is fired!")
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // ✅ Fetch when debounced query updates
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }

    const fetchMovies = async () => {
      try {
        // const res = await fetch(
        //   `https://api.themoviedb.org/3/search/movie?api_key=${
        //     import.meta.env.VITE_TMDB_API_KEY
        //   }&query=${debouncedQuery}&page=1`
        // );

        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${debouncedQuery}&page=1`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`, 
              accept: "application/json",
            },
          }
        );
    

        const data = await res.json();
        setResults(data.results?.slice(0, 5) || []);
      } catch (error) {
        console.error("Search error:", error);
      }
    };

    fetchMovies();
  }, [debouncedQuery]);

  return (
    <div className="relative w-64 max-md:hidden">
      <input
        type="text"
        placeholder="Search movies.."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 rounded-full bg-white/10 border border-gray-300/20 text-white outline-none"
      />

      {/* Dropdown */}
      {results.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-black/90 backdrop-blur rounded-md mt-2 shadow-lg z-50">
          {results.map((movie) => (
            <div
              key={movie.id}
              onClick={() => {
                navigate(`/movies/${movie.id}`);
                setQuery("");
                setResults([]);
              }}
              className="px-4 py-2 text-sm text-white hover:bg-white/10 cursor-pointer"
            >
              {movie.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
