import {test_article,main_nav,css,photo_list,search_data} from "../data/demo.js"

let firebase_host="https://firebasestorage.googleapis.com/v0/b/trappy-b8aa6.appspot.com/o/"
let data_user={
    birth:"",
    location:"",
    hoppy:"",
    sign:"",
    line:"",
    job:"",
    sex:"",
    displayname:"",
    ralationship:"",
    photourl:"",
	state:""
}

let home = { 
	data(){
		return {index:1,search_data,photo_list,css,subnav} 
	},
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
    template:
	`	<main>
			<div id="banner">
				<div class="album" v-cloak>
					<transition-group name="fade" class="imgList" tag="div">
						<img class="banner" v-for='(pic,idx) in photo_list' src="./img/123.png" :style='rndbg(idx)' v-show='idx===index' :key="idx" alt="">
						<!-- <img class="banner" v-for='(pic,idx) in photo_list' src="./img/123.png" :style='rndbg(idx)' :key="idx" alt=""> -->
					</transition-group>
				</div>
				<div class="search_group">
					<div class="sel_menu">
						<ul>
							<li v-for="menu in selected" @click="select_item" >{{menu.type}}</li>
						</ul>
					</div>
					<input type="text" name="search-bar" placeholder="搜尋..." id="search">
					<!-- <i class="fas fa-search"></i> -->
				</div>
			</div>
			<div class="sub_nav">
				<ul>
					<li v-for="(sub_nav,key) of subnav" 
						@click='change_tab(key)'
						:class="{border_focus:subnav[key].state}">
						<router-link :to="key">
						{{sub_nav.cht}}</router-link></li>
				</ul>
			</div>
			<router-view name="c" ></router-view>
			<router-view name="a" ></router-view>
			<router-view name="b" ></router-view>
		</main>
	`,
	mounted(){
        this.intervalId = setInterval(this.scroll, 5000)
    },
	methods:{
		change_tab(key){
			this.sub_tab=key
			for(let idx in this.subnav){
				idx==key?subnav[idx].state=true:subnav[idx].state=false        
			}
		},
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
		rndbg(x){
            return {"background-image":'url('+this.photo_list[x].src+')'}
            // return {"background-image":'url(https://picsum.photos/960/500)'}
        }
	}


}

let host="http://127.0.0.1:3000"
let subnav={
    "article":{cht:"文章",state:false},
    "activity":{cht:"活動",state:false },
    "attraction":{cht:"景點",state:false},
    "restaurant":{cht:"餐廳",state:false},
    "hotel":{cht:"飯店",state:false}
}
let nav={
	data(){
		return {islogin:true,user:data_user}
	},
	template:`
		<nav>
			<div class="logo_group">
				<img class="icon" src="./icon.jpg" alt="">
				<p class="title">TRAPPY</p>
			</div>
			<div class="link">
				<router-link to="/home">首頁</router-link>
				<router-link to="/">行程</router-link>
				<router-link to="/">聊天</router-link>
				<router-link to="/">通知</router-link>
				<router-link to="/">下載</router-link>
				<router-link to="/">關於我們</router-link>
				<router-link v-if=user.state to="/user">
					<div class="user">
						<img v-if=user.photourl :src=photourl>
						<div class="word_pic" v-else >{{user.displayname}}</div>
					</div>
				</router-link>
				<router-link v-else to="/signin">
					<div class="user">
						<img src="../img/icon/user.png">尚未登入/註冊
					</div>
				</router-link>
			</div>
		</nav>
	`,
	async created(){
        let tmp_user=firebase.auth().currentUser
        let c=await db.collection("user").doc(tmp_user.uid).get().then((res)=>{
            if(res.data()){
				this.user.state=true
                this.user.uid=tmp_user.uid
                this.user.birth=""||res.data().birth
                this.user.location=""||res.data().location
                this.user.hoppy=""||res.data().hoppy
                this.user.sign=""||res.data().sign
                this.user.line=""||res.data().line
                this.user.job=""||res.data().job
                this.user.sex=""||res.data().sex
                this.user.photourl=""||res.data().photourl
                this.user.email=tmp_user.email
                this.user.displayname=tmp_user.email[0].toUpperCase()+tmp_user.email[1]||res.data().displayname
            }else{
                this.user.displayname="te"||tmp_user.email[0].toUpperCase()+tmp_user.email[1]
            }
        }).catch((error) => {
            console.log("Error getting document:", error)
        })
    },
	computed:{
		photourl(){
            return firebase_host+this.user.photourl+"?alt=media"
        },
	}
}


let footer={
	template:`
	<div class="footer">
		<div class="wrap">
			<ul>
				<li><a href="">關於TRAPPY</a></li>
				<li><a href="">關於我們</a></li>
				<li><a href="">聯絡我們</a></li>
				<li><a href="">服務條款</a></li>
				<li><a href="">隱私政策</a></li>
			</ul>

			<ul>
				<li><a href="">相關連結</a></li>
				<li><a href="">AndroidApp</a></li>
				<li><a href="">粉絲專頁</a></li>
				<li><a href="">Instgram</a></li>
			</ul>
			
			<ul>
				<li class="icon">
					<img class="fb" src="./img/icon/fb.svg" alt="">
					<img class="ig" src="./img/icon/ig.svg" alt="">
				</li>
				<li>
					<img class="googleplay" src="./img/icon/googleplay.png" alt="">
				</li>
			</ul>

			<ul>
			</ul>
		</div>
	</div>
	`
}

export{footer,home,nav}