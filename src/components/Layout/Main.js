import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'
import {withRouter, Link, Route} from 'react-router-dom'
import {Layout, collapsed, Row, Col, Icon, Menu, Spin, Button, Card} from 'antd'

import './Main.css'
import logo from  '../assets/imgs/title.ico'
import asyncComponent from '../commons/AsyncComponent'
import bg from '../assets/imgs/loginBg.jpeg'
import Bundle from "../commons/Bundle";


const { Header, Content, Footer, Sider } = Layout;
const {SubMenu, Item} = Menu

const Manager = asyncComponent(() => import('../../router/wages/Manager'))
const Wages = asyncComponent(() => import('../../router/wages/views/List'))
const Noti = asyncComponent(()=>import('./Noti'))

@inject('appStore') @withRouter @observer
export default class Main extends Component {

    componentDidMount() {

        this.props.appStore.initUserInfo(this.props.appStore.currentName)
        console.log(this.props.appStore.stateforUser, 'is')
    }

    toManager = () => {
        const info1 = this.props.appStore.info
        console.log(info1, 'info')
        if (info1.state !== 0) {
            this.props.appStore.changeState()
        }
        console.log(this.props.appStore.stateforUser, 'hha')

    }


    render() {
        const {appStore} = this.props;
        return (
            <Layout id="components-layout-demo-custom-trigger" style={{height: '100vh'}}>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={appStore.collapsed}>
                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode={appStore.leftMenuMode}
                        theme="dark"
                    >
                        <div className="logo">
                            <img style={styles.logoImg} alt="后台管理系统" src={logo}/>
                            {!appStore.collapsed && <span style={styles.logoText}>lazyliang</span>}
                        </div>
                        <Menu.Item key="1">
                            <Icon type="pie-chart"/>
                            <span>主页面</span>
                            <Link to={'/'}/>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="pie-chart"/>
                            <span>用户管理</span>
                            <Link to={'/userManager'}/>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="desktop"/>
                            <span>工资管理</span>
                            <Link to={'/wagesManager'}/>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Icon type="inbox"/>
                            <span>Option 3</span>
                        </Menu.Item>
                        {/*<SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>*/}
                        {/*<Menu.Item key="5">Option 5</Menu.Item>*/}
                        {/*<Menu.Item key="6">Option 6</Menu.Item>*/}
                        {/*<Menu.Item key="7">Option 7</Menu.Item>*/}
                        {/*<Menu.Item key="8">Option 8</Menu.Item>*/}
                        {/*</SubMenu>*/}
                        {/*<SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>*/}
                        {/*<Menu.Item key="9">Option 9</Menu.Item>*/}
                        {/*<Menu.Item key="10">Option 10</Menu.Item>*/}
                        {/*<SubMenu key="sub3" title="Submenu">*/}
                        {/*<Menu.Item key="11">Option 11</Menu.Item>*/}
                        {/*<Menu.Item key="12">Option 12</Menu.Item>*/}
                        {/*</SubMenu>*/}
                        {/*</SubMenu>*/}
                    </Menu>
                </Sider>
                <Layout id="main-layout-content">
                    <Header style={styles.header}>
                        <div style={styles.headerIcon}>
                            <Icon
                                className="trigger"
                                type={appStore.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={() => appStore.collapse()}
                            />
                        </div>
                        <Menu className="header-menu" mode="horizontal" style={styles.headerMenu}>
                            <SubMenu style={{float: 'right'}} title={<span><Icon type="user"/>{appStore.currentName}</span>}>
                                <Menu.Item key="logout">
                                    <a href={`http://localhost:3000`}><Icon type="logout"/>注销</a>
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Header>
                    <Content style={{width: '100%',height: '100%'}}>
                        <Route exact path="/" component={Home}/>
                        <Route path="/userManager" component={Manager}/>
                        <Route path="/wagesManager" component={Wages}/>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

const styles = {
    logoImg: {
        margin: '4px',
        width: '24px',
        lineHeight: '32px'
    },
    logoText: {
        verticalAlign: 'text-bottom',
        fontSize: '16px',
        textTransform: 'uppercase',
        display: 'inline-block',
        marginBottom: '4px',
        color: '#fff',
        transition: 'all .5s cubic-bezier(0.55, 0.055, 0.675, 0.19)',
    },
    header: {
        height: '48px',
        lineHeight: '48px',
        background: '#fff',
        padding: 0,
        borderBottom: '1px solid #e9e9e9',
    },
    headerIcon: {
        height: '47px',
        width: '47px',
        lineHeight: '47px',
        textAlign: 'center',
        fontSize: '18px',
        cursor: 'pointer',
        position: 'absolute',
        transition: 'all .3s cubic-bezier(0.55, 0.055, 0.675, 0.19)',
    },
    headerMenu: {
        float: 'right',
        marginRight: '30px',
    }
}

const Home = () => (
    <div style={{background: `url(${bg}) no-repeat`,backgroundSize: 'cover',width: '100%',height:'100vh',position: 'relative'}}>
        {/*<img src={text} alt="" style={{position: 'absolute',top: '50%',left:'50%',marginTop:'-160px',marginLeft: '-303px'}}/>*/}
    </div>
)