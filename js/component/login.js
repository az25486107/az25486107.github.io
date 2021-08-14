
let initlUser={
    birth:"",
    cht:"",
    collect:[],
    displayname:"",
    email:"",
    hoppy:"",
    job:"",
    like:[],
    line:"",
    location:"",
    photourl:"",
    provider:"",
    relationship:"",
    sex:"",
    sign:"",
    trip:[],
    uid:""    
}

function initialUserData(user){//初始化資料庫中使用者文件
    initlUser.displayname=user.email[0].toUpperCase()+user.email[1]//預設顯示名稱信箱大寫第一字+小寫第一字
    initlUser.email=user.email
    initlUser.provider= user.provider//判斷登入方式
    db.collection("user").doc(user.uid).set({
        initlUser
    })
}


Vue.component('signinByFacebook', {
    template: '<img @click=signInFacebook src="./img/icon/Facebook.png" alt="">',
    methods:{
        async signInFacebook(){//Facebook登入
            const provider = new firebase.auth.FacebookAuthProvider();
            let user=await firebase.auth().signInWithPopup(provider).then((res)=>{return res.user})//連結成功,獲取會員資料
            let res=await db.collection("user").doc(user.uid).get()
            user.provider="Facebook"//找尋字段太麻煩,直接設定
            if (!res.exists){
                initialUserData(user)
            }
            alert('登入成功');
            this.$router.push('/')
        },
    }
})
Vue.component('signinByGoogle', {
    template: '<img @click=signInGoogle src="./img/icon/Google.png" alt="">',
    methods:{
        async signInGoogle(){//google登入
            const provider = new firebase.auth.GoogleAuthProvider();
            let user=await firebase.auth().signInWithPopup(provider).then((res)=>{return res.user})//連結成功,獲取會員資料
            let res=await db.collection("user").doc(user.uid).get()
            user.provider="Google"//找尋字段太麻煩,直接設定
            if (!res.exists){
                initialUserData(user)
            }
            alert('登入成功');
            this.$router.push('/')
        },
    }
})


let error_msg={
    "acc":"",
    "pwd":""
}
let user_data={
    Uaccount:"",
    Upwd:""
}
let signin = { 
    data:()=>{
        return{user_data,error_msg}
    },
    beforeRouteEnter(to, from, next) {
        document.body.style.backgroundImage="url('https://picsum.photos/1920/1080?random=5')"
        next()//做完事情要加上next~才能跳轉 否則卡在那QQ
    },
    beforeRouteLeave(to, from, next) {//加上個LEAVE關閉圖片,否則會卡死在那
        document.body.style.backgroundImage=""
        next()
    },
    template:
    `
    <div class="container">
        <div class="header">
            <div class="left">
                <div class="wrap">
                    <div class="logo">
                        <img src="./img/icon/ant.svg" alt="">
                    </div>
                    <div id="welcome">
                        <div class="title">Welcome</div>
                        <div class="description">It's time to Enjoy us!</div>

                    </div>
                    <ul id="introduce">
                        <!-- <li>快速找尋屬於你的旅遊夥伴</li>
                        <li>分享你的快樂行程</li>
                        <li>成為一位專業的旅遊達人</li> -->
                        <li>simply find your partner to go travl</li>
                        <li>Share your happy travel for everyone</li>
                        <li>Becom a professial No.1 join up</li>
                    </ul>
                </div>
            </div>
            <div class="right">
                <div class="wrap">
                    <div class="title">
                        <span class="login">Login</span> / <span class="signup">SignUp</span>
                    </div>
                    <div class="account input_group">
                        <input v-model="user_data['account']" type="e-mail"  placeholder="E-mail" id="acc">
                        <div class="error_msg">
                            {{error_msg["pwd"]}}
                        </div>
                    </div>
                    <div class="pwd input_group">
                        <input v-model="user_data['pwd']" type="password"  placeholder="PassWord" id="pwd">
                        <div class="error_msg">
                            {{error_msg["pwd"]}}
                        </div>
                    </div>
                    <div class="button_group">
                        <button class="login_btn" @click=signin>
                            LOGIN
                        </button>
                        <div class="other_way">
                            <div class="description">
                                Or login with
                            </div>
                            <img src="./img/icon/Facebook.png" alt="">
                            <img @click=signInGoogle src="./img/icon/Google.png" alt="">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <router-link to="/signup" class="nosignup">Dont have an <span class="tag">account</span>?　/　</router-link> 
            <router-link to="/forget" class="nosignup">Forget <span class="tag">Password?</span></router-link> 
        </div>
    </div>
    `,
    methods:{
        async signInFacebook(){
            const provider = new firebase.auth.FacebookAuthProvider();
            let user=await  firebase.auth().signInWithPopup(provider).then((res) =>{return res.user})
            let res=await db.collection("user").doc(user.uid).get()
            if (!res.exists){
                initialUserData(user)
            }
            alert('登入成功');
            this.$router.push('/')
        },
        async signInGoogle(){//google登入
            const provider = new firebase.auth.GoogleAuthProvider();
            let user=await firebase.auth().signInWithPopup(provider).then((res)=>{return res.user})//連結成功,獲取會員資料
            let res=await db.collection("user").doc(user.uid).get()
            if (!res.exists){
                initialUserData(user)
            }
            alert('登入成功');
            this.$router.push('/')
        },
        signin(){
            firebase.auth().signInWithEmailAndPassword(user_data["account"], user_data["pwd"])
            .then((userdata) => {
                if(userdata){
                    alert('登入成功');
                    this.$router.push('/');
                }
            })
            .catch((error) => {
                if(error.code=== "auth/wrong-password"){
                    error_msg["pwd"]="*帳號/密碼錯誤"
                }                    
            });
        },
        signout(){
            firebase.auth().signOut().then(function() {
                alert('您被逐出紫禁城了');
            })
        }
    },

    created(){
        firebase.auth().onAuthStateChanged(function(user) {
            if(user){
                console.log(user)
            }
        })
    }
}


