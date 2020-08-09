import React from 'react';
import {Route, BrowserRouter} from "react-router-dom"
import './App.css';
import Header from './Components/Header/Header';
import Navbar from './Components/Navbar/Navbar';
import Profile from './Components/Profile/Profile';
import Messages from './Components/Messages/Messages';

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Navbar />
        <div className="app-wrapper-content">
          <Route path="/profile" component={Profile} />
          <Route path="/messages" component={Messages} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
