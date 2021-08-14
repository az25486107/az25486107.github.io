import {router} from "./router.js"
import {test_article,main_nav,css,photo_list,search_data} from "./data/demo.js"


let sub_tab="article"

let subnav={
    "article":{cht:"文章",state:false},
    "activity":{cht:"活動",state:false },
    "view":{cht:"景點",state:false},
    "resta":{cht:"餐廳",state:false},
    "hotel":{cht:"飯店",state:false}
}
let user_data={
    Uaccount:"",
    Upwd:""
}
let error_msg={
    "acc":"",
    "pwd":""
}
let hime="page"
let vm=new Vue({
    el:"#app",
    data:{user_data,error_msg,index:1,search_data,photo_list,css,sub_tab,hime,subnav},
    router,
    computed:{/*即刻運算*/
        selected(){
            let new_arr=this.search_data.forEach(function(item,index,array){
                if(item.selected==true && array[0]!=item){
                    array[0]= Object.assign({},item)
                    array[0].type=array[0].type+" ▼"
                }
            })
            return this.search_data
        },
        route(){
            console.log(window.location.hash)
            return window.location.hash.split("/")[1]
        }
    },
    mounted(){
        this.intervalId = setInterval(this.scroll, 5000)
    },
    watch:{
        tmp_location:function () {  
            for (let prop in tmp_location) {
                if (prop==tmp_location){
                    page[prop]=true
                }else{
                    page[prop]=false
                }
              }
        }
    },
    methods:{/*方法*/
        scroll(){
            setTimeout(() => {this.index=(this.index+1)%4}, 1000)
        },
         // 間隔時間後重復執行
        select_item(event){
            let tar=event.target.innerText;
            this.search_data.forEach((item,index) => {
                if(item.type==tar){
                    item.selected=true
                }else{
                    item.selected=false
                }
            })
            console.log(event.target.innerText)
            return event.target.innerText
        },
        open_travel_window(){
            this.css.black_block.display=true
            this.css.top_anno.display=true
        },
        close_other(){
            this.css.black_block.display=false
            this.css.top_anno.display=false
            this.css.signin.display=false
        },
        open_signin_window(){
            this.css.black_block.display=true
            this.css.signin.display=true
        },
    }
})




