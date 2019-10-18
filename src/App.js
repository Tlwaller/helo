import React from 'react';
import './App.css';
import Nav from './Components/Nav/Nav';
import Routes from './Routes';

class App extends React.Component {
  render() {
    return (
    <div className="App">
      <Nav/>
        {Routes}
    </div>
  );
  }
}

export default App;
