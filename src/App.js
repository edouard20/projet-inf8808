import React from 'react';
import './App.css';
import ProgressBar from './ProgressBar';
import TitleText from './TitleText';
import TextSection from "./TextSection";
import ImageAnimation from "./ImageAnimation";
import data from './texts.json';
import Timeline from './TimelineComponent';

function App() {

  const visualizations = [<TextSection/>, <TextSection/>, <TextSection/>, <TextSection/>, <TextSection/>] // Add visualizations here
  const items = data.texts;
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
          <ImageAnimation img={"https://cdn-4.motorsport.com/images/amp/0qAWQR80/s1000/formula-1-argentinian-gp-1981--2.jpg"} description={"Gilles Villeneuve in his Ferrari 126C at the 1981 Argentinian Grand Prix"} delay={0.5} duration={0.8}></ImageAnimation>
          <ImageAnimation img={"https://cdn.ferrari.com/cms/network/media/img/resize/5e33f7f70bd18308db1a854b-ferrari-scuderia-1991-alesi-prost-cover-mob?width=768&height=1024"} description= {"Scuderia Ferrari 1981, Jean Alesi and Alain Prost"}delay={1.5} duration={1.5} ></ImageAnimation>
          <ImageAnimation img={"https://www.creditplus.co.uk/media/6839/history-of-ferrari-in-f1-pit-stop.jpg"} delay={2.5} duration={2.5} ></ImageAnimation>
      </div>

      <TitleText title={"Racing Giants: The Dominant Nations of the Sport"}/>
      <div className="text-section">
        <TextSection text={items[1]}/>
      </div>

      <TitleText title={"Iconic Circuits: The Heartbeat of Formula 1"}/>
      <div className="text-section">
        <TextSection text={items[2]}/>
      </div>

      <TitleText title={"Aged like Fine Wine: The Timeless Veterans of the Sport"}/>
      {/* <div className='images-box'>
          <ImageAnimation img={"https://msmproduction.s3-eu-west-1.amazonaws.com/s3fs-public/2005brazil_1.jpg"} delay={0.5} duration={0.8}></ImageAnimation>
          <ImageAnimation img={"https://www.gala.fr/imgre/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fprismamedia_people.2F2017.2F06.2F30.2Fbc10d992-7658-4170-81aa-d06e07a6d01a.2Ejpeg/2048x1536/quality/80/fernando-alonso.jpeg"} delay={1.5} duration={1.5} ></ImageAnimation>
          <ImageAnimation img={"https://cdn-9.motorsport.com/images/amp/0ZRKor80/s1000/fernando-alonso-aston-martin-a.jpg"} delay={2.5} duration={2.5} ></ImageAnimation>
          <ImageAnimation img={"https://nypost.com/wp-content/uploads/sites/2/2023/04/alonso-.jpg"} delay={2.5} duration={2.5} ></ImageAnimation>
          <ImageAnimation img={"https://dicodusport.fr/blog/wp-content/uploads/2020/05/Vid%C3%A9o-Les-meilleurs-moments-de-Fernando-Alonso-en-F1.png"} delay={2.5} duration={2.5} ></ImageAnimation> 
      </div> */}
      <Timeline></Timeline>
      <div className="text-section">
        <TextSection text={items[3]}/>
      </div>

      <TitleText title={"The Dynamics of Competition: Analyzing Position Shifts in Races"}/>
      <div className="text-section">
        <TextSection text={items[4]}/>
      </div>
    </>
)};

export default App;