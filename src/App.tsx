import React, { useState } from 'react';
import Carousel, { CarouselCell } from './components/Carousel/Carousel';

function App() {
    const [count, setCount] = useState(0);
    const cards = [
        {
            title: 'prozac',
            desc: 'Saturday past posting sexually drawings described long, ricky attempt shapes fail invest kruger switches, cluster fame. '
        },
        {
            title: 'arguments',
            desc: 'Agent walnut brazil viral belong incidence facts, probability disclose eleven dust airplane switch royalty, corruption realty gps watt intent refine.'
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
        }];

    return (
        <div className={`App flex flex-col justify-center min-h-screen`}>
            <Carousel cards={cards} limit={[3, 2]}>
                <CarouselCell>
                    <h1>warrant</h1>
                    <p>Spots girls nicholas reducing ping windsor undo, ill accounting captain american consequences
                        procedures subdivision, marina neo cooling called witnesses refrigerator children, clicking
                        nowhere nano nikon acquired tunnel clubs, flood. </p>
                </CarouselCell>
                <CarouselCell>
                    <h1>sims</h1>
                    <h2>honolulu</h2>
                    <p>Leeds elliott peripheral photographic yukon check plugins, parties mali automatic penny leave
                        assessment critics, immunology distances employer rocket passwords. </p>
                </CarouselCell>
                <CarouselCell>
                    <h1>comparison</h1>
                    <p>Aus prediction contributing essence buying hans brisbane, shannon. </p>
                    <h2>tied</h2>

                </CarouselCell>
                <CarouselCell>
                    <h1>members</h1>
                    <p>Attorney narrow blonde keeps educators fallen garlic, previous smile aquatic pace queue spoke
                        lessons, mpg plastic deutschland hypothetical atmospheric templates. </p>
                </CarouselCell>
                <CarouselCell>
                    <h1>surface</h1>
                    <h4>Sans St 111, Glen Haven, Kuwait, 821325</h4>
                    <p>Certain contracts examples systems mandatory geology doctors, telephony extensive musicians fit
                        given established knit, resulted sensor christina bigger bangkok typically effects,
                        responsibilities translations. </p>
                </CarouselCell>
                <CarouselCell>
                    <h1>offshore</h1>
                    <p>Guarantee von knock dennis life applied active, beef heroes lyric permissions lovers iraqi
                        danish, judgment field apparently restaurants muslim surgical. </p>
                </CarouselCell>
                <CarouselCell>
                    <h1>members</h1>
                    <p>Attorney narrow blonde keeps educators fallen garlic, previous smile aquatic pace queue spoke
                        lessons, mpg plastic deutschland hypothetical atmospheric templates. </p>
                </CarouselCell>
                <CarouselCell>
                    <h1>surface</h1>
                    <h4>Sans St 111, Glen Haven, Kuwait, 821325</h4>
                    <p>Certain contracts examples systems mandatory geology doctors, telephony extensive musicians fit
                        given established knit, resulted sensor christina bigger bangkok typically effects,
                        responsibilities translations. </p>
                </CarouselCell>
                <CarouselCell>
                    <h1>offshore</h1>
                    <p>Guarantee von knock dennis life applied active, beef heroes lyric permissions lovers iraqi
                        danish, judgment field apparently restaurants muslim surgical. </p>
                </CarouselCell>
            </Carousel>
        </div>
    );
}

export default App;
