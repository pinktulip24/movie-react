import { useParams, NavLink, Outlet, useLocation, Link} from 'react-router-dom';
import { useEffect, useState, Suspense } from 'react';
import { Loader } from '../common/Loader';
import { Error } from '../common/Error';
import { fetchMovie } from '../Request';
import css from './MovieItem.module.css';

const MovieItem = () => {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const location = useLocation();

  useEffect(() => {
    fetchMovie(movieId)
      .then(response => {
        if (response.success === false) {
          setMovieData(null);
          setNotFound(true);
        } else {
          setMovieData(response);
        }
      })
      .catch(err => {
        console.log(err);
        setHasError(true);
      })
      .finally(() => {
        setIsloading(false);
      });
  }, [movieId]);
  return (
    <div className="container">
      <Link to={location?.state?.from ?? '/'}
      className="btn btn-light mb-3 mt-1">
      {'\u2190'} Go Back
      </Link>
      {isLoading && <Loader />}
      {hasError && <Error />}
      {notFound && <h1>Requested movie does not exist</h1>}
      {movieData && (
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4 d-flex justify-content-center align-items-center d-md-block">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`}
                alt="Movie Poster"
                className={`img-fluid rounded-start ${css['custom-img-size']} `}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h4 className="card-title fs-2 fw-bold pb-3">
                  {movieData.title ?? 'Unknown'}
                  <span>({movieData.release_date.split('-')[0]})</span>
                </h4>
                <p className="card-text pb-2"> User score:
                  <span className="card-text fw-light"> {(movieData.vote_average * 10).toFixed(0)}% </span>
                </p>
                <p className="card-text fs-6 fw-bold">Overview:</p>
                <span className="card-text fw-light pt-1"> {movieData.overview}</span>
                <p className="card-text fs-6 fw-bold mt-4">Genres:</p>
                {movieData.genres && movieData.genres.length > 0 && (
                  <span className="card-text fw-light"> {movieData.genres.map(genre => genre.name).join(', ')}</span>
                )}
              </div>
            </div>
            <div className="col-md-12">
              <div className="card-body">
                <h4 className="card-title fs-4 fw-bold p-3"> Additional information: </h4>
                <ul className="nav col-12 col-lg-auto me-lg-auto gap-5 pb-3 mb-3">
                  <li>
                    <NavLink
                      className="nav-link px-3 mx-2 text-dark border btn btn-hover btn-info"
                      to="cast"
                      state={{ from: location?.state?.from ?? '/' }} 
                    > Cast 
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="nav-link px-3 text-dark border btn btn-hover btn-info"
                      to="reviews"
                      state={{ from: location?.state?.from ?? '/' }} 
                    > Reviews 
                    </NavLink>
                  </li>
                </ul>
                <Suspense fallback={<Loader />}>
                  <Outlet />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieItem;
