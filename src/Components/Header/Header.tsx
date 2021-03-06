import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Layout, Menu, Row } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { UserOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUserLogin, selectIsAuth } from '../../Redux/auth-selector';
import { logoutTC } from '../../Redux/auth-reducer';

export type StatePropsType = {}

const { Header } = Layout;

export const AppHeader: React.FC<StatePropsType> = (props) => {

    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUserLogin)

    const dispatch = useDispatch()

    const logout = () => {
        dispatch(logoutTC())
    }

    return(
        <Header className="header">
            <div className="logo" />
            <Row>
                <Col span={20}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">
                            <Link to="/developers">Developers</Link>
                        </Menu.Item>          
                    </Menu>
                </Col>
                <Col span={4}>
                    {(
                        isAuth
                        ?   <div style={{ color: 'white' }}>
                                <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                                {login}
                                <Button style={{marginLeft: 10}} onClick={logout}>
                                    Logout
                                </Button>                            
                            </div>
                        :   <Button>
                                <Link to="/login">Login</Link>
                            </Button> 
                    )} 
                </Col>
            </Row>      
        </Header>

        // <header className={s.header}>
        //     <img alt="header-logo" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEBIQEBAPEhAPFQ8QEBAPEA8QDw8QFREWFhURFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFxAQFysdFx0rKy0rLSstLS0tLS0tLS0tLS0tLS0tLTctLSstLS0tLS03LS0rNys3Ny0tNzcrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAAAQIDBAUGBwj/xABAEAACAQIDBgMGAwUFCQAAAAAAAQIDEQQhMQUGEkFRYRNxgQciMpGhsUJSwRQjYnKCJDOS0eEIFTRTY3SisvD/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAQIDBAX/xAAhEQEBAAICAgIDAQAAAAAAAAAAAQIRAyESMQQyIlFhQf/aAAwDAQACEQMRAD8A9VGIaNMgYIAGMSGZAMAIAaEMsS9AVSpGKcpNRis25OyS6mPtHH0sPTlVqzUYR1f+h4pvtvZVx9Z06M5qhFtRhFtKX8U3zRMstNY47ehba9ouEo8UaP76onbJ2h8+Zyc9/wDG1XlOnTWtoxXyzOLWHUYqTd/iyXRaCoUo/FZ3WmVvU4XO13nHI7SG+uNUv7+b8/Ds/QzaO/WMWbqRz5OEbfQ4qK6xWXVXJxjbOMvd5rl8uRjd/bfjHoOG9oNb8VOjPrbiizodl764WtaM70ZvL384X/mR5DDEO+St6Z9i+niGrcVrcpL7NGpnlGbxyve4STSaaaejWaZI8o3c3krYd2j71LWVOTdrdY9D0fZG2KOKjenL3l8VOVlOPp07nfDkmTz58dxbAAA6OQJMSGUIAGAIAAAAAAwxghojoEMQEErAmAIgYhhYqGDA0W+mNlRwdSUb8UvcTTtZvmS9TZO7p5dv7tqrisRKnGo/Bg2orSK4XZyyObilTSUVdv4pc/T7l+Khmu2vdvMeEpObvb4crcjz27euTWl8KbaSirpfE3npqZNLD30WXY6nYewVOK4lZa37HT0dkUoxsorzaOUm66yR5tGja2Tdr8m0VzpLVprqnzPSa+w4vR29MjT4vdb+Jvn28i6sa1HFVKfbLK5FQs+FxeWvVd11Opr7vyzyv9vI1WIwVnaSd1a3LLoX/E8WLSqOFne8VbNZvW2fVG0wGMdOrGpSfDODTTWn8r6o1eIpyStxZdeaIYfi0yvfJ3yu1k/JmP6zY9u2RtCOJpRqRVnmpRunwyWqMyx5vuntVUK127QrJKor6P8AN6HpF+aPZxZ+UeLkw8aYxIEjq5GgCwAAAMBDEMDDGhIZNtgYDM1QNCQAMYkMM2g4v2nSfg0lf3XJ3XWyO0OE9qNVqNGK58bM8n1b4vs8vxKblZavQ6fdnZ15RckuFK/Zu+ppaFP307aZnWbJabirapadEcN6j2SbrqKVklbRZGXGRgwehkUpmZrbrplQl1LsmY8JFqNpfYqUYtGr2jsqM18OZtJS8hrPl+pLFnTmpbAi3pzv/oKe6keV1zTVvqdVEsTJ4yFu3C4rd2rSXEs0s2dvurjXWwsJP4otwfe2j+RYYG6FLw/2ql+Ss2v5ZK6NcX2ebnn4uiGhAet4jAGADAAAAAYGEhgBl0MAGRAhoATKGADCUjzn2n1v31GF9ITk10u8mei1p8MZS/Km/kjyzbkJ4i1ecf3jUorvTvkzjzZ66ej4/Hbu/pocLR4mkueSOw2bs7wlxP4mkvJGm3fw96ib/DmdPUOFr14xNSLqXcw6tZQV38lqzCxFWtUyTVOPW+ZmOjpaRkR7nEVqeIiv3daMmvw3auTw23cTTspxv1Om4z4OylDmhwZrsFtLxEnZq5mxrI0arJTfYmkUQqLqXRncljIZXsqyxVZfnp05eqbROox7Opf2iU/+nGP/AJXLh9unLl+rbgAHrfPMBIYAAAAwEMDDQANGa2YCQyKBoENFTYQ7ACDKjH/3VT+WRwm0MRT92lZqTVo5ZWS6nb7VdqNR9v1OGjQUnKb1i0s/0PNz/aPofEm8KlszDKF3bojNmRUkWQVzg76a/FZZv6mkq1J1ajgr8KV3m0n52+x106SeqMOtgbO8Yr0yZrH21K4nY2PWJrwoVPCh4jlBWVVTg/wtvnfojcY3A1sLUceJySvZNuXqnrY2qwkITVWFO1VfjUVdX/UlOFSo+Kd2k72fXkd8/GzqOeGOcttvTF2ZtJvJqx0UZe7f7GpdG+bSXSxvaNJuj/S/nY5x0uTTYzaqh+NLu2kaintKtOd4YmlbvKxKWz6d25pt2dk87ztlfsavd/CYieJVKvTqqHDacnKDprV8ausvw2WZvHC3/Wc8pj/jscDia0eFzkpx/E45+p2Oz0uC655nA7HpOFadJNNRyyyi1f4ku/Q9AwEbU4+ReKfk83yrqdLwGJHpeAIYAAwAEAAAwMIYiSMVskOIDCmAJgVkDBAVFOMpcdOcfzJr9f0OUqYe8LS9eF2l8zsTSYzZFS7dKUOF3dptq3bucObC3uPX8bl8er6aBZZemZbQZi0ZuSu9W3f52L6TseS729u2xhFMvhSVjDoVjMp1kdcaliE8OUV4JLOxbiscoq+RpHi+Oa4m+F39exbWscf2yqVmzc4Z+7bsaeFSEXZGzwjbV7ZdSbW4sWpgozya0KaezmsuXczK1Tw6ibzjPLyZn4ezzNRnLemFhcEoyUnrpkdNQVoJdjWs2kdF5I6cE7eL5N6hjEB6HjMYAABYBgIYABhDQDOboBiGADBDNRmkO4BYqBjQhoVZe3CYiPDKS6Sl92RUi7bcOGrUXSUvrma+lWueDKd19PG9MuNTMWJxbjktX10XcojPMtxNK8U/n5COuN2x7uTvJ3YsThuJWt918mazHUsVSqJ0p03RlZJTi3KDet5X0M7C1sXKMZfuXxXSyla6N7ka7rA/YZ03eLku3E3HyszcYXaNVWy01isiUa2IScpUacop2k43Wfqi6eKlHXDtZXVmrtdhuGrCdapPOT7pdDP2bjL5N6GpW1sNUm6UZqNaOtJpqa9OhZQT8S60evmPXaeW+nV4efE0upuTR7Ei5Su/wq5vTvxft875N70QwA7PKYCGADEMAAAAw0MQGHQxiJRQkLTQDImmDGRQwugAGFj9rUKEoU6lSKq1VJ0qWs5qKzaS5LqS3U2sxtrmt5mvGnbql62zOYrVXCWuRvsbPjbb1k235s0WKpXTT5fc8O/K9Poyai/D4pS/zNlQqtq3I5DDYpwk4vl9jd4fHW5ry6I3prHPTY13y5M11ClUpypeFUlCFJ1G6KSlGTmnnnm889TZ0pKaundPmiqph5cuQnp0lThtGboulKSU5L3qjhJK/Ff4S/G7Yqzt4Mad8k+OMrNLo+RgKpK9m5+ufyM7CUr6t/KyFxjX4KdjbJjCdTEVLSr1m3Kds0vyxvokbeEUlkhzVo9jK2Lg3VlxyX7uL/xNchJcrpw5M5j23GycPwU7vWWb8uRnERo9mMkj5mWXldgYAVkDAAAYhgOwguAGGMiSMOgRYQiOTNSs02xCFKVrttJLNt5JLq2SrIkhpM4PeH2qYDDSlTpKeKqR18K0aSfTxHr6Hlm83tFx+Nk14jo0vw0cPKUIr+aS96T9SxXtG8+/eBwHHCpU8TEQSth6XvTcnopPSPqeH7R3wxFfHrHztxpqMaafuRo6eGv/ALXM5udacm3Ntt5tt3bfVvmRepLjv2stj3HAY+FeEakJJxmlJf5PuiytSUl3PMdxtuuhVVGcv3VV2jfSFR/oz1OKvoeHLDwv8e/DPyxcptPZ8pNyWq0XJowKWMafDK8XzOwxFC/LPkzntp7NvdtWlykvsalW47bTY+1Umot5PTzOip4yEuaueZyp1YNZaaPUysPtCqnle5raY3T0VRj5/IyqTijhMPtPEyygvpkdhuzsmviG515xjCNlwwzlJ9L8izu6Ms/Gbrb4bAOvL8tKLzfOT/KjoaVOMYqMUkkrJLkhU6UYJRirRWSRNHoxx08HJn5UDQhm3IDEMAGIaAYCGAAAAYaGJFeIxEKcJVKkowpwV5Tm1GMV1bZzdFtwfXpq3kku7PMt4vazTg3DA0vFd7ePVbjTt1jDWXqed7c3txuLv4+IqOP/AC4Pw6S/pWvqaiV7LvR7QsDgYtKaxFflRoNPP+KekUePb17943aF41Z+FQemHotqH9b1k/PI5qpmVoLBxcrCy5CaIlBPqBJ5lcQA9T3A3iVeKw9WS8amvdb1qQXPu1zPLmieGrzpTjUpycZwalGS1TRnPHyjfHncb/H0F4VyuWGi1Zr5ms3M3jhjqOqjXp2VWnlr+ePWLOj8M8tx17e6ZbjT1dlQly9ORhf7nSz4TonCwZGdFavC4G3Kx1O7G0KE3Ww0JLxsM4OtF62qRvGS7cjXUoI8VhvHisFtiti428V1asZwk2oVKbdlB25WS+R14vblzfV9MjOE3a9qGDxU1SrReFqPJOpJSpSl0U+Xqd1F3V9b5prRrqel4DAARSgYhhAAAAxiGAAAAavHYynQpTrVZKFOmnKcnokv1PAt+t9Ku0arSvDDQb8Kkna6v8c7at/Qr3234xG0p8OdLCwd6dBP4mnlOo+cu2iOTkzEdek5VLhcrQKZpFiYO3Ij5EZZZrUGkrFc0WRnfzCwFKYVOqCpESd1YBxY2QgyYRlbL2hVw1aNejK04P8ApkucZLmme47rbxUsfSU6btUjZVaT+KnK326M8EMzY+1K2ErRr0ZcM48tYzjzhJc0zOWMrrx8lxr6L4SUqK6Gn3V3jo7QpcdNqNSKXjUb+9Tl17x6M38Vc81mvb1736Y842izwnfajbGykubTZ9AuGR4dv/TUcW11bl6E4/unLPwc9Pr8zt9xPaLVwVqNfirYXkr/ALyj3i3quzOJp5r6FUo2Z63g0+pdjbZw+MpqrhqsakOaWU4vpKOqZnny3snalbDVFVoVJU6kfxRevZrmvM9u3H9oNLHcNGvw0sU8kllTrfy30fYu0sdwANAWMhDEMBDAAAAGB8fSkRTEh3I6FdjTFIrbCLHDmmEJX8whK5U20wqcnZlylcplnl8mFGVnYoskimOpktGPVVmQ2T1JxdyMvuEQJBe5JlclzBGdsraVbCVY1qE3CpHnykucZLmn0Pb9yt8aW0I8OVPERV50b/OUPzRPBE8izB4qpSqRqUZuFSD4oyTs4tfczljK6YZ3GvojH4+X7S4RlaFCn78V+KrV+FPsoq/qeM76Y1VcbUad1TtTXmtTZ4PfapDxnVhx18U41JVFJRpxfBwqSj0so5dmcZOo5Sbbu222+rucsMNZOufJLiyKDun3uSauu6KIT95GRLJnd5UEy+nUaaabTVmmnZprRp9SqpC5G/0IPbvZx7QYYiEcLjaijiYtRpVJZRxEeSb0U+Xc9HsfJilZp/r+p7b7Kd9pYqP7FiXevSjelVbzr01yf8a+qDNj0YAA0gGIYAMQAfHiBgxEdAJoYBFadiUlddwkiEJWYU6b5MJfVfVBOOd+TJPPzX2KL4O6K8RHLyDDyyLJ6MCq2SIslTzQOIDpjsKDsWSjzBGO1YcocXmWSjcptZkGVGTfAn+FST6NZlcHbuxwq5WeaZfBx6IFQpQd7sypO5FLoMBp/NCa5/MRIIrkZWz8fUoVKeIpO1WhKM4crtcn2enqUSV1kV0mB9WbKx8cTQpYiHw14RqLtxK9vQyzkfZPifE2Rhs7+H4lJ9uGbsvkzrgxoDENlAAgA+PZCFcEyN6MBkbgEiE0SbEIpQd8hp2fkVljV1dar6ooKeUn9C2buU30foSVTkQqeG0J2IUCbYIgXweRSkWwCQcJVVhzRehFViJl0ZEatOxCJBmU5l2phwkX05hPS1gCdwsFKOTK3rdaP7l3CY6lwykno80Er2j2D4/ioYrD3/u6kKkV0U42f1R6keJf7P8AW/tGLi9ZUqcv8NR/5ntorAAAAAACj47kRACOqcdCEgArJiAA0rmW0uXqABlBaerF0ACKupaDmAAnpJaE6YAEWRIsAClVMeIABOBbEAKL4lnIACUIxsX8X9IAB6B7Bf8Aj6n/AG1T/wB4nvSACVkIBgRAAAUf/9k="/>
        //     <div className={s.headerSite}>
        //         PAPICH-BEST-STREAMER
        //     </div>
        //     <div className={s.loginBlock}>
        //         { (props.isAuth ? <div>{props.login} <button onClick={props.logout}>Logout</button></div> : <NavLink to="/login">Login</NavLink>)}                
        //     </div>
        // </header>
    )
}