import { observable, action, runInAction, computed } from 'mobx'
import { message } from 'antd'
import { json, get } from '../utils/ajax'

class WagesStore {
    @observable loading
    @observable modal
    @observable search
    @observable pagination
    @observable list
    @observable resources
    @observable series
    @observable editFields
    @observable motorcycleTypeCode
    @observable info
    @observable forms

    constructor () {
        this.info = {
            motorcycleTypeCode: {}
        }
        this.loading = false
        this.modal = 'hide'
        this.search = {}
        this.pagination = {}
        this.list = []
        this.forms = {
        }
    }

    @action
    initWages=async()=>{
        runInAction(()=>{
            this.loading = true
        })
        const res = await get(`${process.env.REACT_APP_API_URL}/wages:search`)
        runInAction(()=>{
            this.list = res.content.map(l=>{
                return{
                    id:l.id,
                    userName:l.userName,
                    num:l.num,
                   year:l.year,
                    month:l.month,
                    sum:l.sum
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

}

export default new WagesStore()