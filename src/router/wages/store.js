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

    constructor() {
        this.loading = false
        this.modal = 'hide'
        this.search = {}
        this.pagination = {}
        this.list = []
        this.forms = {}
        this.mForm = {}
    }

    @action
    initWages = async () => {
        runInAction(() => {
            this.loading = true
        })
        const res = await get(`${process.env.REACT_APP_API_URL}/wages:search`)
        runInAction(() => {
            this.list = res.content.map(l => {
                return {
                    id: l.id,
                    userName: l.userName,
                    num: l.num,
                    year: l.year,
                    month: l.month,
                    sum: l.sum
                }
            })
            this.pagination = {
                total: res.totalElements,
                results: res.size,
                page: res.number,
            }
            this.forms = {}
        })
        this.loading = false
    }

    @action
    save = async () => {


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
            overTime: fields.overTime.value
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
            overTime: {value: this.mForm.overTime}
        }
        return fields
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
                }

            })
        }
    }
}

export default new WagesStore()