import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loader } from '../common/Loader';
import { Error } from '../common/Error';
import { fetchCast } from '../Request';
import css from './Cast.module.css';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetchCast(movieId)
      .then(response => {
        if (response.cast && response.cast.length > 0) {
          setCast(response.cast);
          setNotFound(false);
        } else {
          setCast([]);
          setNotFound(true);
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
      {isLoading && <Loader />}
      {hasError && <Error />}
      {notFound && <h1>Requested movie does not exist</h1>}
      {cast && cast.length > 0 && (
        <div className="row row-cols-1 row-cols-lg-5 g-4">
          {cast.map(actor => (
            <div key={actor.id}>
              {actor.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={`${actor.name}`}
                />
              ) : (
                <img
                  className={css.image}
                  src={`https://www.freeiconspng.com/uploads/no-image-icon-11.PNG`}
                  alt={`${actor.name}`}
                />
              )}
              <p className="fw-bold fs-5 pt-2">{actor.name}</p>
              <p className="fst-italic fs-6">Character:
                <span className="fw-bold fs-6 text-info p-2">{actor.character}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Cast;
