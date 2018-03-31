import {inject, observer} from "mobx-react/index";
import {withRouter} from "react-router-dom";
import React, {Component} from "react";

@inject('appStore')  @observer
export default class Main extends Component {
    render(){
        return(
            <div>123</div>
        )
    }
}