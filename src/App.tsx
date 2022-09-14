import React, { useContext, useEffect, useState } from 'react';
import Carousel from './components/Carousel/Carousel';
import MovieCard from './components/MovieCard/MovieCard';
import { useMutation, useQueries, useQuery } from 'react-query';
import ThemeSwitcher from './components/ThemeSwitcher/ThemeSwitcher';
import MovieModal from './components/MovieModal/MovieModal';
import {
    getMoviesByGenre,
    getPopularMovies,
    searchMovies,
} from './utils/fetches';
import LoadingPage from './components/LoadingPage/LoadingPage';
import { MovieListContext } from './context/movieListContext';
import GlobalInfoModal from './components/GlobalInfoModal/GlobalInfoModal';
import { ModalContext } from './context/modalContext';
import { AnimatePresence, motion } from 'framer-motion';
import SearchBar from './components/SearchBar/SearchBar';
import { Movie } from './types/Movie';
import Nav from './components/Nav/Nav';
import _ from 'lodash';

function App() {
    const [selectedMovie, setSelectedMovie] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchResults, setSearchResults] = useState<Array<Movie>>();
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
            <Nav
                onSearch={async (search) => {
                    if (search === '') return;
                    setSearchResults(await searchMovies(search));
                }}
            />
            <AnimatePresence exitBeforeEnter>
                {isOpen && <GlobalInfoModal />}
            </AnimatePresence>
            <div className={`App flex min-h-screen flex-col overflow-hidden`}>
                {selectedMovie && (
                    <MovieModal
                        movie={{
                            ...selectedMovie,
                        }}
                        isOpen={isModalOpen}
                        setIsOpen={setIsModalOpen}
                    />
                )}

                <AnimatePresence>
                    {searchResults && searchResults.length > 0 && (
                        <motion.div
                            key={JSON.stringify(searchResults)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Carousel
                                caption={`Search Results`}
                                gap={`1rem`}
                                className={`min-h-[100px] pb-5`}
                            >
                                {searchResults.map((card: any, idx) => (
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
                        </motion.div>
                    )}
                </AnimatePresence>

                {!_.isEmpty(movieList) && (
                    <Carousel
                        caption={`Your Movie List`}
                        gap={`1rem`}
                        className={`min-h-[100px] pb-5`}
                    >
                        {movieList.map((card, idx) => (
                            <MovieCard
                                movie={{
                                    ...card,
                                    poster: card.backdrop as string,
                                }}
                                key={idx}
                                onClick={() => {
                                    setSelectedMovie(card);
                                    setIsModalOpen(true);
                                }}
                                className={`md:h-[300px] md:w-[500px]`}
                            />
                        ))}
                    </Carousel>
                )}

                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {movies.map((res, idx) => (
                        <Carousel
                            key={idx}
                            caption={res.data?.caption}
                            gap={`1rem`}
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
                </motion.section>
            </div>
        </>
    );
}

export default App;
