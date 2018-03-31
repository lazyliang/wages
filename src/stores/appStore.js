import {observable, action, runInAction} from 'mobx'
import {json, post, get} from '../router/utils/ajax'
import * as Session from '../router/utils/Session'
import { message }from 'antd'

class AppStore {
    @observable num
    @observable flag
    @observable forms
    @observable editFields
    @observable isLogin
    @observable currentName
    @observable stateforUser
    @observable info
    constructor() {
        this.isLogin = !!Session.isAuthenticated()
        this.num = 0
        this.flag = ''
        this.forms = {}
        this.editFields = {permissions: {value: []}}
        this.currentName =''
        this.stateforUser = false
        this.info = []
    }


    @action
    calculate = () => {
        runInAction(() => {
            this.num++;
        })
    }

    @action.bound
    onFormsChange = (changedFileds) => {
        const fileds = {...this.fileds, ...changedFileds}
        let forms = {
            loginName: fileds.loginName.value,
            password: fileds.password.value
        }
        this.forms = forms
    }

    @action login = async values =>{

            const res = await post(`${process.env.REACT_APP_API_URL}/login`,values)
            console.log(values,'res')
          if (res.data===200){
            runInAction(()=>{
                this.isLogin = true
                this.currentName = values.loginName
            })
          }else {
                message.error("用户名或密码错误，登录失败")
          }


    }

    @action changeState = async() =>{
        runInAction(()=>{
            this.stateforUser =true

        })
    }

    @action
    initUserInfo = async (loginName) =>{
        const res = await  get(`${process.env.REACT_APP_API_URL}/findOne?loginName=${loginName}`)
        console.log(res,'res is here')
        runInAction(()=>{
            this.info = res
        })
    }

    @action
    getJava = async () => {
        // let result = fetch(`http://localhost:9091/new/haha`, { credentials: 'include', headers: { 'Accept': 'application/json, text/plain, */*' } });
        // result.then(res => { return res.text() }).then(text => { console.log(text) })
        const res = await get(`${process.env.REACT_APP_API_URL}/new/web`)
        if (res.status === 0) return
        runInAction(() => {
            this.flag = res
        })
        // console.log('213',res)
        // runInAction(()=>{
        //  this.flag=res
        // })

    }


}

export default new AppStore()
