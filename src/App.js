import React from 'react';
import './App.css';
import ProgressBar from './ProgressBar';
import TitleText from './TitleText';
import Card from "./Card";

function App() {
  const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];
  return (
    <>
      <ProgressBar/>
      <div className="App">
        <h1 className='introduction-text'>Speed Through Time: The Evolution of Formula 1</h1>
      </div>
      <TitleText/>
      <div className="App">
      {items.map((item, i) => (
        <Card key={i} text={item} index={i} />
      ))}
    </div>
    </>
)};

export default App;