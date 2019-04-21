import {observable, action, runInAction} from "mobx";
import {get,json} from "../../router/utils/ajax";
import { handleSeerchAndPage } from '../../router/utils/Utils'
class bookStores {
    @observable bookInfoModelStatus;
    @observable bookModifyModalStatus;
    @observable loading;
    @observable pagination;
    @observable bookInfo;
    @observable rowInfo;
    @observable mForm;
    @observable searchField
    @observable selectedValues      //联级查询被选择的条件
    @observable addParams


    constructor() {
        this.bookInfoModelStatus = 'hide';
        this.bookModifyModalStatus = 'hide';
        this.loading = false;
        this.pagination = {
            current: 0,
            total: 1,
            showQuickJumper: true,
        }
        this.bookInfo = [];
        this.mForm = {};
        this.rowInfo = {
            abstracts: '',
            bookName: ''
        };
        this.searchField = {
            nameOrAuthor: '',
            type1: '',
            type2:''
        }
        this.addParams = {
            id:'',
            bookName:'',
            author:'',
            publicationDate:'',
            abstracts:'',
            type1:'',
            type2:''
        }
    }

    @action
    initBooks = async (page)=>{
        // runInAction(()=>{
        //     this.loading = true
        // })
        let search = handleSeerchAndPage(page,this.pagination,this.searchField)
        const res = await get(`${process.env.REACT_APP_API_URL}/search:books`, search)
        runInAction(()=>{
            this.bookInfo =  res.content.map(l=>{
                return{
                    id:l.id,
                    bookName:l.bookName,
                    author:l.author,
                    publicationDate:l.publicationDate,
                    abstracts:l.abstracts
                }
            })
            //this.loading = false
            this.pagination = {
                total: res.totalElemensts,
                results: res.size,
                current: res.number+1,
            }

        })
    }
    @action
    showBookInfoModel = (value)=>{
        runInAction(()=>{
            this.rowInfo.abstracts = value.abstracts;
            this.rowInfo.bookName = value.bookName;
            this.bookInfoModelStatus = 'show' ;
        })

        console.log(this.bookInfoModelStatus,'ssssss')
    }

    @action
    hideModel = ()=>{
        this.bookInfoModelStatus = 'hide';
        this.bookModifyModalStatus = 'hide'
        console.log(Date()+'ooooo')
    }

    @action
    inquire = async (value, page)=>{
        runInAction(()=>{
            this.loading = true
            this.searchField.nameOrAuthor = value;
        })
        let search = handleSeerchAndPage(page,this.pagination,this.searchField)
        const res = await get(`${process.env.REACT_APP_API_URL}/search:books`, search)
        runInAction(()=>{
            this.bookInfo = res.content
            this.loading = false
            this.pagination = {
                total: res.totalElemensts,
                results: res.size,
                current: res.number+1,
            }
            this.searchField.nameOrAuthor = ''

        })
    }

    @action
    showSelectedValues = (value)=>{
        runInAction(()=>{
            this.searchField.type1 = value[0];
            this.searchField.type2 = value[1];
        })
        console.log("value:",value[0],value[1])
    }

    @action
    searchByTypeOrName = async (value, page)=> {
        runInAction(() => {
            if (value) {
                this.searchField.nameOrAuthor = value;
                console.log(this.searchField.type,"type value")
            }
        })
        let search = handleSeerchAndPage(page, this.pagination, this.searchField)
        console.log(search,"search value")
        const res = await get(`${process.env.REACT_APP_API_URL}/search:books`, search)
        runInAction(()=>{
            this.bookInfo = res.content
            this.pagination = {
                total: res.totalElemensts,
                results: res.size,
                current: res.number + 1,
            }
            this.searchField.nameOrAuthor = ''
        })
    }

    @action
    modifyBookInfo = async ()=>{

    }
    //修改书籍信息
    @action
    showBookModifyModalStatus = ()=>{
        this.bookModifyModalStatus = 'show'
    }

    // onEditField = ()=>{
    //     const fields = {...this.fields, ...changedFields}
    //     let mForm = {
    //         id:fields.id.value,
    //         name:fields.name.value,
    //         age:fields.age.value,
    //         sex:fields.sex.value,
    //         address:fields.address.value,
    //         tel:fields.tel.value,
    //         password:fields.password.value,
    //         loginName:fields.loginName.value
    //     }
    //     this.mForm = mForm
    // }

}

export default new bookStores()