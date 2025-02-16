
const url = 'https://api.themoviedb.org/3/';
const key = '44cd7d40e9c9ffc80f6b2e51bac6d9ee'; 

export const fetchTrending = () => {
  return fetch(`${url}trending/movie/day?api_key=${key}`).then(res => res.json());
}

export const fetchMovie = (id) => {
  return fetch(`${url}movie/${id}?api_key=${key}`).then(res => res.json());
} 

export const fetchCast = (id) => {
  return fetch(`${url}movie/${id}/credits?api_key=${key}`).then(res => res.json());
}

export const fetchReview = (id) => {
  return fetch(`${url}movie/${id}/reviews?api_key=${key}`).then(res => res.json());
}

export const fetchSearch = (query) => {
  return fetch(`${url}search/movie?page=1&api_key=${key}&query=${query}`).then(res => res.json())
}
 
