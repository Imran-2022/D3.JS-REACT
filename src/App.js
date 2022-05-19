import React from 'react'
import {
  Routes,
  Route,
} from "react-router-dom";
import * as d3 from 'd3'
import Home from './components/home/Home';
function App() {
  // console.log(d3.sum([5,5,5,5]));
  return (
   <>
       <Routes>
       <Route path="/" element={<Home />}/>
       </Routes>
   </>
  );
}

export default App;
