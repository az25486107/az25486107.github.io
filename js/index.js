import {router} from "./router.js"
import {test_article,main_nav,css,photo_list,search_data} from "./data/demo.js"

let host="http://127.0.0.1:3000"


Vue.component("article_page",{
    data:function(){
        return {test_article:test_article[this.subclass][this.subname]}
    },
    props:["subname","subclass"],
    template:
    `<div class="sect">
        <ul class="post">
            <p class="title">{{test_article.title}}</p>
            <li v-for="(item,key) in test_article.source" v-show="key<test_article.view_count" >
                <img :src=item.src  onerror="this.src='https://picsum.photos/400/250?random=487'" alt="">
                <div class="text">
                    <div class='title'>{{item.title}} </div>
                    <div class='content'>{{item.content}}</div>
                    <div class="comment">
                        <i class="fas fa-chart-line"></i><span>2808</span>
                        <i class="fas fa-heart"></i><span>2808</span>
                    </div>
                </div>
            </li>
            
            <li class="none_box" v-show="test_article.end_state" @click="more_count" ><a class="morSe_btn" href="javascript:void(0)">查看更多</a></li>
        </ul>
    </div>
    `,    
    methods:{
        more_count(){
            this.test_article.view_count+=3
            if(this.test_article.view_count>=this.test_article.source.length)
                this.test_article.end_state=false
        }
    }
})




Vue.component("view_page",{
    data:function(){
        return {test_article:{}}
    },
    props:["subname","subclass"],
    template:`
        <div class="sect">
            <p class="title">{{test_article.title}}</p>
            <ul class="view">
                <li v-for="(item,key) in test_article.source" v-show="key<test_article.view_count" ><img :src="item.src" onerror="this.src='https://picsum.photos/400/250?random=487'"><span>{{item.title}}</span></li>
                <li class="none_box" v-show="test_article.end_state" @click="more_count" ><a class="morSe_btn" href="javascript:void(0)">查看更多</a></li>
            </ul>
        </div>
    `,
    mounted:function(){
        let loading_count=20
        let title=this.subname==="hot"?"熱門景點":"最新景點"
        axios.get(host+'/api/attractions').then((res)=>{
            view={
                end_state:true,
                view_count:4,
                title:title,
                source:[]
            }
            for(let i=0;i<loading_count;i++){
                view["source"].push({
                    "src":res.data[i].Atphoto,
                    "title":res.data[i].Atname
                })
            }
            this.test_article=view    
        }) 
    },
    methods:{
        more_count(){
            this.test_article.view_count+=4
            if(this.test_article.view_count>=this.test_article.source.length)
                this.test_article.end_state=false
        }
        
    }
})


Vue.component("resta_page",{
    data:function(){
        return {test_article:{}}
    },
    props:["subname","subclass"],
    template:`
        <div class="sect">
            <p class="title">{{test_article.title}}</p>
            <ul class="resta">
                <li class="content" v-for="(item,key) in test_article.source" v-show="key<test_article.view_count">
                    <div class="t_group">
                        <p class="idx">{{key+1}}</p>
                        <p class="title">{{item.title}}</p>
                    </div>
                    <img :src='item.src' onerror="this.src='https://picsum.photos/400/250?random=487'">
                    <p class="text">{{item.content}}</p>
                    <p class="address"><span>位置資訊：</span>{{item.address}}</p>
                    <p class="worktime"><span>營業時間：</span>{{item.phone}}</p>
                </li>
                <li class="none_box" v-show="test_article.end_state" @click="more_count" ><a class="morSe_btn" href="javascript:void(0)">查看更多</a></li>
            </ul>
        </div>
    `,
    mounted:function(){
        let loading_count=30
        let title=this.subname==="hot"?"熱門餐廳":"最新餐廳"
        axios.get(host+'/api/restaurants').then((res)=>{
            data={
                end_state:true,
                view_count:8,
                title:title,
                source:[]
            }
            for(let i=0;i<loading_count;i++){
                data["source"].push({
                    "src":res.data[i].Rphoto,
                    "title":res.data[i].Rname,
                    "content":res.data[i].Rdescription,
                    "phone":res.data[i].Rphone,
                    "address":res.data[i].Raddress
                })
            }
            this.test_article=data
        })
    },
    methods:{
        more_count(){
            this.test_article.view_count+=3
            if(this.test_article.view_count>=this.test_article.source.length)
                this.test_article.end_state=false
        }
    }
})

