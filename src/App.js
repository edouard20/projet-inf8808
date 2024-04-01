import React from 'react';
import './App.css';
import ProgressBar from './ProgressBar';
import TitleText from './TitleText';
import TextSection from "./TextSection";
import ImageAnimation from "./ImageAnimation";
import data from './texts.json';

function App() {
  const visualizations = [<TextSection/>, <TextSection/>, <TextSection/>, <TextSection/>, <TextSection/>] // Add visualizations here
  const items = data.texts;
  return (
    <>
      <ProgressBar/>
      <div className="App">
        <h1 className='introduction-text'>Speed Through Time: The Evolution of Formula 1</h1>
      </div>
      <TitleText title={"The Era of Dominance: Powerhouses of Formula 1"}/>
      <div className='images-box'>
          <ImageAnimation img={"https://cdn-4.motorsport.com/images/amp/0qAWQR80/s1000/formula-1-argentinian-gp-1981--2.jpg"} delay={0.5} duration={0.8}></ImageAnimation>
          <ImageAnimation img={"https://cdn.ferrari.com/cms/network/media/img/resize/5e33f7f70bd18308db1a854b-ferrari-scuderia-1991-alesi-prost-cover-mob?width=768&height=1024"} delay={1.5} duration={1.5} ></ImageAnimation>
          <ImageAnimation img={"https://www.creditplus.co.uk/media/6839/history-of-ferrari-in-f1-pit-stop.jpg"} delay={2.5} duration={2.5} ></ImageAnimation>
        </div>
      <div className="text-section">
      {items.map((item, i) => (
        <div>
          <TextSection key={i} text={item}/>
          {visualizations[i]}
        </div>
      ))}
    </div>
    </>
)};

export default App;