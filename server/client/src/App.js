import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TargetColumn from './features/list/TargetColumn';
import SourceColumn from './features/list/SourceColumn';

function App() {
  return (
    <div className="App">
				<DndProvider backend={HTML5Backend}>
         <SourceColumn/>
         <TargetColumn/>
				</DndProvider>
			</div>
  );
}

export default App;