let forgetpassword={
    data(){
        return {display:"forget",mail:"",mailbox_link:""}
    },
    computed:{
    },
    template:
    `
    <div class="container">
        <div class="background">
            <div class="wrap">
                <div class="logo">
                    <p>Trappy</p>
                </div>
                <div class="content">
                    <div v-if="display==='forget'" class="sub wrap1">
                        <div class="icon">
                            <img src="./img/icon/forget.png">
                        </div>
                        
                        <div class="title">
                            Forget Password
                        </div>
                        <div class="description">
                            請輸入您註冊的信箱,我們將會傳送重置信件給您
                        </div>
                        <input class="XX" v-model=mail type="text">
                        <div class="btn_group">
                            <router-link to="/signin" class="cancel" >取消</router-link>
                            <button class="passmail" @click=pass>傳送</button>
                        </div>
                    </div>
                    <div v-else class="sub wrap2">
                        <div class="icon">
                            <img src="./img/icon/get_mail.png">
                        </div>
                        <div class="title title2">
                            Check in your Mailbox
                        </div>
                        <div class="description">
                            我們已經驗證信寄送到您的信箱中,請進入信箱查收
                        </div>
                        <div class="btn_group">
                            <a class="pass" target="_blank" :href=mailbox_link>登入您註冊的信箱</a>
                            <router-link to="/signin" class="pass back" >返回登入頁面</router-link>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    methods:{
        pass(){
            if(this.mail==""){
                this.display=false
                this.mailbox_link="http://"+this.mail.split("@")[1]
            };
            const auth = firebase.auth();
            // auth.sendPasswordResetEmail(this.mail).then(function() {
            //     // window.alert('已發送信件至信箱，請按照信件說明重設密碼');
            //     // window.location.reload(); // 送信後，強制頁面重整一次
            // }).catch(function(error) {
            //     console.log(error.message)
            // });
        },
        back(){
            this.display="forget"
        }
    }
}

let signup={
    data:()=>{
        return{user_data,error_msg}
    },
    template:
    `
    <div class="container">
        <div class="header">
            <div class="right">
                <div class="wrap">
                    <div class="title">
                        <span class="signup">Login</span> / <span class="login">SignUp</span>
                    </div>
                    <div class="account input_group">
                        <input v-model="user_data['account']" type="e-mail"  placeholder="E-mail" id="acc">
                        <div class="error_msg">
                            {{error_msg["pwd"]}}
                        </div>
                    </div>
                    <div class="pwd input_group">
                        <input v-model="user_data['pwd']" type="password"  placeholder="PassWord" id="pwd">
                        <div class="error_msg">
                            {{error_msg["pwd"]}}
                        </div>
                    </div>
                    <div class="button_group">
                        <div class="other_way">
                            <div class="description">
                                Create with
                            </div>
                                <signinByFacebook></signinByFacebook>
                                <signinByGoogle></signinByGoogle>
                        </div>
                        <button class="login_btn" @click=signup>
                            Create
                        </button>
                    </div>
                </div>
            </div>
            <div class="left">
                <div class="wrap">
                    <div class="logo">
                        <img src="./img/icon/ant.svg" alt="">
                    </div>
                    <div id="welcome">
                        <div class="title">Welcome</div>
                        <div class="description">It's time to Enjoy us!</div>

                    </div>
                    <ul id="introduce">
                        <!-- <li>快速找尋屬於你的旅遊夥伴</li>
                        <li>分享你的快樂行程</li>
                        <li>成為一位專業的旅遊達人</li> -->
                        <li>simply find your partner to go travl</li>
                        <li>Share your happy travel for everyone</li>
                        <li>Becom a professial No.1 join up</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer">
            <router-link to="/signin" class="nosignup">You have an <span class="tag">account</span></router-link> 
        </div>
    </div>
    `,
    // <img @click=signInGoogle src="./img/icon/Google.png" alt="">
    // <a href="">You have an <span class="tag">account</span>?</a>
    methods:{
        signup(){
            firebase.auth().createUserWithEmailAndPassword(user_data["account"], user_data["pwd"])
                .then((res) => {
                    let user=res.user
                    if(user){
                        user.provider="E-mail"
                        db.collection("user").doc(user.uid).set({
                            displayname:user.email[0].toUpperCase()+user.email[1],
                            provider:user.provider,
                            uid:user.uid
                            //預防兩次加密URI,如果有更新才傳送新的,否則傳送舊的已加密
                        }).then(()=>{
                            this.$router.push('/')
                        }).catch((err)=>{
                            console.log(err)
                        })
                    }
                })
                .catch((error) => {
                    if(error.code==="auth/email-already-in-use"){
                        error_msg["acc"]="*信箱重複註冊"
                    }
                });
        },
    }
}

export {signup,signin,forgetpassword}
