import { TMDB, GENRES } from '../consts';
import { Movie } from '../../types/Movie';

export const getPopularMovies = (): Promise<any> => {
    return fetch(`${TMDB.API_URL}/movie/top_rated?api_key=${TMDB.API_KEY}`)
        .then((res) => res.json())
        .then((data) =>
            data.results.map(
                (movie: any) =>
                    ({
                        id: movie.id,
                        title: movie.title,
                        desc: movie.overview,
                        backdrop: `${TMDB.IMAGE_URL}/${movie.backdrop_path}`,
                        poster: `${TMDB.IMAGE_URL}/${movie.poster_path}`,
                    } as Movie)
            )
        );
};

export const getMoviesByGenre = (genre: string): Promise<any> => {
    const genreId = GENRES.filter((i) => i.name === genre)[0].id;
    return fetch(
        `${TMDB.API_URL}/discover/movie?api_key=${TMDB.API_KEY}&with_genres=${genreId}`
    )
        .then((res) => res.json())
        .then((data) =>
            data.results.map(
                (movie: any) =>
                    ({
                        id: movie.id,
                        title: movie.title,
                        desc: movie.overview,
                        backdrop: `${TMDB.IMAGE_URL}/${movie.backdrop_path}`,
                        poster: `${TMDB.IMAGE_URL}/${movie.poster_path}`,
                    } as Movie)
            )
        );
};

export const getCastDetails = (id: number): Promise<any> => {
    console.log('getCastDetails', id);
    return fetch(`${TMDB.API_URL}/movie/${id}/credits?api_key=${TMDB.API_KEY}`)
        .then((res) => res.json())
        .then((data) => data);
};
