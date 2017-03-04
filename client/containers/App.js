import React from 'react';
import NavBar from '../components/NavBar'

const App = ({ children }) => (
  <div>
    <NavBar />
    <div className="container">
      { children }
    </div>
  </div>
)

export default App;
