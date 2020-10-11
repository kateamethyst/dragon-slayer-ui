import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Routes from './routes/index';
import NavComponent from './components/NavComponent';

function App() {
  return (
    <div className="App">
      <NavComponent />
      <Routes />
    </div>
  );
}

export default App;
