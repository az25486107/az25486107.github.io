
function check_provider(user){
    if(user.providerData[0].providerId.indexOf("google")!=-1)
        return "Google"
    else if(user.providerData[0].providerId.indexOf("google")!=-1)
        return "Facebook"
    else
        return "E-mail"
}

function initialUserData(user){
    db.collection("user").doc(user.uid).set({
        displayname:user.email[0].toUpperCase()+user.email[1],
        provider: check_provider(user)//判斷提供者
    })
}


// Vue.component('signinByGoogle', {
//     data: function () {
//     return {
//         count: 0
//         }
//     },
//     template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
// })

Vue.component('signinByFacebook', {
    template: '<img @click=signInFacebook src="./img/icon/Facebook.png" alt="">',
    methods:{
        async signInFacebook(){//Facebook登入
            const provider = new firebase.auth.FacebookAuthProvider();
            let user=await firebase.auth().signInWithPopup(provider).then((res)=>{return res.user})//連結成功,獲取會員資料
            let res=await db.collection("user").doc(user.uid).get()
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
            <router-link to="/" class="nosignup">Forget <span class="tag">Password?</span></router-link> 
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

let signup={
    data:()=>{
        return{user_data,error_msg}
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
        </div>
        <div class="footer">
            <router-link to="/signin" class="nosignup">You have an <span class="tag">account</span></router-link> 
        </div>
    </div>
    `,
    // <img @click=signInGoogle src="./img/icon/Google.png" alt="">
    // <a href="">You have an <span class="tag">account</span>?</a>
    methods:{
        signInGoogle(){
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth()
            .signInWithPopup(provider)
            .then((res) => {
                let user=res.user
                if(user.providerData[0].providerId.indexOf("google")){
                    user.provider="Google"
                }else if(user.providerData[0].providerId.indexOf("google")){
                    user.provider="Facebook"
                }
                else{
                    user.provider="E-mail"
                }
                db.collection("user").doc(user.uid).set({
                    displayname:user.email[0].toUpperCase()+user.email[1],
                    provider:user.provider
                    //預防兩次加密URI,如果有更新才傳送新的,否則傳送舊的已加密
                },{ merge:true}).then(()=>{
                    this.$router.push('/')
                })
            }).catch((error) => {
                console.log(error)
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
        },
        signup(){
            firebase.auth().createUserWithEmailAndPassword(user_data["account"], user_data["pwd"])
                .then((user) => {
                    if(user){
                        if(user.providerData[0].providerId.indexOf("google")){
                            user.provider="Google"
                        }else if(user.providerData[0].providerId.indexOf("google")){
                            user.provider="Facebook"
                        }
                        else{
                            user.provider="E-mail"
                        }
                        db.collection("user").doc(user.uid).set({
                            displayname:user.email[0].toUpperCase()+user.email[1],
                            provider:user.provider
                            //預防兩次加密URI,如果有更新才傳送新的,否則傳送舊的已加密
                        }).then(()=>{
                            this.$router.push('/')
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

export {signup,signin}
