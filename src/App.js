import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import { Switch, Route ,withRouter } from 'react-router-dom'

import asyncComponent from './components/commons/AsyncComponent'
const Login = asyncComponent(() => import('./components/Layout/Login'))
const Main = asyncComponent(()=>import('./components/Layout/Main'))


@inject('appStore')@withRouter @observer
export default class App extends Component {
  render() {
   const { isLogin } = this.props.appStore
      return isLogin ? (
          <Switch>
            <Route path="/" component={Main}/>
          </Switch>
      ):<Login/>

  }
}

