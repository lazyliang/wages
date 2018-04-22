import {inject, observer} from "mobx-react/index";
import {withRouter} from "react-router-dom";
import React, {Component} from "react";
import './Noti.css'

@inject('appStore') @withRouter @observer
export default class Noti extends Component {
render(){
    return(




        <body>
        <h6>大家好<br/></h6>
        <h6>我是这个系统的开发人员<br/></h6>
        <h6>由于时间仓促并没有做太多的bug测试，与及部分功能的后续完善<br/></h6>
        <h6>现只完成了用户管理与工资管理这2个小模块<br/></h6>
        <h6>而且只是对管理者开放，对数据进行维护的。<br/></h6>
        <h6>后期将会开放前台用户查询界面，与及用户反馈功能<br/></h6>
        <h6>还会增加计划报表、用户年工资月工资报表的导入导出功能、个人工资的燃点图。<br/></h6>
        <h6>该系统仅为平台的一部分，以后的架构将会是一个用户可以根据权限使用多个系统。</h6>
        <h6>由于是刚开始做，很多不足之处请见谅，有好的建议请发至:<br/></h6>
        <h6>个人邮箱:101549234@qq.com<br/>  github：https://github.com/lazyliang<br/></h6>

        </body>

)
}
}