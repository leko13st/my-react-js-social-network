import React from 'react';
import {Route, withRouter} from "react-router-dom"
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Messages from './Components/Messages/Messages';
import News from './Components/News/News';
import Settings from './Components/Settings/Settings';
import Music from './Components/Music/Music';
import UsersContainer from './Components/Users/UsersContainer';
import ProfileContainer from './Components/Profile/ProfileContainer';
import HeaderContainer from './Components/Header/HeaderContainer';
import Login from './Components/Login/Login';
import { connect } from 'react-redux';
import { initializeApp } from './Redux/app-reducer';
import { compose } from 'redux';
import Preloader from './Components/common/Preloader/Preloader';

class App extends React.Component {

  componentDidMount(){
    this.props.initializeApp();
  }

  render(){
    debugger
    if (!this.props.initialized)
      return <Preloader />

    return (
      <div className="app-wrapper">
      <HeaderContainer />
      <Navbar />
      <div className="app-wrapper-content">
        <Route path="/profile/:userId?" render={() => <ProfileContainer/>} />
        <Route path="/news" render={() => <News />} />
        <Route path="/messages" render={() => <Messages/>} />
        <Route path="/music" render={() => <Music />} />
        <Route path="/settings" render={() => <Settings />} />
        <Route path="/users" render={() => <UsersContainer />} />
        <Route path="/login" render={() => <Login />} />
      </div>
    </div>
    );
  }
}

const mapStatetoProps = (state) => ({
  initialized: state.app.initialized
})

const mapDispatchToProps = {
  initializeApp: initializeApp
}

export default compose(
  connect(mapStatetoProps, mapDispatchToProps),
  withRouter
)(App)