let len=Math.ceil(test_article.hotel.hot.source.length/3)
Vue.component("hotel_page",{
    data:function(){
        return {test_article:{},
                span:846,now_index:0,len}
    },
    props:["subname","subclass"],
    computed:{
        computed_left(){
            return {
                "left":(-this.now_index*this.span)+"px",
            }
        }
    },
    template:
    `   <div class="sect">
        <p class="title">{{test_article.title}}</p>
        <div class="ranbo">
            <div class="btn_left" @click="delta(-1)"></div>
            <div class="pic">
                <ul class="nav" :style="computed_left">
                    <li v-for="temp in test_article.source">
                        <img :src="temp.src" alt="">
                        <div class="info">
                            <p class="title">{{temp.title}}</p>
                            <p class="rate">{{temp.description}}</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="btn_right" @click="delta(1)"></div>
        </div>
    </div>`,
    mounted:function(){
        let loading_count=10
        let title=this.subname==="hot"?"熱門飯店":"最新飯店"
        axios.get(host+"/api/hotels").then((res)=>{
            data={
                end_state:true,
                view_count:8,
                title:title,
                source:[]
            }
            for(let i=0;i<loading_count;i++){
                if (res.data[i].Hdescription.length>100){
                    res.data[i].Hdescription=res.data[i].Hdescription.slice(0,100)+"..."
                }
                data["source"].push({
                    "src":res.data[i].Hphoto,
                    "title":res.data[i].Hname,
                    "description":res.data[i].Hdescription,
                    "phone":res.data[i].Hphone,
                    "address":res.data[i].Haddress
                })
            }
            this.test_article=data
        })
    },
    methods:{
        more_count(){
            this.test_article.view_count+=3
            if(this.test_article.view_count>=this.test_article.source.length)
                this.test_article.end_state=false
        },
        delta(d){
            this.now_index=(this.now_index+d+len)%len;
        }
    }
})

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

let vm=new Vue({
    el:"#app",
    data:{user_data,error_msg,index:1,search_data,photo_list,css,sub_tab,subnav},
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
    },
    mounted(){
        this.intervalId = setInterval(this.scroll, 5000)
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
            css.black_block.display=true
            css.top_anno.display=true
        },
        close_other(){
            css.black_block.display=false
            css.top_anno.display=false
            css.signin.display=false
        },
        open_signin_window(){
            css.black_block.display=true
            css.signin.display=true
        },
        change_tab(key){
            this.sub_tab=key
            for(let idx in this.subnav){
                idx==key?subnav[idx].state=true:subnav[idx].state=false        
            }
        },
        signup(){
            axios.post(host+"/api/users/",{Uaccount:user_data["Uaccount"]}).then(
                (res)=>{
                    console.log(res)
                    if(res["data"] ==true){
                        error_msg["acc"]="該用戶名已被使用"
                    }else{
                        axios.post(host+"/api/users/create",user_data)
                        error_msg["acc"]=""
                        alert("註冊成功")
                    }
                }
            )
        },
        mail_login(){
            location.href='./signout.html'
        },
        go_home(){
            location.href='./index.html'
        },
        go_po(){
            location.href='./po.html'
        },
        rndbg(x){
            return {"background-image":'url('+this.photo_list[x].src+')'}
            // return {"background-image":'url(https://picsum.photos/960/500)'}
        }

    }
})




