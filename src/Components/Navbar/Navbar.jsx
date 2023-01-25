import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import {  SortContext } from '../Context/sortContext';
import {  CategoryContext } from '../Context/categoryContext';




export default function Navbar({ userData, logout }) {



    let {setSort} = useContext(SortContext);

    let getSort=(e)=>{
        let sort = e.target.name;
        setSort(sort);
    }

    let {setCategory} = useContext(CategoryContext);

    let getCategory=(e)=>{
        let category = e.target.name;
        setCategory(category);
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-transparent fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to=''><img className="logo" src={logo} /> Game Over</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {userData ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            <li className="nav-item">
                                <Link className="nav-link" to='' >Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='all' >All</Link>
                            </li>
                            <li className="nav-item position-relative">

                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Platforms
                                </a>
                                <ul className="dropdown-menu position-absolute">
                                    <li><Link  className="dropdown-item" to='/platform/pc' name='pc'>PC</Link></li>
                                    <li><Link  className="dropdown-item" to='/platform/browser' name='browser'>Browser</Link></li>

                                </ul>

                            </li>

                            <li className="nav-item position-relative">

                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    sort-by
                                </a>
                                <ul className="dropdown-menu position-absolute">
                                    <li><Link onClick={getSort} className="dropdown-item" to='/sortBy/release-date' name='release-date'>release-date</Link></li>
                                    <li><Link onClick={getSort} className="dropdown-item" to='/sortBy/popularity' name='popularity'>popularity</Link></li>
                                    <li><Link onClick={getSort} className="dropdown-item" to='/sortBy/alphabetical' name='alphabetical'>alphabetical</Link></li>
                                    <li><Link onClick={getSort} className="dropdown-item" to='/sortBy/relevance' name='relevance'>relevance</Link></li>

                                </ul>

                            </li>

                            <li className="nav-item position-relative">

                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Categories
                                </a>
                                <ul className="dropdown-menu position-absolute">
                                    <li><Link onClick={getCategory} className="dropdown-item" to='/category/racing' name='racing'>racing</Link></li>
                                    <li><Link onClick={getCategory} className="dropdown-item" to='/category/sports' name='sports'>sports</Link></li>
                                    <li><Link onClick={getCategory} className="dropdown-item" to='/category/social' name='social'>social</Link></li>
                                    <li><Link onClick={getCategory} className="dropdown-item" to='/category/shooter' name='shooter'>shooter</Link></li>
                                    <li><Link onClick={getCategory} className="dropdown-item" to='/category/open-world' name='open-world'>open-world</Link></li>
                                    <li><Link onClick={getCategory} className="dropdown-item" to='/category/zombie' name='zombie'>zombie</Link></li>
                                    <li><Link onClick={getCategory} className="dropdown-item" to='/category/fantasy' name='fantasy'>fantasy</Link></li>
                                    <li><Link onClick={getCategory} className="dropdown-item" to='/category/action-rpg' name='action-rpg'>action-rpg</Link></li>
                                    <li><Link onClick={getCategory} className="dropdown-item" to='/category/action' name='action'>action</Link></li>
                                    <li><Link onClick={getCategory} className="dropdown-item" to='/category/flight' name='flight'>flight</Link></li>
                                    <li><Link onClick={getCategory} className="dropdown-item" to='/category/battle-royale' name='battle-royale'>battle-royale</Link></li>

                                </ul>

                            </li>

                        </ul> : ''}
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                            {userData ? <li className="nav-item">
                                <Link onClick={logout} className="btn btn-outline-danger text-danger"  >Log Out</Link>
                            </li> : <>
                                <li className="nav-item">
                                    <Link className="nav-link" to='login' >Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to='signup' >Join Free</Link>
                                </li>
                            </>
                            }

                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}
