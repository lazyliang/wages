import {observable, action, runInAction} from "mobx";
import {get,json} from "../../router/utils/ajax";
import { handleSeerchAndPage } from '../../router/utils/Utils'
class bookStores {
    @observable bookInfoModelStatus;
    @observable loading;
    @observable pagination;
    @observable bookInfo;
    @observable rowInfo;
    @observable mForm;
    @observable searchField
    constructor() {
        this.bookInfoModelStatus = 'hide';
        this.loading = false;
        this.pagination = {
            current:0,
            total:1,
            showQuickJumper:true,
        }
        this.bookInfo = [];
        this.mForm = {

        };
        this.rowInfo = {
            abstracts:'',
            bookName:''
        };
        this.searchField = {
            nameOrAuthor:''
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

        })
    }



}

export default new bookStores()