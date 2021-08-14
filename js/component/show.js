let state={
    left:"article",
    right:"album"
}

let view={
    id:"",
    location:"",
    name:"",
    introduction:"",
    official_site:"",
    photo:["https://picsum.photos/70/40?random=1","https://picsum.photos/70/40?random=2","https://picsum.photos/70/40?random=3","https://picsum.photos/70/40?random=4"],
    tag:"",
    rating:5,
    address:"",
    phone:"",
    collect:""
}
let article={
    a:{
        id:"",
        title:"表達願意。" ,
        content:"隨後動力對方網站億元，解壓密碼用於遠遠世紀，保險用戶，禮品一部分限制說什麼字元反而想像本文策略，所有人此處表情本週樂隊地點範圍內我的保健把他味道承受，開口就不投資者細節可憐新年上班一半寶寶技術大眾手段傳奇食品，猶豫性質西方人氣傳真點這裡規格來說台北運用因。",
        photo:
            ["https://picsum.photos/600/400?random=14",
            "https://picsum.photos/600/400?random=12",
            "https://picsum.photos/600/400?random=3"],
            // pic0:"https://picsum.photos/600/400?random=1",
            // pic1:"https://picsum.photos/600/400?random=12",
            // pic2:"https://picsum.photos/600/400?random=3"
        metrics:{
            views:688,
            likes:555,
        }
    },
    b:{
        title:"表達願意。" ,
        content:"隨後動力對方網站億元，解壓密碼用於遠遠世紀，保險用戶，禮品一部分限制說什麼字元反而想像本文策略，所有人此處表情本週樂隊地點範圍內我的保健把他味道承受，開口就不投資者細節可憐新年上班一半寶寶技術大眾手段傳奇食品，猶豫性質西方人氣傳真點這裡規格來說台北運用因。",
        photo:
            ["https://picsum.photos/600/400?random=12",
            "https://picsum.photos/600/400?random=12",
            "https://picsum.photos/600/400?random=3"],
            // pic0:"https://picsum.photos/600/400?random=1",
            // pic1:"https://picsum.photos/600/400?random=12",
            // pic2:"https://picsum.photos/600/400?random=3"
        metrics:{
            views:688,
            likes:555,
        }
    },
    c:{
        title:"表達願意。" ,
        content:"隨後動力對方網站億元，解壓密碼用於遠遠世紀，保險用戶，禮品一部分限制說什麼字元反而想像本文策略，所有人此處表情本週樂隊地點範圍內我的保健把他味道承受，開口就不投資者細節可憐新年上班一半寶寶技術大眾手段傳奇食品，猶豫性質西方人氣傳真點這裡規格來說台北運用因。",
        photo:
            ["https://picsum.photos/600/400?random=9",
            "https://picsum.photos/600/400?random=12",
            "https://picsum.photos/600/400?random=3"],
            // pic0:"https://picsum.photos/600/400?random=1",
            // pic1:"https://picsum.photos/600/400?random=12",
            // pic2:"https://picsum.photos/600/400?random=3"
        metrics:{
            views:688,
            likes:555,
        }
    },  
    d:{
        title:"表達願意。" ,
        content:"隨後動力對方網站億元，解壓密碼用於遠遠世紀，保險用戶，禮品一部分限制說什麼字元反而想像本文策略，所有人此處表情本週樂隊地點範圍內我的保健把他味道承受，開口就不投資者細節可憐新年上班一半寶寶技術大眾手段傳奇食品，猶豫性質西方人氣傳真點這裡規格來說台北運用因。",
        photo:
            ["https://picsum.photos/600/400?random=8",
            "https://picsum.photos/600/400?random=12",
            "https://picsum.photos/600/400?random=3"],
            // pic0:"https://picsum.photos/600/400?random=1",
            // pic1:"https://picsum.photos/600/400?random=12",
            // pic2:"https://picsum.photos/600/400?random=3"
        metrics:{
            views:688,
            likes:555,
        }
    }, 
    e:{
        title:"表達願意。" ,
        content:"隨後動力對方網站億元，解壓密碼用於遠遠世紀，保險用戶，禮品一部分限制說什麼字元反而想像本文策略，所有人此處表情本週樂隊地點範圍內我的保健把他味道承受，開口就不投資者細節可憐新年上班一半寶寶技術大眾手段傳奇食品，猶豫性質西方人氣傳真點這裡規格來說台北運用因。",
        photo:
            ["https://picsum.photos/600/400?random=4",
            "https://picsum.photos/600/400?random=12",
            "https://picsum.photos/600/400?random=3"],
            // pic0:"https://picsum.photos/600/400?random=1",
            // pic1:"https://picsum.photos/600/400?random=12",
            // pic2:"https://picsum.photos/600/400?random=3"
        metrics:{
            views:688,
            likes:555,
        }
    },
}



function updateDb(uid,collection,content) {
    let dbRef = db.collection(collection).doc(uid)
    dbRef.update(content)
}

let addclass={
    like:{
        addedColor:false,
    },
    collect:{
        addedColor:false,
    }
}



