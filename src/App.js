import React, { useRef, useState, useEffect } from 'react';
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
import preprocessDrivers from './waffle_preprocess/waffle_preprocess.js';
import driversData from './waffle_preprocess/drivers.json';
import standingsData from './waffle_preprocess/results.json';

const columnsToDropDrivers = ['driverRef', 'number', 'code', 'dob', 'url'];
const {waffle_data, winner_data} = preprocessDrivers(driversData, columnsToDropDrivers, standingsData);

function App() {
  const items = data.texts;

  const waffleTextRef = useRef();
  const waffleTextInView = useInView(waffleTextRef);

  const waffleWinnersRef = useRef(null);
  const [waffleWinnersInView, setWaffleWinnersInView] = useState(false);

  const waffleWinnersRef2 = useRef(null);
  const [waffleWinnersInView2, setWaffleWinnersInView2] = useState(false);

  useEffect(() => {
    if (waffleWinnersRef.current) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          setWaffleWinnersInView(entry.isIntersecting);
          setWaffleWinnersInView2(entry.isIntersecting);
        });
      }, { threshold: 0.5 });
  
      observer.observe(waffleWinnersRef.current);
      observer.observe(waffleWinnersRef2.current);
  
      return () => {
        observer.unobserve(waffleWinnersRef.current);
        observer.unobserve(waffleWinnersRef2.current);
      };
    }
  }, [waffleWinnersRef, waffleWinnersRef2]);

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
        <div className={`text-container ${waffleTextInView ? 'in-view' : ''}`} ref={waffleTextRef}>
          <div className='subtext'>The visualization on the left shows the 6 nationalities with more than 25 drivers.</div>
          <div className='subtext square'>Every single cube is one F1 driver.<div><Square /></div></div>
          <div className='subtext hover-text'>Hover on the bars to see the exact driver count.</div>
          <div className='subtext' ref={waffleWinnersRef}>These are the winners per nationality!</div>
          <div className='subtext' ref={waffleWinnersRef2}></div>
        </div>
        {waffleTextInView && !waffleWinnersInView && (
          <div className="chart-container">
            <WaffleChart data={waffle_data}/>
          </div>
        )}
        {waffleWinnersInView && waffleWinnersInView2 && (
          <div className="chart-container">
            <WaffleChart data={waffle_data} winner_data={winner_data}/>
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
