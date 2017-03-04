import React from 'react';
import NavBar from '../components/NavBar'

const App = ({ children }) => (
  <div className="canvas">
    <NavBar />
    { children }
  </div>
)

export default App;
