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
    searchByNameOrAuthor = async (value, page)=>{
        let search
        let res
        if (value){
                this.searchField.nameOrAuthor = value

        }
        search = handleSeerchAndPage(page, this.pagination, this.searchField)

        res = await json.get(`${process.env.REACT_APP_API_URL}/search:books`,search);
        this.loading = true;

        console.log(search,'ggggggh')
        console.log(res,'res')
        runInAction(()=>{
            this.bookInfo = res.content

            this.loading = false

        })

        console.log(this.bookInfo,'bookinfo')
        this.pagination = {
            total: res.totalElements,
            results: res.size,
            current: res.number + 1,

        }

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
    hideModel=() =>{
        this.bookInfoModelStatus = 'hide';
        console.log(Date()+'ooooo')
    }

    // @action
    // initBook = async (page)=>{
    //     runInAction(()=>{
    //         this.loading = true;
    //     })
    //     let search = handleSeerchAndPage(page, this.pagination, this.searchField);
    //     const res = await get(`${process.env.REACT_APP_API_URL}/search:books`,search);
    //     runInAction(()=>{
    //         this.bookInfo = res.content;
    //         //     .map(s=>{
    //         //     return{
    //         //         id:s.id,
    //         //         bookName:s.bookName,
    //         //         author:s.author,
    //         //         publicationDate:s.publicationDate,
    //         //         abstracts:s.abstracts
    //         //     }
    //         // })
    //
    //         this.pagination = {
    //             total: res.totalElements,
    //             results: res.size,
    //             current: res.number+1,
    //         }
    //         this.mForm = {};
    //     });
    //
    //     this.loading = false;
    // };


    // @action
    // initDetail = (record) => {
    //     runInAction(() =>{
    //         this.rowInfo = record;
    //         }
    //     )
    // }
    // @action
    // initRowInfo = (record)=> {
    //     runInAction(()=>{
    //         this.rowInfo = record;
    //         this.mForm = record;
    //     })
    //
    // }

}

export default new bookStores()