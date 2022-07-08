import React, { useEffect, useState } from 'react';
import Carousel from './components/Carousel/Carousel';
import MovieCard from './components/MovieCard/MovieCard';
import { useQueries, useQuery } from 'react-query';
import ThemeSwitcher from './components/ThemeSwitcher/ThemeSwitcher';
import MovieModal from './components/MovieModal/MovieModal';
import { getMoviesByGenre, getPopularMovies } from './utils/fetches';

function App() {
    const [count, setCount] = useState(0);
    const [selectedMovie, setSelectedMovie] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const GENRES_TO_SHOW = [
        'Horror',
        'Thriller',
        'Mystery',
        'Action',
        'Adventure',
        'Comedy',
        'Drama',
    ];
    const movies = useQueries([
        {
            queryKey: 'popularMovies',
            queryFn: async () => ({
                caption: 'Top Rated Movies',
                results: [...(await getPopularMovies())],
            }),
        },
        ...GENRES_TO_SHOW.map((genre) => ({
            queryKey: genre,
            queryFn: async () => ({
                caption: genre,
                results: [...(await getMoviesByGenre(genre))],
            }),
        })),
    ]);

    if (movies.some((m) => m.isLoading)) {
        return <h1>Loading...</h1>;
    }

    // Hardcoding response to limit API Calls

    return (
        <div
            className={`App flex min-h-screen flex-col overflow-hidden bg-gray-100
             p-3 text-gray-900 transition-colors dark:bg-gray-900 dark:text-gray-100`}
        >
            {selectedMovie && (
                <MovieModal
                    movie={{
                        ...selectedMovie,
                    }}
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                />
            )}
            <ThemeSwitcher />
            {/*<Modal title={'test'}/>*/}
            <h1>Hello</h1>
            {movies.map((res) => (
                <Carousel
                    gap={`1rem`}
                    caption={res.data!.caption}
                    key={res.data!.caption}
                    className={`pb-5`}
                >
                    {res.data!.results.map((card: any) => (
                        <MovieCard
                            title={card.title}
                            poster={card.poster}
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
