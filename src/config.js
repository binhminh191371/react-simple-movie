export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const originalImg = "https://image.tmdb.org/t/p/original";
export const apiKey = "f6ee39be5698e845cff473dedda4c852";
export const tmdbEndPoint = "https://api.themoviedb.org/3/movie";
export const movieSearch = "https://api.themoviedb.org/3/search/movie"

export const tmdbAPI = {
  getMovieList: (type) => ` ${tmdbEndPoint}/${type}?api_key=${apiKey}`,
  getMoiveDetail:(movieId) => ` ${tmdbEndPoint}/${movieId}?api_key=${apiKey}`,
  getMovieMeta:(movieId,type) => `${tmdbEndPoint}/${movieId}/${type}?api_key=${apiKey}`,
 getNextPage:(nextPage,type)=> ` ${tmdbEndPoint}/${type}?api_key=${apiKey}&page=${nextPage}`,
 getMovieSearch:(fillterDebounce,nextPage) =>  ` ${movieSearch}?api_key=${apiKey}&query=${fillterDebounce}&page=${nextPage}`
};
