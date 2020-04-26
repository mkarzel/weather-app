import React from 'react';
import LeafletMap from './LeafletMap'
import WeatherData from './WeatherData';

const background = {
  backgroundColor: 'black',
  color: 'white',
  minHeight: '100vh'
}

const App = () => {
  return (
    <div style={background}>
      <LeafletMap/>
      <WeatherData/>
    </div>
  );
}

export default App;
