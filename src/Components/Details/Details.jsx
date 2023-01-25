import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Carousel from "react-bootstrap/Carousel";
import { Helmet } from 'react-helmet';

export default function Details() {

  let params = useParams();
  // console.log(params)
  let [game, setGame] = useState({});
  let [isLoading, setIsLoading] = useState(false)

  const options = {
    method: 'GET',
    url: 'https://free-to-play-games-database.p.rapidapi.com/api/game',
    params: { id: params.id },
    headers: {
      'X-RapidAPI-Key': 'e93e82b48emsh26c7d1665e7d90fp189215jsn4ede803585b9',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };

  let getGame = async () => {

    let { data } = await axios.request(options)
    console.log(data.title)
    setGame(data)
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
    getGame();
  }, [])


  return (
    <>
      <Helmet>
        <title>Details: {game.title?game.title:''}</title>
      </Helmet>

      {
        !isLoading ? <div className="container my-5 pt-5">
        <div className="row">
          <div className="col-md-4">
            <img
              src={game.thumbnail}
              className="w-100 rounded"
              alt="gameImg"
            />
            <div className="py-3 text-center mx-auto ">
              <span className="bg-secondary p-2 rounded-2 me-3 col-md-2 text-white mouse-pointer">
                FREE
              </span>
              <a
                target="_blank"
                className="bg-light-blue py-2  w-75 rounded-2 text-white fw-bold text-decoration-none d-inline-block"
                href={String(game.freetogame_profile_url)}
              >
                PLAY NOW <i className="fas fa-sign-out-alt"></i>
              </a>
            </div>
          </div>

          <div className="col-md-8 text-gray">
            <h2 className="h1">{game.title}</h2>
            <p className="fw-bold">About {game.title}</p>
            <p className="pb-3">{game.description}</p>
            <div className="mb-5">
              <h3>Minimum System Requirements</h3>
              {game.minimum_system_requirements && (
                <p className="mb-1 fw-bold">
                  Graphics:{" "}
                  <span className="fw-normal">
                    {game.minimum_system_requirements.graphics}
                  </span>
                </p>
              )}
              {game.minimum_system_requirements && (
                <p className="mb-1 fw-bold">
                  Memory:{" "}
                  <span className="fw-normal">
                    {game.minimum_system_requirements.memory}
                  </span>
                </p>
              )}
              {game.minimum_system_requirements && (
                <p className="mb-1 fw-bold">
                  OS:{" "}
                  <span className="fw-normal">
                    {game.minimum_system_requirements.os}
                  </span>
                </p>
              )}
              {game.minimum_system_requirements && (
                <p className="mb-1 fw-bold">
                  Processor:{" "}
                  <span className="fw-normal">
                    {game.minimum_system_requirements.processor}
                  </span>
                </p>
              )}
              {game.minimum_system_requirements && (
                <p className="mb-1 fw-bold">
                  Storage:{" "}
                  <span className="fw-normal">
                    {game.minimum_system_requirements.storage}
                  </span>
                </p>
              )}
            </div>
            <div className="mb-3">
              <h3>{game.title} Screenshots</h3>
            </div>

            <Carousel className='mb-4' controls={false} indicators={false} interval={1000}>
              <Carousel.Item>
                {game.screenshots && (
                  <img
                    className="d-block w-100"
                    src={game.screenshots[0]?.image}
                  />
                )}
              </Carousel.Item>
              <Carousel.Item>
                {game.screenshots && (
                  <img
                    className="d-block w-100"
                    src={game.screenshots[1]?.image}
                  />
                )}
              </Carousel.Item>
              <Carousel.Item>
                {game.screenshots && (
                  <img
                    className="d-block w-100"
                    src={game.screenshots[2]?.image}
                  />
                )}
              </Carousel.Item>
              
            </Carousel>

            <div>
              <h3 className="mt-3">Minimum System Requirements</h3>
              <div className="mt-3 row">
                <div className="col-md-4">
                  <p className="text-muted my-0">Title</p>
                  <p className="text-gray mt-0 mb-2">{game.title}</p>
                </div>
                <div className="col-md-4">
                  <p className="text-muted my-0">Developer</p>
                  <p className="text-gray mt-0 mb-2">{game.developer}</p>
                </div>
                <div className="col-md-4">
                  <p className="text-muted my-0">Publisher</p>
                  <p className="text-gray mt-0 mb-2">{game.publisher}</p>
                </div>
                <div className="col-md-4">
                  <p className="text-muted my-0">Release Date</p>
                  <p className="text-gray mt-0 mb-2">{game.release_date}</p>
                </div>
                <div className="col-md-4">
                  <p className="text-muted my-0">Genre</p>
                  <p className="text-gray mt-0 mb-2">{game.genre}</p>
                </div>
                <div className="col-md-4">
                  <p className="text-muted my-0">Platform</p>
                  <p className="text-gray mt-0 mb-2">
                    <i className="fab fa-windows text-muted me-2 "></i>
                    {game.platform}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
          </div>
          : <Loading />
      }

    </>
  )
}
