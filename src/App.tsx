import React, { useEffect, useState } from 'react';
import Carousel from './components/Carousel/Carousel';
import MovieCard from './components/MovieCard/MovieCard';
import { useQueries, useQuery } from 'react-query';
import ThemeSwitcher from './components/ThemeSwitcher/ThemeSwitcher';
import { Movie } from './types/Movie';
import MovieModal from './components/MovieModal/MovieModal';
import { getMoviesByGenre, getPopularMovies } from './utils/fetches';
import { TMDB_IMAGE_URL } from './utils/consts';

function App() {
    const [count, setCount] = useState(0);
    const [selectedMovie, setSelectedMovie] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const GENRES_TO_SHOW = ['Horror', 'Action', 'Adventure', 'Comedy', 'Drama'];
    const movies = useQueries([
        {
            queryKey: 'popularMovies',
            queryFn: async () => ({
                caption: 'Popular Movies',
                ...(await getPopularMovies()),
            }),
        },
        ...GENRES_TO_SHOW.map((genre) => ({
            queryKey: genre,
            queryFn: async () => ({
                caption: genre,
                ...(await getMoviesByGenre(genre)),
            }),
        })),
    ]);
    console.log(movies);

    if (movies.some((m) => m.isLoading)) {
        return <h1>Loading...</h1>;
    }

    // Hardcoding response to limit API Calls

    return (
        <div
            className={`App flex min-h-screen flex-col overflow-hidden bg-gray-100 p-3 text-gray-900 transition-colors dark:bg-gray-900 dark:text-gray-100`}
        >
            {selectedMovie && (
                <MovieModal
                    movie={{
                        title: selectedMovie!.title,
                        desc: selectedMovie!.overview,
                        poster: selectedMovie!.poster_path,
                        backdrop: selectedMovie!.backdrop_path,
                    }}
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                />
            )}
            <ThemeSwitcher />
            {/*<Modal title={'test'}/>*/}
            <h1>Hello</h1>
            {movies.map((res) => (
                <Carousel gap={`1rem`} caption={res.data.caption}>
                    {res.data.results.map((card: any) => (
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
                    ))}
                </Carousel>
            ))}
        </div>
    );
}

export default App;
