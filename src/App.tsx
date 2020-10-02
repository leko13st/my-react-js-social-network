import React, { Suspense } from 'react';
import {Route, withRouter, BrowserRouter, Switch, Redirect} from "react-router-dom"
import './App.css';
import Navbar from './Components/Navbar/Navbar';
//import Messages from './Components/Messages/Messages';
import News from './Components/News/News';
import Settings from './Components/Settings/Settings';
import Music from './Components/Music/Music';
import { UserPage } from './Components/Users/UsersPage';
// import ProfileContainer from './Components/Profile/ProfileContainer';
import HeaderContainer from './Components/Header/HeaderContainer';
import { LoginPage } from './Components/Login/Login';
import { connect, Provider } from 'react-redux';
import { initializeApp } from './Redux/app-reducer';
import { compose } from 'redux';
import Preloader from './Components/common/Preloader/Preloader';
import store, { AppStateType } from './Redux/redux-store';

const ProfileContainer = React.lazy(() => import('./Components/Profile/ProfileContainer'));
const Messages = React.lazy(() => import('./Components/Messages/Messages'));
//const UsersContainer = React.lazy(() => import('./Components/Users/UsersContainer'));

type AppType = {
  initialized: boolean
  initializeApp: () => void
}

class App extends React.Component<AppType> {

  componentDidMount(){
    this.props.initializeApp();
  }

  render(){    
    if (!this.props.initialized)
      return <Preloader />

    return (
      <div className="app-wrapper">
      <HeaderContainer />
      <Navbar />
      <div className="app-wrapper-content">
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path='/' exact><Redirect to='/profile'/></Route>
            <Route path="/profile/:userId?" render={() => <ProfileContainer/>} />
            <Route path="/news" render={() => <News />} />
            <Route path="/messages" render={() => <Messages/>} />
            <Route path="/music" render={() => <Music />} />
            <Route path="/settings" render={() => <Settings />} />
            <Route path="/users" render={() => <UserPage />} />
            <Route path="/login" render={() => <LoginPage />} />
            <Route path="*" render={() => <div>404 NOT FOUND</div> } />
          </Switch>
        </Suspense>        
      </div>
    </div>
    );
  }
}

const mapStatetoProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

const mapDispatchToProps = {
  initializeApp: initializeApp
}

let AppContainer = compose<React.ComponentType>(
  connect(mapStatetoProps, mapDispatchToProps),
  withRouter
)(App)

export const MainApp: React.FC = () => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider> 
  </BrowserRouter>
}