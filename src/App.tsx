import React, { useContext, useEffect, useState } from 'react';
import Carousel from './components/Carousel/Carousel';
import MovieCard from './components/MovieCard/MovieCard';
import { useMutation, useQueries, useQuery } from 'react-query';
import ThemeSwitcher from './components/ThemeSwitcher/ThemeSwitcher';
import MovieModal from './components/MovieModal/MovieModal';
import {
    getMovieById,
    getMoviesByGenre,
    getPopularMovies,
} from './utils/fetches';
import LoadingPage from './components/LoadingPage/LoadingPage';
import Nav from './components/Nav/Nav';
import { MovieListContext } from './context/movieListContext';

function App() {
    const [selectedMovie, setSelectedMovie] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const GENRES_TO_SHOW = [
        'Horror',
        // 'Thriller',
        // 'Mystery',
        // 'Action',
        // 'Comedy',
        // 'Adventure',
        // 'Drama',
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

    const { movies: movieList } = useContext(MovieListContext);

    if (movies.some((m) => m.isLoading)) {
        return <LoadingPage />;
    }

    return (
        <>
            <Nav />
            <div
                className={`App flex min-h-screen flex-col overflow-hidden bg-gray-100 p-4
                text-gray-900 transition-colors dark:bg-gray-900 dark:text-gray-100`}
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
                {movies.map((res, idx) => (
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
                                desc={card.desc}
                                key={card.id}
                                onClick={() => {
                                    setSelectedMovie(card);
                                    setIsModalOpen(true);
                                }}
                            />
                        ))}
                    </Carousel>
                ))}
                <Carousel
                    caption={`Your Movie List`}
                    gap={`1rem`}
                    className={`pb-5`}
                >
                    {movieList.map((card: any) => (
                        <MovieCard
                            title={card.title}
                            poster={card.poster}
                            desc={card.desc}
                            key={card.id}
                            onClick={() => {
                                setSelectedMovie(card);
                                setIsModalOpen(true);
                            }}
                        />
                    ))}
                </Carousel>
            </div>
        </>
    );
}

export default App;
