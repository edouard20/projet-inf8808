import React from 'react';
import MyD3Component from './MyD3Component.js';
import WaffleChart from './WaffleChart.js';
import './App.css';

const data = [
  { nationality: "English", count: 20 },
  { nationality: "German", count: 24 },
  { nationality: "French", count: 12 },
  { nationality: "Brazilian", count: 20 },
  { nationality: "Italian", count: 6 },
  { nationality: "American", count: 7 }
];

function App() {
  return (
    <div className="App">
      <h1 className='App-header'>Speed Through Time: The Evolution of Formula 1</h1>
      <MyD3Component />
      <h2 className='App-header'>Waffle Chart</h2>
      <WaffleChart data={data} />
    </div>
  );
}

export default App;