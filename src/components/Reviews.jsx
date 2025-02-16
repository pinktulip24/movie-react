import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loader } from './common/Loader';
import { Error } from './common/Error';
import { fetchReview } from './Request';  

const Reviews = () => {
    const {movieId } = useParams();
    const [reviews, setReviews] = useState(null);
    const [isLoading, setIsloading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        fetchReview(movieId)
          .then(response => {
            if (response.results && response.results.length > 0) {
              setReviews(response.results);
              setNotFound(false);
            } else {
              setReviews([]);  
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
      {notFound && <h5>We don't have reviews. </h5>}
      {reviews && reviews.length > 0 && (
         <div>
            {reviews.map(review => (
              <div key={review.id} >   
              <p className="fw-light fw-bold pt-2">Author: <span className="text-info fs-6">{review.author}</span></p>
              <p className="fst-italic">{review.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Reviews;