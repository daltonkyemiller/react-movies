import React, { useState } from 'react';
import Carousel, { CarouselCell } from './components/Carousel/Carousel';
import MovieCard from './components/MovieCard/MovieCard';
import { useQuery } from 'react-query';


function App() {
    const [count, setCount] = useState(0);
    const API_KEY = import.meta.env.VITE_TMDB_KEY;
    const {isLoading, error, data} = useQuery('topRatedMovies', () =>
        fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`).then(res => res.json())
    );

    if (isLoading) {
        return (<h1>Loading...</h1>);
    }


    return (
        <div className={`App flex flex-col justify-center min-h-screen`}>
            <Carousel>
                {
                    data?.results?.map((card: any) => (
                        <CarouselCell className={`p-1`} key={card.id}>
                            <MovieCard title={card.title}
                                       desc={card.overview}
                                       poster={`https://image.tmdb.org/t/p/original/${card.poster_path}`}/>
                        </CarouselCell>
                    ))
                }
            </Carousel>
            <Carousel>
                {
                    data?.results?.map((card: any) => (
                        <CarouselCell className={`p-1`} key={card.id}>
                            <MovieCard title={card.title}
                                       desc={card.overview}
                                       poster={`https://image.tmdb.org/t/p/original/${card.poster_path}`}/>
                        </CarouselCell>
                    ))
                }
            </Carousel>
        </div>
    );
}

export default App;
