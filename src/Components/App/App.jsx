import Home from '../Home/Home';
import All from '../All/All';
import Pc from '../Platform/Pc/Pc';
import SortBy from '../SortBy/SortBy';
import Categories from '../Categories/Categories';
import Login from '../Login/Login';
import SignUp from "../SignUp/SignUp";
import Details from "../Details/Details";
import {  createHashRouter, Navigate, RouterProvider } from "react-router-dom";
import MasterLayOut from "../MasterLayOut/MasterLayOut";
import './App.css';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Browser from '../Platform/Browser/Browser';


function App() {

  let [userData, setUserData] = useState(null);
  let saveUserData = () => {
    let encodedToken = localStorage.getItem('token');
    let decodedToken = jwtDecode(encodedToken);
    // console.log(decodedToken);
    setUserData(decodedToken);
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      saveUserData();
    }
  }, [])

  let logout = () => {
    localStorage.removeItem('token');
    setUserData(null);
    return <Navigate to='/login' />
  }



  let routes = createHashRouter([{
    path: '/', element: <MasterLayOut userData={userData} logout={logout} />, errorElement: <h2>not found</h2>, children: [
      { index: true, element: <ProtectedRoute userData={userData}><Home /></ProtectedRoute> },
      { path: 'all', element: <ProtectedRoute userData={userData}><All /></ProtectedRoute> },
      { path: 'platform/pc', element: <ProtectedRoute userData={userData}><Pc /></ProtectedRoute> },
      { path: 'platform/browser', element: <ProtectedRoute userData={userData}><Browser /></ProtectedRoute> },
      { path: 'sortBy/:sortBy', element: <ProtectedRoute userData={userData}><SortBy /></ProtectedRoute> },
      { path: 'category/:category', element: <ProtectedRoute userData={userData}><Categories /></ProtectedRoute> },
      { path: 'details/:id', element: <ProtectedRoute userData={userData}><Details /></ProtectedRoute> },
      { path: 'signup', element: <SignUp /> },
      { path: 'login', element: <Login saveUserData={saveUserData} /> },

    ]
  }])


  return (
    <>
      <RouterProvider router={routes} />
    </>
  )

}

export default App;
