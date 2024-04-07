import React, { useRef } from 'react';
import WaffleChart from './WaffleChart.js';
import ProgressBar from './ProgressBar';
import TitleText from './TitleText';
import TextSection from "./TextSection";
import ImageAnimation from "./ImageAnimation";
import data from './texts.json';
import AlonsoTimeline from './AlonsoTimeline';
import './App.css';
import ParallaxText from './ParallaxText';
import { useInView } from 'framer-motion';
import Square from './Square.js';

// will modifiy this to a call from the preprocessing
const nationality_data = [
  [ 'British', 165 ],
  [ 'American', 158 ],
  [ 'Italian', 99 ],
  [ 'French', 73 ],
  [ 'German', 50 ],
  [ 'Brazilian', 32 ],
  [ 'Argentine', 24 ],
  [ 'Swiss', 23 ],
  [ 'Belgian', 23 ],
  [ 'South African', 23 ],
  [ 'Japanese', 20 ],
  [ 'Australian', 18 ],
  [ 'Dutch', 18 ],
  [ 'Spanish', 15 ],
  [ 'Austrian', 15 ],
  [ 'Canadian', 14 ],
  [ 'Swedish', 10 ],
  [ 'Finnish', 9 ],
  [ 'New Zealander', 9 ],
  [ 'Mexican', 6 ],
  [ 'Irish', 5 ],
  [ 'Danish', 5 ],
  [ 'Portuguese', 4 ],
  [ 'Monegasque', 4 ],
  [ 'Rhodesian', 4 ],
  [ 'Uruguayan', 4 ],
  [ 'Russian', 4 ],
  [ 'Colombian', 3 ],
  [ 'Venezuelan', 3 ],
  [ 'East German', 3 ],
  [ 'Indian', 2 ],
  [ 'Thai', 2 ],
  [ 'Polish', 1 ],
  [ 'Hungarian', 1 ],
  [ 'Czech', 1 ],
  [ 'Malaysian', 1 ],
  [ 'Chilean', 1 ],
  [ 'Liechtensteiner', 1 ],
  [ 'American-Italian', 1 ],
  [ 'Argentine-Italian', 1 ],
  [ 'Indonesian', 1 ],
  [ 'Chinese', 1 ]
]

const waffle_data = nationality_data.filter(item => item[1] > 25).map(item => {
  return { nationality: item[0], count: item[1] };
});

function App() {
  const items = data.texts;
  const textRef = useRef();
  const textInView = useInView(textRef);

  return (
    <>
      <ProgressBar/>
      <div className="App">
        <h1 className='title-text'>Speed Through Time: The Evolution of Formula 1</h1>
      </div>

      <TitleText title={"The Era of Dominance: Powerhouses of Formula 1"}/>
      <div className="text-section">
        <TextSection text={items[0]}/>
      </div>

      <div className='images-box'>
          <ImageAnimation img={"https://cdn-4.motorsport.com/images/amp/0qAWQR80/s1000/formula-1-argentinian-gp-1981--2.jpg"} description={"Gilles Villeneuve in his Ferrari 126C at the 1981 Argentinian Grand Prix"} delay={0.5} duration={0.8} height={'307px'} width={'500px'}></ImageAnimation>
          <ImageAnimation img={"https://cdn.ferrari.com/cms/network/media/img/resize/5e33f7f70bd18308db1a854b-ferrari-scuderia-1991-alesi-prost-cover-mob?width=768&height=1024"} description= {"Scuderia Ferrari 1981, Jean Alesi and Alain Prost"}delay={1.5} duration={1.5} height={'500px'} width={'350px'}></ImageAnimation>
          <ImageAnimation img={"https://www.creditplus.co.uk/media/6839/history-of-ferrari-in-f1-pit-stop.jpg"} delay={2.5} duration={2.5} height={'307px'} width={'500px'}></ImageAnimation>
      </div>

      <TitleText title={"Racing Giants: The Dominant Nations of the Sport"}/>
      <div className="text-section">
        <TextSection text={items[1]} />
      </div>
      <div className="container">
        <div className={`text-container ${textInView ? 'in-view' : ''}`} ref={textRef}>
          <div className='subtext'>The visualization on the left shows the 6 nationalities with more than 25 drivers.</div>
          <div className='subtext square'>Every single cube is one F1 driver.<div><Square /></div></div>
          <div className='subtext hover-text'>Hover on the bars to see the exact driver count.</div>
          <div className='subtext'>Thing 4</div>
          <div className='subtext'>Thing 5</div>
          <div className='subtext'>Thing 6</div>
          <div className='subtext'>Thing 7</div>
        </div>
        {textInView && (
          <div className="chart-container">
            <WaffleChart data={waffle_data} />
          </div>
        )}
      </div>

      <ParallaxText baseVelocity={-5}> 
        <img src="f1car.png" alt="F1 car" width="300" height="200"/>
      </ParallaxText>

      <TitleText title={"Iconic Circuits: The Heartbeat of Formula 1"}/>
      <div className="text-section">
        <TextSection text={items[2]}/>
      </div>

      <TitleText title={"Aging like Fine Wine: The Timeless Veterans of the Sport"}/>
      <div className="text-section">
        <TextSection text={items[3]}/>
      </div>
      <AlonsoTimeline></AlonsoTimeline>

      <TitleText title={"The Dynamics of Competition: Analyzing Position Shifts in Races"}/>
      <div className="text-section">
        <TextSection text={items[4]}/>
      </div>
    </>
)};

export default App;
