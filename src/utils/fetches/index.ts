import { API_KEY, GENRES } from '../consts';

export const getPopularMovies = async (): Promise<any> => {
    return await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
    ).then((res) => res.json());
};

export const getMoviesByGenre = (genre: string): Promise<any> => {
    const genreId = GENRES.filter((i) => i.name === genre)[0].id;
    return fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
    ).then((res) => res.json());
};
