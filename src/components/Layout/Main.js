import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'
import {withRouter, Link, Route} from 'react-router-dom'
import {Layout,  Icon, Menu } from 'antd'

import './Main.css'
import logo from  '../assets/imgs/resizeApi.ico'
import asyncComponent from '../commons/AsyncComponent'
import bg from '../assets/imgs/loginBg.jpeg'




const { Header, Content,  Sider } = Layout;
const {SubMenu} = Menu

const Manager = asyncComponent(() => import('../../router/wages/Manager'))
const Wages = asyncComponent(() => import('../../router/wages/views/List'))
const Noti = asyncComponent(()=>import('./Noti'))

const rentingBooks = asyncComponent(() => import('../backend/view/rentingBooks'))
const bookManage = asyncComponent(()=>import('../backend/view/BookManage'))

@inject('appStore','bookStores') @withRouter @observer
export default class Main extends Component {
    leftMenu = {
        book:{
            itemName1:'租赁购买',
            itemName2:'图书管理'
        }

    }


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
        const {appStore, bookStores} = this.props;
        return (
            <Layout id="components-layout-demo-custom-trigger" style={{height: '100vh'}}>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={appStore.collapsed}>
                    <div className="logo">
                        <img style={styles.logoImg} alt="后台管理系统" src={logo}/>
                        {!appStore.collapsed && <span style={styles.logoText}>lazyliang</span>}
                    </div>
                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode={appStore.leftMenuMode}
                        theme="dark"
                    >
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
                            <span>简介</span>
                            <Link to={'/noti'}/>
                        </Menu.Item>
                        <SubMenu key='bookManage' title={<span><Icon type="book" /> <span>书籍板块</span></span>}>
                            {/*<Menu.Item key="rentingBooks" >*/}
                            {/*    <div onClick={() => this.rentingBooks(key, this.leftMenu.book.itemName1)}> <span>{this.leftMenu.book.itemName1}</span> </div>*/}
                            {/*</Menu.Item>*/}
                            {/*<Menu.Item key="buyBook" >*/}
                            {/*    <div onClick={this.buyBook(key, this.leftMenu.book.itemName2)}><span>{this.leftMenu.book.itemName2}</span></div>*/}
                            {/*</Menu.Item>*/}
                            <Menu.Item key={'rentingBooks'}>
                                <spon>
                                    {this.leftMenu.book.itemName1}
                                </spon>
                                <Link to={'/rentAndBuy'}/>
                            </Menu.Item>
                            <Menu.Item key={'bookManage'}>
                                <span>{this.leftMenu.book.itemName2}</span>
                                <Link to={'/bookManage'}/>
                            </Menu.Item>
                        </SubMenu>
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
                        <Route path="/noti" component={Noti}/>
                        <Route path={'/rentAndBuy'} component={rentingBooks}/>
                        <Route path={'/bookManage'} component={bookManage} />
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