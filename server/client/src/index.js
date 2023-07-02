import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Header from './components/header';
import Login from './components/login-page';
import BoardScreen from './components/board-screen';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <BoardScreen />
  </React.StrictMode>
);
