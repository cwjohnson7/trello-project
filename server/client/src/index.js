import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Header from './components/header';
import Login from './components/login-page';
import HomeScreen from './components/home-screen';
import Board from './components/board';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/board" element={<Board />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
