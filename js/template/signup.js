let error_msg={
    "acc":"XXX",
    "pwd":"XXX"
}
let user_data={
    Uaccount:"",
    Upwd:""
}

let login = { 
    template: `
        <div class="signin">
            <div class="t_group">
                <div class="wrap">
                    <img class="icon" src='./icon.jpg'  alt="">
                    <p class="title">登入TRAPPY</p>
                </div>
                <div class="account">
                    <p>帳號:<span class="notice">{{error_msg["acc"]}}</span></p>
                    <input v-model="user_data['Uaccount']" type="text" id="acc">
                </div>
                <div class="pwd">
                    <p>密碼:<span class="notice">{{error_msg["pwd"]}}</span></p>
                    <input v-model="user_data['Upwd']" type="password" id="pwd">
                </div>
                <img src="./img/btn/email_lg.png" @click="mail_login">
                <img src="./img/btn/fb_lg.png" alt="">
                <img src="./img/btn/google_lg.png" alt="">
                <img src="./img/btn/signup.png"@click="signup">

            </div>
        </div>`,
    data:()=>{
        return {
            user_data,
            error_msg
        }
    },
    methods:{
        mail_login(){
            location.href='./signout.html'
        },
        signup(){
            let [email, password]=[user_data["Uaccount"],user_data["Upwd"]]
            firebase
              .auth()
              .createUserWithEmailAndPassword(email, password)
              .then(() => {
                  console.log(email, password)
                // 隱藏登入區塊
                // document.querySelector('.user-null').classList.add('none');
              })
              .catch(error => {
                error_msg["acc"]="該用戶名已被使用"
              });
        }
    }
}

export {login}