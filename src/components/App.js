import React from 'react';
import LeafletMap from './LeafletMap'

const background = {
  backgroundColor: 'black',
  color: 'white',
  minHeight: '100vh',
}

const App = () => {
  return (
    <div style={background}>
      <LeafletMap/>
    </div>
  );
}

export default App;
