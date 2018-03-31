import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter, Link, Route } from 'react-router-dom'
import { Layout, Icon, Menu ,Spin, Button,Card } from 'antd'
import  Manager  from './Manager'

import asyncComponent from '../commons/AsyncComponent'
import Bundle from "../commons/Bundle";





const {Header, Content, Sider} = Layout
const {SubMenu, Item} = Menu

@inject('appStore') @withRouter @observer
export default class Main extends Component {

    componentDidMount() {

        this.props.appStore.initUserInfo(this.props.appStore.currentName)
        console.log(this.props.appStore,'is')
    }
   toManager = () => {
      const info1 = this.props.appStore.info
            console.log(info1,'info')
       if(info1.state!==0){
             this.props.appStore.changeState()
       }
      console.log( this.props.appStore.stateforUser,'hha')

   }




    render() {
        const { stateforUser } = this.props.appStore.stateforUser
       console.log(stateforUser)
        return(

          <Card><div>
              <Button  onClick={this.toManager()}  type="primary">进入管理员系统</Button>
              {console.log(stateforUser,'here')}
            {stateforUser?
                    <div>456</div>:
            <Manager/>
            }
          </div>
          </Card>


        )

        // return stateforUser(
        //
        // )


    }
}

