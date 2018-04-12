import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter, Link, Route } from 'react-router-dom'
import { Layout,collapsed, Row, Col, Icon, Menu ,Spin, Button,Card } from 'antd'



import asyncComponent from '../commons/AsyncComponent'
import Bundle from "../commons/Bundle";


const Manager = asyncComponent(()=>import('../../router/wages/Manager'))
const Wages = asyncComponent(()=>import('../../router/wages/Wages'))




const {Header, Content, Sider} = Layout
const {SubMenu, Item} = Menu

@inject('appStore') @withRouter @observer
export default class Main extends Component {

    componentDidMount() {

        this.props.appStore.initUserInfo(this.props.appStore.currentName)
        console.log(this.props.appStore.stateforUser,'is')
    }
   toManager = () => {
      const info1 = this.props.appStore.info
            console.log(info1,'info')
       if(info1.state!==0){
             this.props.appStore.changeState()
       }
      console.log( this.props.appStore.stateforUser,'hha')

   }
    state = {
        collapsed: false,
    }
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }



    render() {

        return(
            <Row>
                <Col span={18} push={5}>
                    <Card title="工资管理系统">
                        <Route  path="/userManager" component={Manager}/>
                        <Route  path="/wagesManager" component={Wages}/>
                </Card>
                </Col>
                <Col span={6} pull={18}>
                    <div style={{ width: 256 }}>
                        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                            <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                        </Button>
                        <Menu
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                            theme="light"
                            inlineCollapsed={this.state.collapsed}
                        >
                            <Menu.Item key="1" >
                                <Icon type="pie-chart" />
                                <span>用户管理</span>
                                <Link to={'/userManager'}/>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="desktop" />
                                <span>工资管理</span>
                                <Link to={'/wagesManager'}/>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="inbox" />
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
                    </div>
                    </Col>
            </Row>
        )
    }


    toUrl = ()=>{
        return(
            <a href="http://www.baidu.com" target="_blank">sd</a>
        )
    }
}

const styles = {
    cardBody: {
        padding: '8px',
    },
}

