import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Game from '../../Game/Game';
import Loading from '../../Loading/Loading';

export default function Browser() {

    let [games, setGames] = useState([]);

    let options = {
        method: 'GET',
        url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
        params: { platform: 'pc' },
        headers: {
            'X-RapidAPI-Key': 'e93e82b48emsh26c7d1665e7d90fp189215jsn4ede803585b9',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    let getGames = async () => {
        let { data } = await axios.request(options)
        // console.log(data);
        setGames(data);

    }

    useEffect(() => {
        getGames();
    }, [])

    let [start, setStart] = useState(0);
    let [end, setEnd] = useState(20);

    let seeMore = () => {
        setStart(start);
        setEnd(end + 20);
    }

    return (
        <>
            <Helmet>
                <title>Platform: Browser</title>
            </Helmet>

            {games.length > 0 ? <div className="container mt-5 pt-5">
                <div className="row g-4 justify-content-center">
                    {games.slice(start, end).map((game, index) =>
                        <Game
                            id={game.id}
                            key={index}
                            gameImage={game.thumbnail}
                            gameTitle={game.title}
                            gameDesc={game.short_description}
                            genre={game.genre}
                        />
                    )}
                    <div className='text-center'><a onClick={seeMore} className='btn btn-outline-light my-5'>More Games</a></div>
                </div>
            </div> : <Loading />}
        </>
    )
}
