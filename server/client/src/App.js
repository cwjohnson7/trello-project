import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Login from './components/login-page';
// import HomeScreen from './components/home-screen';
import HomeScreen from './features/homeScreen/HomeScreen';


function App() {
  return (
    <div className="App">
				<DndProvider backend={HTML5Backend}>
          <BrowserRouter>
            <Header />
              <Routes>
                {/* <Route path="/" element={<Login />} /> */}
                <Route path="/" element={<HomeScreen />} />
                {/* <Route path="/board" element={<HomeScreen />} /> */}
                {/* <Route path="/board" element={<Board />} /> */}
              </Routes>
          </BrowserRouter>
				</DndProvider>
			</div>
  );


//     <BrowserRouter>
//       <Header />
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/home" element={<HomeScreen />} />
//         <Route path="/board" element={<Board />} />
//       </Routes>
//     </BrowserRouter>
//  
// );

}

export default App;
