import React from 'react';
import {Route, BrowserRouter} from "react-router-dom"
import './App.css';
import Header from './Components/Header/Header';
import Navbar from './Components/Navbar/Navbar';
import Profile from './Components/Profile/Profile';
import Messages from './Components/Messages/Messages';
import News from './Components/News/News';
import Settings from './Components/Settings/Settings';
import Music from './Components/Music/Music';

function App(props) {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Navbar />
        <div className="app-wrapper-content">
          <Route path="/profile" render={() => <Profile profilePage={props.state.profilePage} 
                                                        dispatch={props.dispatch} 
                                                        />} />
          <Route path="/news" render={() => <News />} />
          <Route path="/messages" render={() => <Messages messagePage={props.state.messagePage}
                                                          dispatch={props.dispatch}
                                                          />} />
          <Route path="/music" render={() => <Music />} />
          <Route path="/settings" render={() => <Settings />} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
