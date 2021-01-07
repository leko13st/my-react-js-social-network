import React from "react"
import { Route, withRouter, BrowserRouter, Switch, Redirect, Link } from "react-router-dom"
import "./App.css"
import "antd/dist/antd.css"

import News from "./Components/News/News"
import Settings from "./Components/Settings/Settings"
import Music from "./Components/Music/Music"
import { UserPage } from "./Components/Users/UsersPage"
import { LoginPage } from "./Components/Login/Login"
import { connect, Provider } from "react-redux"
import { initializeApp } from "./Redux/app-reducer"
import { compose } from "redux"
import Preloader from "./Components/common/Preloader/Preloader"
import store, { AppStateType } from "./Redux/redux-store"

import { Layout, Menu, Breadcrumb } from "antd"
import { UserOutlined, LaptopOutlined, NotificationOutlined } from "@ant-design/icons"
import { withSuspense } from "./hoc/withSuspense"
import { AppHeader } from "./Components/Header/Header"

const ProfileContainer = React.lazy(() => import("./Components/Profile/ProfileContainer"))
const Messages = React.lazy(() => import("./Components/Messages/Messages"))
const ChatPage = React.lazy(() => import("./pages/ChatPage"))
//const UsersContainer = React.lazy(() => import('./Components/Users/UsersContainer'));

const SuspenedProfile = withSuspense(ProfileContainer)
const SuspenedMessages = withSuspense(Messages)
const SuspenedChatPage = withSuspense(ChatPage)

const { SubMenu } = Menu
const { Content, Footer, Sider } = Layout

type AppType = {
    initialized: boolean
    initializeApp: () => void
}

class App extends React.Component<AppType> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) return <Preloader />

        return (
            <>
                <Layout>
                    <AppHeader />
                    <Content style={{ padding: "0 50px" }}>
                        <Breadcrumb style={{ margin: "16px 0" }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Layout className="site-layout-background" style={{ padding: "24px 0" }}>
                            <Sider className="site-layout-background" width={200}>
                                <Menu
                                    mode="inline"
                                    defaultSelectedKeys={["2"]}
                                    defaultOpenKeys={["sub1"]}
                                    style={{ height: "100%" }}
                                >
                                    <SubMenu key="sub1" icon={<UserOutlined />} title="My Profile">
                                        <Menu.Item key="1">
                                            <Link to="/profile">Profile</Link>
                                        </Menu.Item>
                                        <Menu.Item key="2">
                                            <Link to="/messages">Messages</Link>
                                        </Menu.Item>
                                        <Menu.Item key="3">
                                            <Link to="/chat">Chat</Link>
                                        </Menu.Item>
                                    </SubMenu>
                                    <SubMenu
                                        key="sub2"
                                        icon={<LaptopOutlined />}
                                        title="Developers"
                                    >
                                        <Menu.Item key="5">
                                            <Link to="/developers">Developers</Link>
                                        </Menu.Item>
                                    </SubMenu>
                                    <SubMenu
                                        key="sub3"
                                        icon={<NotificationOutlined />}
                                        title="Extra"
                                    >
                                        <Menu.Item key="9">
                                            <Link to="/news">News</Link>
                                        </Menu.Item>
                                        <Menu.Item key="10">
                                            <Link to="/music">Music</Link>
                                        </Menu.Item>
                                        <Menu.Item key="11">
                                            <Link to="/settings">Settings</Link>
                                        </Menu.Item>
                                    </SubMenu>
                                </Menu>
                            </Sider>
                            <Content style={{ padding: "0 24px", minHeight: 280 }}>
                                <Switch>
                                    <Route path="/" exact>
                                        <Redirect to="/profile" />
                                    </Route>
                                    <Route
                                        path="/profile/:userId?"
                                        render={() => <SuspenedProfile />}
                                    />
                                    <Route path="/news" render={() => <News />} />
                                    <Route path="/messages" render={() => <SuspenedMessages />} />
                                    <Route path="/music" render={() => <Music />} />
                                    <Route path="/settings" render={() => <Settings />} />
                                    <Route path="/developers" render={() => <UserPage />} />
                                    <Route path="/login" render={() => <LoginPage />} />
                                    <Route path="/chat" render={() => <SuspenedChatPage />} />
                                    <Route path="*" render={() => <div>404 NOT FOUND</div>} />
                                </Switch>
                            </Content>
                        </Layout>
                    </Content>
                    <Footer style={{ textAlign: "center" }}>
                        Social Network by React and Ant Design ©2020 Created by leko13st
                    </Footer>
                </Layout>

                {/* <div className="app-wrapper"> 
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
      </div> */}
            </>
        )
    }
}

const mapStatetoProps = (state: AppStateType) => ({
    initialized: state.app.initialized,
})

const mapDispatchToProps = {
    initializeApp: initializeApp,
}

let AppContainer = compose<React.ComponentType>(
    connect(mapStatetoProps, mapDispatchToProps),
    withRouter
)(App)

export const MainApp: React.FC = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>
    )
}
