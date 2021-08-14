import {test_article,main_nav,css,photo_list,search_data} from "../data/demo.js"

let article={
	data:function(){
        return {test_article:test_article["post"]["hot"]}
    },
	// props:["subname","subclass"],
	template:
		`
		<div class="sub_page">
			<div class="sect">
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
					
					<li class="none_box" v-show="test_article.end_state" @click="more_count" ><a class="more_btn" href="javascript:void(0)">查看更多</a></li>
				</ul>
			</div>
		</div>
		`,    
	methods:{
		more_count(){
			this.test_article.view_count+=3
			if(this.test_article.view_count>=this.test_article.source.length)
				this.test_article.end_state=false
		}
	}
}
let article2={
	data:function(){
        return {test_article:test_article["post"]["new"]}
    },
	// props:["subname","subclass"],
	template:
		`
		<div class="sub_page">
			<div class="sect">
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
					
					<li class="none_box" v-show="test_article.end_state" @click="more_count" ><a class="more_btn" href="javascript:void(0)">查看更多</a></li>
				</ul>
			</div>
		</div>
		`,    
	methods:{
		more_count(){
			this.test_article.view_count+=3
			if(this.test_article.view_count>=this.test_article.source.length)
				this.test_article.end_state=false
		}
	}
}



let res={
    data:[],
    count:2,
    end_state:true
}

let res2={
    data:[],
    count:2,
    end_state:true
}
let restaurant={
	data:function(){
        return {res}
    },
    template:`
		<div class="sub_page">
			<div class="sect">
				<p class="title">熱門餐廳</p>
				<ul class="restaurant">
					<li class="content" v-for="(item,key) in res.data" v-show="key<res.count">
                        <router-link :to="{path: '/restaurant/' + item.ID}" target='_blank'>
                            <div class="t_group">
                                <p class="idx">{{key+1}}</p>
                                <p class="title">{{item.name}}</p>
                            </div>
                            <img :src="'https://picsum.photos/800/600?random=487'+key">
                            <p class="text">{{item.content}}</p>
                            <p class="address"><span>位置資訊：</span>{{item.address}}</p>
                            <p class="worktime"><span>營業時間：</span>{{item.opentime}}</p>
                        </router-link>
					</li>
					<li class="none_box" v-show="res.end_state" @click="more_count" ><a class="more_btn" href="javascript:void(0)">查看更多</a></li>
				</ul>
			</div>
		</div>
    `,
    // <img :src='item.src' onerror="this.src='https://picsum.photos/400/250?random=487'+key">
    async created(){
        db.collection("restaurant").orderBy("metrics.likes","asc").limit(5).get()
        .then((res) => {
            res.forEach((txt)=>{
                this.res.data.push(txt.data())
            })
        }).catch((error) => console.log(error))
    },
    methods:{
        more_count(){
            this.res.count+=2
            if(this.res.count>=this.res.data.length)//如果大於顯示數量
                this.res.end_state=false//關閉查看更多
        }
    }
}
let restaurant2={
	data:function(){
        return {res:res2}
    },
    template:`
		<div class="sub_page">
			<div class="sect">
				<p class="title">最新餐廳</p>
				<ul class="restaurant">
					<li class="content" v-for="(item,key) in res.data" v-show="key<res.count">
                        <router-link :to="{path: '/restaurant/' + item.ID}" target='_blank'>
                            <div class="t_group">
                                <p class="idx">{{key+1}}</p>
                                <p class="title">{{item.name}}</p>
                            </div>
                            <img :src="'https://picsum.photos/800/600?random=487'+key">
                            <p class="text">{{item.content}}</p>
                            <p class="address"><span>位置資訊：</span>{{item.address}}</p>
                            <p class="worktime"><span>營業時間：</span>{{item.opentime}}</p>
                        </router-link>
					</li>
					<li class="none_box" v-show="res.end_state" @click="more_count" ><a class="more_btn" href="javascript:void(0)">查看更多</a></li>
				</ul>
			</div>
		</div>
    `,
    // <img :src='item.src' onerror="this.src='https://picsum.photos/400/250?random=487'+key">
    async created(){
        db.collection("restaurant").orderBy("ID","desc").limit(5).get()
        .then((res) => {
            res.forEach((txt)=>{
                this.res.data.push(txt.data())
            })
        }).catch((error) => console.log(error))
    },
    methods:{
        more_count(){
            this.res.count+=2
            if(this.res.count>=this.res.data.length)//如果大於顯示數量
                this.res.end_state=false//關閉查看更多
        }
    }
}
let activity={
	data:function(){
        return {test_article:test_article["activity"]["hot"]}
    },
	// props:["subname","subclass"],
	template:
		`
		<div class="sub_page">
			<div class="sect">
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
					
					<li class="none_box" v-show="test_article.end_state" @click="more_count" ><a class="more_btn" href="javascript:void(0)">查看更多</a></li>
				</ul>
			</div>
		</div>
		`,    
	methods:{
		more_count(){
			this.test_article.view_count+=3
			if(this.test_article.view_count>=this.test_article.source.length)
				this.test_article.end_state=false
		}
	}
}
let activity2={
	data:function(){
        return {test_article:test_article["activity"]["new"]}
    },
	// props:["subname","subclass"],
	template:
		`
		<div class="sub_page">
			<div class="sect">
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
					
					<li class="none_box" v-show="test_article.end_state" @click="more_count" ><a class="more_btn" href="javascript:void(0)">查看更多</a></li>
				</ul>
			</div>
		</div>
		`,    
	methods:{
		more_count(){
			this.test_article.view_count+=3
			if(this.test_article.view_count>=this.test_article.source.length)
				this.test_article.end_state=false
		}
	}
}

