import React, { PropsWithChildren, useEffect } from 'react';
import { Movie } from '../types/Movie';

type MovieListContextType = {
    movies: Movie[];
    addMovie?: (movie: Movie) => void;
    removeMovie?: (movieId: Movie) => void;
    isInList?: (movieId: number) => boolean;
};

export const MovieListContext = React.createContext<MovieListContextType>({
    movies: [],
});

export const MovieListProvider = ({ children }: PropsWithChildren) => {
    const [movies, setMovies] = React.useState<MovieListContextType['movies']>(
        []
    );

    useEffect(() => {
        const localMovies = JSON.parse(
            localStorage.getItem('movies') as string
        );

        if (localMovies) setMovies(localMovies);
    }, []);

    const _setMovies = (movies: MovieListContextType['movies']) => {
        setMovies(movies);
        localStorage.setItem('movies', JSON.stringify(movies));
    };

    const addMovie: MovieListContextType['addMovie'] = (movie) => {
        if (movies.some((m) => m.id === movie.id)) return;
        const newMovies = [...movies, movie];
        _setMovies(newMovies);
    };

    const removeMovie: MovieListContextType['removeMovie'] = (movie) => {
        const newMovies = movies.filter((m) => m.id !== movie.id);
        _setMovies(newMovies);
    };

    const isInList = (movieId: number) => {
        return movies.some((m) => m.id === movieId);
    };

    return (
        <MovieListContext.Provider
            value={{ movies, addMovie, removeMovie, isInList }}
        >
            {children}
        </MovieListContext.Provider>
    );
};
