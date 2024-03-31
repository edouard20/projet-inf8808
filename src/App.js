import React from 'react';
import MyD3Component from './MyD3Component.js';
import WaffleChart from './WaffleChart.js';
import './App.css';

const waffle_data = [
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

const data = waffle_data.filter(item => item[1] > 25).map(item => {
  return { nationality: item[0], count: item[1] };
});

function App() {
  return (
    <div className="App">
      <h1 className='App-header'>Speed Through Time: The Evolution of Formula 1</h1>
      <MyD3Component />
      <h2 className='App-title'>Waffle Chart</h2>
      <WaffleChart data={data} />
    </div>
  );
}

export default App;