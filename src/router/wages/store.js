import {observable, action, runInAction, computed} from 'mobx'
import {message} from 'antd'
import {json, get} from '../utils/ajax'

class WagesStore {
    @observable loading
    @observable modal
    @observable search
    @observable pagination
    @observable list
    @observable resources
    @observable series
    @observable editFields
    @observable forms
    @observable mForm
    @observable modals
    @observable users

    constructor() {
        this.loading = false
        this.modal = 'hide'
        this.search = {}
        this.list = []
        this.forms = {}
        this.mForm = {}
        this.editFields = {permissions: {value: []}}
        this.userInfos = []
        this.modals = 'hide'
        this.users = {}
        this.page = {
            current: 0,
            total: 1
        }
        this.pagination = {
            current: 0,
            total: 1
        }
    }

    @action
    initUserInfo = async ()=>{
        const res = await get(`${process.env.REACT_APP_API_URL}/users:search`,
            {  'size':200})

        if (res && res.status === 0) {
            return
        } else {
            runInAction(() => {
                this.userInfos = res.content
            })
        }
    }

    @action
    initWages = async (page) => {
        runInAction(() => {
            this.loading = true
        })
        const res = await get(`${process.env.REACT_APP_API_URL}/wages:search?page=${page}`)
        runInAction(() => {
            this.list = res.content.map(l => {
                return {
                    id: l.id,
                    userName: l.userName,
                    num: l.num,
                    year: l.year,
                    month: l.month,
                    sum: l.sum,
                    addtion:l.addtion,
                    overTime:l.overTime,
                    baseWages:l.baseWages,
                    yk:l.yk
                }
            })
            this.pagination = {
                total: res.totalElements,
                results: res.size,
                current: res.number+1,
            }
            this.forms = {}
        })
        this.loading = false
    }

    @action save = async () => {
        console.log(this.mForm, 'mform')
        if (this.mForm.id) {
            // const res = await json.put(`${process.env.REACT_APP_API_URL}/user/updateOne`, {
            //     ...this.mForm, isDelete:'0',
            // })
            // if (res && res.status === 0) {
            //     runInAction(()=>{
            //         this.modal = 'hide'
            //         message.error("修改失败")
            //         this.initUser()
            //     })
            //     return
            //
            // }else{
            //     runInAction(() => {
            //         this.modal = 'hide'
            //         message.success('修改成功')
            //         this.initUser()
            //     })
            // }
        } else {
            const res = await json.post(`${process.env.REACT_APP_API_URL}/wages/createOne`, this.mForm)
            console.log(res, 'res')
            if (res && res.status === 0) {
                runInAction(() => {
                    this.modal = 'hide'
                    message.error("新增失败")
                    this.initWages()
                })
                return

            } else {
                runInAction(() => {
                    this.modal = 'hide'
                    message.success('新增成功')
                    this.initWages()
                })
            }

        }
    }

    @action.bound
    onEditField(changedFields) {
        const fields = {...this.fields, ...changedFields}
        let mForm = {
            id: fields.id.value,
            userName: fields.userName.value,
            num: fields.num.value,
            year: fields.year.value,
            month: fields.month.value,
            baseWages: fields.baseWages.value,
            addtion: fields.addtion.value,
            overTime: fields.overTime.value,
            userId:fields.userId.value,
            yk:fields.yk.value
        }
        this.mForm = mForm
    }

    @computed
    get fields() {
        let fields = {
            id: {value: this.mForm.id},
            userName: {value: this.mForm.userName},
            num: {value: this.mForm.num},
            year: {value: this.mForm.year},
            month: {value: this.mForm.month},
            baseWages: {value: this.mForm.baseWages},
            addtion: {value: this.mForm.addtion},
            overTime: {value: this.mForm.overTime},
            userId:{value:this.mForm.userId},
            yk:{value:this.mForm.yk}
        }
        return fields
    }

    showDetail = async(record) =>{

        console.log(record,'321')
        runInAction(()=>{
            this.users = record
            this.mForm = record
        })
        console.log('123',this.mForm)
    }
    @action
    showModals = () =>{
        runInAction(()=>{
            this.modals = 'show'
        })
    }

    @action
    initEdit = async (id) => {
        runInAction(() => {
            this.loading = true
        })
        if (!id) {
            runInAction(() => {
                this.loading = false
                this.modal = 'show'
                this.mForm = {
                    userName: '',
                    num: '',
                    year: '',
                    month: '',
                    baseWages: '',
                    addtion: '',
                    overTime: '',
                    userId:'',
                    yk:''
                }

            })
        }
    }
}

export default new WagesStore()