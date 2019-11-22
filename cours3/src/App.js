import React from 'react';
import logo from './logo.svg';
import Map from "./components/map/Map";
import './App.css';

function App() {
  return (
    <div className="App">
	  <Map center={ { lat: 45.1885, lng: 5.7245} } />
    </div>
  );
}

export default App;
