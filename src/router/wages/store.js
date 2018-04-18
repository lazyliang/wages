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
            isDelete: '',
            state: '',
            languageMotorcycleType: []
        }
    }


}

export default new WagesStore()