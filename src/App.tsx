import React, { useContext, useEffect, useState } from 'react';
import Carousel from './components/Carousel/Carousel';
import MovieCard from './components/MovieCard/MovieCard';
import { useMutation, useQueries, useQuery } from 'react-query';
import ThemeSwitcher from './components/ThemeSwitcher/ThemeSwitcher';
import MovieModal from './components/MovieModal/MovieModal';
import { getMoviesByGenre, getPopularMovies } from './utils/fetches';
import LoadingPage from './components/LoadingPage/LoadingPage';
import { MovieListContext } from './context/movieListContext';
import GlobalInfoModal from './components/GlobalInfoModal/GlobalInfoModal';
import { ModalContext } from './context/modalContext';
import { AnimatePresence } from 'framer-motion';

function App() {
    const [selectedMovie, setSelectedMovie] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const GENRES_TO_SHOW = [
        'Thriller',
        'Mystery',
        'Action',
        'Comedy',
        'Adventure',
        'Drama',
        'Horror',
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
    const { isOpen } = useContext(ModalContext);

    if (movies.some((m) => m.isLoading)) {
        return <LoadingPage />;
    }

    return (
        <>
            <AnimatePresence exitBeforeEnter>
                {isOpen && <GlobalInfoModal />}
            </AnimatePresence>
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
                                movie={card}
                                key={card.id}
                                onClick={() => {
                                    setSelectedMovie(card);
                                    setIsModalOpen(true);
                                }}
                            />
                        ))}
                    </Carousel>
                ))}
                {movieList.length > 0 && (
                    <Carousel
                        caption={`Your Movie List`}
                        gap={`1rem`}
                        className={`min-h-[100px] pb-5`}
                    >
                        {movieList.map((card: any, idx) => (
                            <MovieCard
                                movie={card}
                                key={idx}
                                onClick={() => {
                                    setSelectedMovie(card);
                                    setIsModalOpen(true);
                                }}
                            />
                        ))}
                    </Carousel>
                )}
            </div>
        </>
    );
}

export default App;
