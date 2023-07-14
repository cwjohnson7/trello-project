import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Login from './components/login-page';
import HomeScreen from './features/homeScreen/HomeScreen';
import Board from './features/board/Board';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchUser } from './actions';
import Signup from './components/signup-page';
import { getUserBoardsThunk } from './features/homeScreen/HomeScreenSlice';
import {fetchUser}  from './actions/index';

const App = () => {
  const token = useSelector(state => state.auth.authenticated);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserBoardsThunk({ token }));
    dispatch(fetchUser());
  }, []);

  return (
    <div className="App">
				<DndProvider backend={HTML5Backend}>
          <BrowserRouter>
            <Header />
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/boards" element={<HomeScreen />} />
                <Route path="/boards/:boardId" element={<Board />} />
                {/* <Route path="/board" element={<Board />} /> */}
              </Routes>
          </BrowserRouter>
				</DndProvider>
			</div>
  );



}

export default App;
