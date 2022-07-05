import React from 'react';
import { Movie } from '../../types/Movie';

type MovieCardProps = {
    movie: Movie;
};

const MovieCard = ({ movie }: MovieCardProps) => {
    return (
        <div
            className={`prose relative flex-shrink-0 bg-cover`}
            style={{
                backgroundImage: `url('${movie.poster}')`,
            }}
        >
            <h1>{movie.title}</h1>
            <p>{movie.desc}</p>
        </div>
    );
};

export default MovieCard;
