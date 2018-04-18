import React, {
    Component
} from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { Button, Card, Form, Input, Table, Modal } from 'antd'




@inject('wagesStore') @withRouter @observer
export default class List extends Component {
    render(){
        return(
            <div>123</div>
        )
    }
}