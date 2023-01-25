import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Game from '../Game/Game';
import Loading from '../Loading/Loading';
import styles from './Home.module.css';



export default function Home() {


  let [games, setGames] = useState({});
  const options = {
    method: 'GET',
    url: 'https://free-to-play-games-database.p.rapidapi.com/api/filter',
    params: { tag: '3d.mmorpg.fantasy.pvp', platform: 'pc' },
    headers: {
      'X-RapidAPI-Key': 'e93e82b48emsh26c7d1665e7d90fp189215jsn4ede803585b9',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };

  let getGames = async () => {

    let { data } = await axios.request(options)
    // console.log(data)
    setGames(data)
  }

  useEffect(() => {

    getGames();
  }, [])



  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      {(games.length > 0) ? <section className='mt-5'>
        <div className='d-flex justify-content-center align-items-center'>
          <div className={`${styles.home} p-5 text-center`}>
            <h2 className='mb-3 fs-1'>Find & track the best <span className='text-primary'>free-to-play</span> games!</h2>
            <p className='mb-3'>Track what you've played and search for what to play next! Plus get free premium loot!</p>
            <Link className='btn btn-outline-light' to='/all'>Browse Games</Link>
          </div>
        </div>
        <div className="container py-5">
          <h2 className='mb-3'>Personalized Recommendations</h2>
          <div className="row g-4">
            {games.slice(0, 3).map((game, index) =>
              <Game
                id={game.id}
                key={index}
                gameImage={game.thumbnail}
                gameTitle={game.title}
                gameDesc={game.short_description}
                genre={game.genre}
              />
              )}
          </div>
        </div>
      </section> : <Loading />

      }

    </>
  )
}
