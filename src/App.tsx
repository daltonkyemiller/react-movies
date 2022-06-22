import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Carousel from './components/Carousel';

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="App">
            <Carousel limit={2} cards={[
                {
                    title: 'prozac',
                    desc: 'Saturday past posting sexually drawings described long, ricky attempt shapes fail invest kruger switches, cluster fame. '
                },
                {
                    title: 'arguments',
                    desc: 'Agent walnut brazil viral belong incidence facts, probability disclose eleven dust airplane switch royalty, corruption realty gps watt intent refine. '
                },
                {
                    title: 'zum',
                    desc: 'Continental jessica solaris connecting guaranteed samuel kills, commerce apparent chat pam transport obtained classics. '
                },
                {
                    title: 'grid',
                    desc: 'Radar senate supervisors extension technology rental academic, yoga neither mineral warned order. '
                },
                {
                    title: 'worry',
                    desc: 'Hill weapons finances cluster concerns refugees tablets, updating possess considered dans clips walker notion, incidence competing. '
                },
                {
                    title: 'activation',
                    desc: 'Lesbians guarantee establish shareholders senator regarding dept, matters contemporary programmer ring banking parliament tested, resorts constitution shanghai drill converter publication roll, unavailable marina weird cornwall effectively evidence. '
                }
            ]}/>

        </div>
    );
}

export default App;
