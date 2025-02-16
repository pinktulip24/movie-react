import { Link, useLocation } from 'react-router-dom';

export const MovieList = ({ movies, showTitle = true }) => {
  const location = useLocation();
  return (
    <div className="container">
      {showTitle && <h1 className="p-2 mt-3 mb-3">Trending Today</h1>}
      {movies.length > 0 &&
        movies.map(movie => {
          return (
            <Link
              key={movie.id}
              to={`/movies/${movie.id}`}
              state={{ from: location }}
              className="text-decoration-none"
            >
              <ul className="list-group">
                <li className="list-group-item">{movie.title}</li>
              </ul>
            </Link>
          );
        })}
    </div>
  );
};
