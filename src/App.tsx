import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Carousel from './components/Carousel';

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="App">
            <Carousel limit={3}>
                {[1, 2, 3, 4, 5, 6].map(el => (
                    <div className={`prose min-w-[50%]`} key={el}>
                        <h1>{el}</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat
                            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                ))}

            </Carousel>

        </div>
    );
}

export default App;
