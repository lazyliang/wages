import {observable, action, runInAction, computed} from 'mobx'
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
    @observable pagination
    @observable list
    @observable loading
    @observable modal
    @observable userInfo
    @observable modals
    @observable mForm
    constructor() {
        this.isLogin = !!Session.isAuthenticated()
        this.num = 0
        this.flag = ''
        this.forms = {}
        this.editFields = {permissions: {value: []}}
        this.currentName =''
        this.stateforUser = false
        this.info = []
        this.pagination = {}
        this.list = []
        this.loading = false
        this.modal = 'hide'
        this.userInfo = {}
        this.modal = 'hide'
        this.mForm = {}
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
              runInAction(()=>{
                  this.loading = false
              })
          }
    }

    @computed
    get fields(){
        let fields = {
            id:{value:this.mForm.id},
            name:{value:this.mForm.name},
            age:{value:this.mForm.age},
            sex:{value:this.mForm.sex},
            address:{value:this.mForm.address},
            password:{value:this.mForm.password},
            tel:{value:this.mForm.tel},
            loginName:{value:this.mForm.loginName}
        }
        return fields
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

    @action
    initUser = async ()=> {
        runInAction(()=>{
            this.loading = true
        })
        const res = await get(`${process.env.REACT_APP_API_URL}/users:search`)
        runInAction(()=>{
            this.list = res.content.map(l=>{
                return{
                    id:l.id,
                    name:l.name,
                    sex:l.sex,
                    age:l.age,
                    loginName:l.loginName
                }
            })
            this.pagination = {
                total: res.totalElements,
                results: res.size,
                page: res.number,
            }
        })
         this.loading = false
    }

    @action
    showDetail = async(id) =>{
        const  res = await get(`${process.env.REACT_APP_API_URL}/user/findOne?id=${id}`)
        runInAction(()=>{
            this.mForm = res
        })
    }

    @action
    showModal = () =>{
        runInAction(()=>{
            this.modal = 'show'
        })
    }

    @action
    showModals = (record) =>{
        runInAction(()=>{
            this.userInfo = record
            this.modals = 'show'
        })
    }


    @action
    initEdit = async (id)=>{
        runInAction(()=>{
            this.loading = true
        })
        if (!id){
            runInAction(()=>{
                this.loading = false

            })
        }
    }

    @action.bound
    onEditField(changedFields){
        const fields = {...this.fields, ...changedFields}
        let mForm = {
            id:fields.id.value,
            name:fields.name.value,
            age:fields.age.value,
            sex:fields.sex.value,
            address:fields.address.value,
            tel:fields.tel.value,
            password:fields.password.value,
            loginName:fields.loginName.value
        }
        this.mForm = mForm
    }

    @action submit = async () =>{
        runInAction(()=>{
            this.loading = true
        })
    }

    @action save = async () => {
        console.log(this.mForm,'mform')
        if (this.mForm.id) {
            const res = await json.put(`${process.env.REACT_APP_API_URL}/user/updateOne`, {
                ...this.mForm, isDelete:'0',
            })
            // if (res && res.status === 500) {
            //     return
            // }else {
            //     await this.searchMotorcycleTypeList(this.pagination.page)
            // }
        } else {
            const res = await json.post(`${process.env.REACT_APP_API_URL}/user/insert`, this.mForm )
            // if (res && res.status === 500) {
            //     return
            // }else {
            //     await this.searchMotorcycleTypeList(this.pagination.page - 1)
            // }
        }

        runInAction(() => {
            this.modal = 'hide'
            this.mForm.id ? message.success('修改成功') : message.success('新增成功')
        })
    }


}

export default new AppStore()