let view={
    data:[],
    count:2,
    end_state:true
}

let view2={
    data:[],
    count:2,
    end_state:true
}

let attraction={
	data:function(){
        return {view}
    },
    template:`
        <div class="sub_page">
            <div class="attr">
                <p class="title">熱門景點</p>
                <li v-for="(item,key) in view.data" v-show="key<view.count" >
                    <router-link :to="{path: '/attraction/' + item.ID}" target='_blank'>
                        <div class="wrap">
                            <img :src="'https://picsum.photos/900/200?random='+item.ID">
                            <div class="banner-txt">
                                <h1>{{item.name}}</h1>
                            </div>
                        </div>
                    </router-link>
                </li>
                <li class="none_box" v-show="view.end_state" @click="more_count" ><a class="more_btn" href="javascript:void(0)">查看更多</a></li>
            </div>
        </div>
    `,
    async created(){
        db.collection("attraction").orderBy("metrics.likes","asc").limit(10).get()
        .then((res) => {
            res.forEach((txt)=>{
                this.view.data.push(txt.data())
            })
        }).catch((error) => console.log(error))
    },
    mounted:function(){
    },
    computed:{
        background(){
            let rnd=Math.floor(Math.random() * 10000)
            return 'https://picsum.photos/900/200?random='+rnd
        }
    },
    methods:{
        more_count(){
            this.view.count+=2
            if(this.view.count>=this.view.data.length)//如果大於顯示數量
                this.view.end_state=false//關閉查看更多
        }
        
    }
}
let attraction2={
	data:function(){
        return {view:view2}
    },
    template:`
    <div class="sub_page">
        <div class="attr">
            <p class="title">最新景點</p>
            <li v-for="(item,key) in view.data" v-show="key<view.count" >
                <router-link :to="{path: '/attraction/' + item.ID}" target='_blank'>
                    <div class="wrap">
                        <img :src="'https://picsum.photos/900/200?random='+item.ID">
                        <div class="banner-txt">
                            <h1>{{item.name}}</h1>
                        </div>
                    </div>
                </router-link>
            </li>
            <li class="none_box" v-show="view.end_state" @click="more_count" ><a class="more_btn" href="javascript:void(0)">查看更多</a></li>
        </div>
    </div>
    `,
    async created(){
        db.collection("attraction").orderBy("ID","desc").limit(10).get()
        .then((res) => {
            res.forEach((txt)=>{
                this.view.data.push(txt.data())
            })
        }).catch((error) => console.log(error))
    },
    mounted:function(){
    },
    computed:{
        background(){
            let rnd=Math.floor(Math.random() * 10000)
            return 'https://picsum.photos/900/200?random='+rnd
        }
    },
    methods:{
        more_count(){
            this.view.count+=2
            if(this.view.count>=this.view.data.length)//如果大於顯示數量
                this.view.end_state=false//關閉查看更多
        }
        
    }
}

let len=Math.ceil(test_article.hotel.hot.source.length/3)
let hotel={
    data:function(){
        return {test_article:{},
                span:846,now_index:0,len,subname:"hot"}
    },
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
}

let hotel2={
    data:function(){
        return {test_article:{},
                span:846,now_index:0,len,subname:"最新"}
    },
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
}

export {hotel2,hotel,attraction2,attraction,activity2,activity, restaurant2, restaurant, article2, article}