import React from 'react';
import './App.css';
import ProgressBar from './ProgressBar';
import TitleText from './TitleText';
import TextSection from "./TextSection";
import data from './texts.json';

function App() {
  const items = data.texts;
  return (
    <>
      <ProgressBar/>
      <div className="App">
        <h1 className='introduction-text'>Speed Through Time: The Evolution of Formula 1</h1>
      </div>
      <TitleText/>
      <div className="App">
      {items.map((item, i) => (
        <TextSection key={i} text={item}/>
      ))}
    </div>
    </>
)};

export default App;