let user={
    uid:""
}
let show={
    data(){
        return{state,article,view,addclass,user}
    },
    template:`
    <div class="test">
        <div class="bottom">
            <div class="btn_group">
                <div @click='change_content("right","map")' class="map nav">
                    <h3>地圖<br><span class="lnr lnr-map"></span></h3>
                </div>
                <div @click='change_content("left","introduce")' class="introduc nav">
                    <h3>介紹<br><span class="lnr lnr-book"></span></h3>
                </div>
                <div @click='change_content("left","article")' class="article nav">
                    <h3>文章<br><span class="lnr lnr-license"></span></h3>
                </div>
                <div @click='change_content("left","activity")' class="activity nav">
                    <h3>活動<br><span class="lnr lnr-users"></span></h3>
                </div>
                <div @click='change_content("right","album")' class="detail nav">
                    <h3>照片<br><span class="lnr lnr-camera"></span></h3>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="left">
                <nav class="action_bar">
                    <div class="nav" @click=like>
                        <div class="logo"><span class="lnr lnr-heart" :class="addclass.like"></span></div>
                        <div class="btn" :class="addclass.like">喜歡</div>
                    </div>
                    <div class="nav" @click=collect >
                        <div class="logo"  ><span class="lnr lnr-tag" :class="addclass.collect"></span></div>
                        <div class="btn" :class="addclass.collect" >收藏</div>
                    </div>
                    <div class="nav">
                        <div class="logo"><span class="lnr lnr-file-add"></span></div>
                        <div class="btn">加入行程</div>
                    </div>
                </nav>
                <div v-if="state.left==='introduce'" class="introduce">
                    <h1>簡介</h1>
                    <h6>{{view.introduction}}</h6>
                    <hr class="style-one">
                    </hr>
                    <div class="info">
                        <h6>
                            <span class="lnr lnr-map-marker"></span><span class="text">{{view.address}}</span>
                        </h6>
                        <h6>
                            <span class="lnr lnr-book"></span><span class="text">{{view.phone}}</span>
                        </h6>
                        <h6>
                            <span class="lnr lnr-earth"></span><a target="_blank" :href=view.website>官網連結</a>
                        </h6>
                    </div>
                </div>
                <div v-else-if="state.left==='article'" class="article_group">
                    <h1>相關文章</h1>
                    <li v-for="item in article">
                        <div class="wrap">
                            <img :src=item.photo[0]>
                            <div class="banner-txt">
                                <h6>{{item.title}}</h6>
                            </div>
                        </div>
                    </li>
                </div>
            </div>
            <div class="right">
                <div  v-if='state.right==="album"' class="photo">
                    <div class="album">
                        <img :src=view.photo[0]>
                    </div>
                    
                    <div class="zoom">
                        <ul>
                            <li v-for="(item,key) in view.photo">
                                <img :src=item :key=key>
                            </li>
                        </ul> 
                    </div>
                    <div class="mask">
                        
                    </div>
                </div>

                <div id="map" v-show='state.right==="map"'></div>
            </div>
        </div>        
    </div>
    `,
    beforeRouteUpdate (to, from, next) {
        console.log(to,from)
        if(to.fullPath != from.fullPath){
            location.reload()
        }
        next()
    },
    async created(){
        //判斷是否有登入,有=>進入db拿取Like,collect狀態
        if(localStorage.getItem("uid")){
            this.user.uid=localStorage.getItem("uid")
            db.collection("user").doc(this.user.uid).get().then((res)=>{
                this.user=res.data()
                if (this.user.collect.indexOf(this.$route.params.id)!=-1){
                    this.addclass.collect.addedColor=true
                }
                if (this.user.like.indexOf(this.$route.params.id)!=-1){
                    this.addclass.like.addedColor=true
                }
            })
        }

         //藉由路由參數,去db中讀取該景點資料
        await db.collection("attraction").where("ID", "==",this.$route.params.id).get().then((res)=>{
            res.forEach(res => {
                if(res.data()){
                    this.view=res.data()
                    this.view.id=this.$route.params.id
                    this.view.photo=['https://picsum.photos/800/600?random=1','https://picsum.photos/800/600?random=2','https://picsum.photos/800/600?random=3','https://picsum.photos/800/600?random=4']
                }
            })
            // if(res.data()){
            //     this.view=res.data()
            //     this.view.id=this.$route.params.id
            // }
        }).catch((error) => {
            console.log("Error getting document:", error)
        })

    },
    updated(){
        let map;
        let tw={lat: this.view.location._lat, lng: this.view.location._long};
        map = new google.maps.Map(document.getElementById("map"), {
            center: tw,
            zoom: 15,
        });

        var maker=new google.maps.Marker({
            position:tw,
            map:map
        }) 
    }
    ,
    methods:{
        change_content(key,value){
            this.state[key]=value
        },
        collect(){
            let content={
                collect:""
            }
            if (this.user.collect.indexOf(this.$route.params.id)!=-1){
                this.addclass.collect.addedColor=false
                content.collect=firebase.firestore.FieldValue.arrayRemove(this.$route.params.id)
                this.user.collect=_.without(this.user.collect,this.$route.params.id)
            }else{
                this.addclass.collect.addedColor=true
                content.collect=firebase.firestore.FieldValue.arrayUnion(this.$route.params.id)
                this.user.collect.push(this.$route.params.id)
            }
            updateDb(this.user.uid,"user",content)
        },
        like(){
            let content={
                like:""
            }
            if (this.user.like.indexOf(this.$route.params.id)!=-1){
                this.addclass.like.addedColor=false
                content.like=firebase.firestore.FieldValue.arrayRemove(this.$route.params.id)
                this.user.like=_.without(this.user.like,this.$route.params.id)
            }else{
                this.addclass.like.addedColor=true
                content.like=firebase.firestore.FieldValue.arrayUnion(this.$route.params.id)
                this.user.like.push(this.$route.params.id)
            }
            updateDb(this.user.uid,"user",content)
        }
    }
}

export {show}
