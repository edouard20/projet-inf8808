import React from 'react';
import WaffleChart from './WaffleChart.js';
import ProgressBar from './ProgressBar';
import TitleText from './TitleText';
import TextSection from "./TextSection";
import ImageAnimation from "./ImageAnimation";
import data from './texts.json';
import './App.css';

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
      <h2 className='App-title'>Waffle Chart</h2>
      <WaffleChart data={waffle_data} />
    </div>
    </>
)};

export default App;