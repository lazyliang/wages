import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import asyncComponent from './components/commons/AsyncComponent'
const Login = asyncComponent(() => import('./components/Layout/Login'))
class App extends Component {
  render() {
      return (
          <Login/>

      );
  }
}

export default App;
