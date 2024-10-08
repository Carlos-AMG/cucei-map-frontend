import React from 'react';
import { useState } from 'react';
import { Map } from './components/Map';

function App() {
  const [selectedCareer, setSelectedCareer] = useState("");

  const foo = (event) => setSelectedCareer(event.target.value);

  return (
    <div>
      <h1>University Map</h1>
      <div>
        <label htmlFor='careerSelect'>De que carrera vienes?</label>
        <select id='careerSelect' onChange={foo}>
          <option value=''>Selecciona la carrera</option>
          <option value='computacion'>Computacion</option>
        </select>
      </div>
      <div>
        <Map campusName={"CUCEI"}/>
      </div>
    </div>
  );
}
export default App;