import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Header from './components/header';
import HomeScreen from './features/homeScreen/HomeScreen';


function App() {
  return (
    <div className="App">
				<DndProvider backend={HTML5Backend}>
          <Header />
          <HomeScreen/>
				</DndProvider>
			</div>
  );
}

export default App;
