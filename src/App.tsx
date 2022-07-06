import React, { useEffect, useState } from 'react';
import Carousel from './components/Carousel/Carousel';
import MovieCard from './components/MovieCard/MovieCard';
import { useQuery } from 'react-query';
import ThemeSwitcher from './components/ThemeSwitcher/ThemeSwitcher';
import { Movie } from './types/Movie';
import MovieModal from './components/MovieModal/MovieModal';

function App() {
    const [count, setCount] = useState(0);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const API_KEY = import.meta.env.VITE_TMDB_KEY;
    const { isLoading, error, data } = useQuery('topRatedMovies', () =>
        fetch(
            `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
        ).then((res) => res.json())
    );

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    // Hardcoding response to limit API Calls

    return (
        <div
            className={`App flex flex-col overflow-hidden bg-gray-100 p-3 text-gray-900 transition-colors dark:bg-gray-900 dark:text-gray-100`}
        >
            {selectedMovie && (
                <MovieModal
                    movie={{
                        title: selectedMovie!.title,
                        desc: selectedMovie!.overview,
                        poster: `https://image.tmdb.org/t/p/original${
                            selectedMovie!.poster_path
                        }`,
                    }}
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                />
            )}
            <ThemeSwitcher />
            {/*<Modal title={'test'}/>*/}
            <h1>Hello</h1>
            <Carousel gap={`1rem`}>
                {data?.results
                    // ?.filter((_, idx) => idx < 10)
                    .map((card: any) => {
                        return (
                            <MovieCard
                                title={card.title}
                                desc={card.desc}
                                poster={`https://image.tmdb.org/t/p/original/${card.poster_path}`}
                                key={card.id}
                                onClick={() => {
                                    setSelectedMovie(card);
                                    setIsModalOpen(true);
                                }}
                            />
                        );
                    })}
            </Carousel>
        </div>
    );
}

export default App;
