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

  const waffleWinnersRef = useRef();
  const waffleWinnersInView = useInView(waffleWinnersRef);

  const waffleEmptyRef = useRef(null);
  const [waffleEmptyInView, setwaffleEmptyInView] = useState(false);

  const waffleBarsRef = useRef(null);
  const [waffleBarsInView, setWaffleBarsInView] = useState(false);

  const waffleHoverRef = useRef(null);
  const [waffleHoverInView, setWaffleHoverInView] = useState(false);

  useEffect(() => {
    if (waffleEmptyRef.current) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          setwaffleEmptyInView(entry.isIntersecting);
        });
      }, { threshold: 0.5 });
  
      observer.observe(waffleEmptyRef.current);
      const currentRef = waffleEmptyRef.current;
  
      return () => {
        observer.unobserve(currentRef);
      };
    }

  }, [waffleEmptyRef]);


  useEffect(() => {
    if (waffleBarsRef.current) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          setWaffleBarsInView(entry.isIntersecting);
        });
      }, { threshold: 0.5 });
  
      observer.observe(waffleBarsRef.current);
      const currentRef = waffleBarsRef.current;
  
      return () => {
        observer.unobserve(currentRef);
      };
    }

  }, [waffleBarsRef]);

  useEffect(() => {
    if (waffleHoverRef.current) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          setWaffleHoverInView(entry.isIntersecting);
        });
      }, { threshold: 0.5 });
  
      observer.observe(waffleHoverRef.current);
      const currentRef = waffleHoverRef.current;
  
      return () => {
        observer.unobserve(currentRef);
      };
    }

  }, [waffleHoverRef]);
  
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
      <div className="text-section presentation">The following visualization will show the 6 nationalities with the most drivers throughout history.</div>
      <div className="container">
        <div className={`text-container ${waffleWinnersInView ? 'in-view' : ''}`} ref={waffleWinnersRef}>
          <div className='subtext' ref={waffleEmptyRef}></div>
          <div className='subtext square' ref={waffleBarsRef}>Every cube is an F1 driver.<div><Square /></div></div>
          <div className='subtext hover-text' ref={waffleHoverRef}>Hover on the bars to see the exact driver count.</div>
          <div className='subtext'>You can now hover to see the percentage of race winners.<br></br> <br></br>Not as many as you would think...</div>
        </div>
        {waffleEmptyInView && !waffleBarsInView && (
          <div className="chart-container">
            <WaffleChart data={waffle_data} colors={false} hover={false} animate={false}/>
          </div>
        )}
        {waffleBarsInView && !waffleHoverInView && (
          <div className="chart-container">
            <WaffleChart data={waffle_data} hover={false}/>
          </div>
        )}
        {waffleHoverInView && (
          <div className="chart-container">
            <WaffleChart data={waffle_data} animate={false}/>
          </div>
        )}
        {waffleWinnersInView && !waffleEmptyInView && !waffleBarsInView && !waffleHoverInView && (
          <div className="chart-container">
            <WaffleChart data={waffle_data} winner_data={winner_data} animate={false}/>
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
