// import { Datetime } from 'vue-datetime'
// // You need a specific loader for CSS files
// // import 'vue-datetime/dist/vue-datetime.css'
// // Vue.use(Datetime)
function getlengthb(str){
    return str.replace(/[^\x00-\xff]/g,"**").length
}

function checkcht(str){
    let rex = /[^\x00-\xff]/g
    if (rex.test(str))//如有中文,只回傳第一個字
        return str[0]
    return str//無中文全回傳
}
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
    provider:""
}

let firebase_host="https://firebasestorage.googleapis.com/v0/b/trappy-b8aa6.appspot.com/o/"
let user={
    data:()=>{
        return{preview: null,image: null,user:data_user}
    },
    template:
    `  
        <div class="userpage">
            <div class="container">
                <div class="list">
                    <div class="profile">
                        <div class="photo">
                            <div class="list">
                                <img class="real" v-if=preview :src=preview>
                                <img class="real" v-else-if=user.photourl :src=photourl>
                                <div class="word_pic" v-else >{{pic_word}}</div>
                                <label for="photo-upload" class="upload-label"><img class="upload" src="./img/icon/camera.svg" alt=""></label>
                                <input id="photo-upload" type="file" accept="image/*" @change=previewImage>
                            </div>
                            <div class="displayname">
                                <input v-model=user.displayname :style="{width:inputlen +'px'}" >
                                <img class="edit" src="./img/icon/edit.png">
                            </div>
                        </div> 
                        <div class="login_mode">
                            <img :src=provider_icon alt="">
                            <p class="tname">{{"使用 "+user.provider+" 登入"}}</p>
                            <!-- <div class="checkmark"></div> -->
                            <img class="checkmark" src="./img/icon/checkmark.svg" alt="">
                        </div>
                    </div>
                    <div class="setting">
                        <ul>
                            <li>帳號設定</li>
                            <li>通知設定</li>
                            <li>我的收藏</li>
                            <li>旅遊紀錄</li>
                        </ul>
                    </div>
                </div>
                
                <div class="data">
                    <div class="title">帳號設定</div>
                    
                    
                    <div class="nav">
                        <li>基本資料</li>
                        <li>常用旅客</li>
                    </div>
                
                    <div class="info">      
                        <div class="group">
                            <div class="title">星座</div>
                            <select v-model=user.sign>
                                <option>牡羊座</option>
                                <option>金牛座</option>
                                <option>雙子座</option>
                                <option>巨蟹座</option>
                                <option>獅子座</option>
                                <option>處女座</option>
                                <option>天平座</option>
                                <option>天蠍座</option>
                                <option>射手座</option>
                                <option>魔羯座</option>
                                <option>水瓶座</option>
                                <option>雙魚座</option>
                            </select>
                        </div>
                        <div class="group">
                            <div class="title">興趣</div>
                            <input v-model=user.hoppy type="text">
                        </div>
                        <div class="group">
                            <div class="title">性別</div>
                            <select v-model=user.sex >
                                <option>男生</option>
                                <option selected="selected">女生</option>
                            </select>
                        </div>
                        <div class="group">
                            <div class="title">職業</div>
                            <input v-model=user.job type="text">
                        </div>
                        <div class="group">
                            <div class="title">生日</div>
                            <input v-model=user.birth id="date" type="date">
                        </div>
                        <div class="group">
                            <div class="title">居住地</div>
                            <input v-model=user.location type="text">
                        </div>
                        <div class="group">
                            <div  class="title">Line</div>
                            <input v-model=user.line :placeholder="user.line" type="text">
                        </div>
                        <div class="group">
                            <div class="title">感情狀態</div>
                            <select v-model=user.relationship>
                                <option>單身</option>
                                <option>穩定交往中</option>
                                <option>穩定交往中但保有一點分手空間</option>
                                <option>已婚</option>
                                <option>曖昧不明</option>
                                <option>友達未滿戀人已逝</option>
                            </select>
                        </div>
                    </div>
                    <div class="sumbit">
                        <a href="#" class="button" @click=updateprofie>儲存</a>
                    </div>
                </div>
            </div>
        </div>    
    `,
    async created(){
        let tmp_user=firebase.auth().currentUser
        let c=await db.collection("user").doc(tmp_user.uid).get().then((res)=>{
            if(res.data()){
                this.user.uid=tmp_user.uid
                this.user.provider=res.data().provider
                this.user.birth=""||res.data().birth
                this.user.location=""||res.data().location
                this.user.hoppy=""||res.data().hoppy
                this.user.sign=""||res.data().sign
                this.user.line=""||res.data().line
                this.user.job=""||res.data().job
                this.user.sex=""||res.data().sex
                this.user.photourl=""||res.data().photourl
                this.user.relationship=""||res.data().relationship
                this.user.email=tmp_user.email
                this.user.displayname=res.data().displayname?res.data().displayname:tmp_user.email[0].toUpperCase()+tmp_user.email[1]
                //預設假如沒有設定暱稱,取email第一個字母大寫+第二字母小寫
            }else{
                this.user.displayname="te"||tmp_user.email[0].toUpperCase()+tmp_user.email[1]
            }
        }).catch((error) => {
            console.log("Error getting document:", error)
        })
    },
    computed:{
        provider_icon(){
            return "../img/icon/"+this.user.provider+".png"
        },
        photourl(){
            return firebase_host+this.user.photourl+"?alt=media"
        },
        pic_word(){
            if( getlengthb(this.user.displayname)>=2){
                return checkcht(this.user.displayname[0].toUpperCase()+this.user.displayname[1])
            }else{
                return "RE"
            }
        },
        inputlen(){//依照暱稱大小*16長度,變更input長度
            let len=getlengthb(this.user.displayname)<=2 ? 2:getlengthb(this.user.displayname)
            return len*16
        }
    },
    methods: {
        previewImage: function(event) {
        
            let input = event.target
            if (input.files) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.preview = e.target.result;
                }
                this.image=input.files[0];
                reader.readAsDataURL(input.files[0]);
            }

            let filename=input.files[0].name
            let filename_arr=filename.split(".")
            let file={
                ext:filename_arr[1],
                name:filename_arr[0]
            }
            this.user.preview_avatar=this.user.uid+"."+file["ext"];
        },
        updateprofie(){
            if(this.user.preview_avatar){//如果有設定照片
                //設定路徑
                this.user.new_photourl = "user/avatar/" + this.user.preview_avatar;
                // 取得 storage 對應的位置
                const storageReference = firebase.storage().ref(this.user.new_photourl)
                // .put() 方法把東西丟到該位置裡
                const task = storageReference.put(this.image)
            }

            user = firebase.auth().currentUser
            if (user) {
                db.collection("user").doc(user.uid).update({
                    hoppy:this.user.hoppy,
                    birth:this.user.birth,
                    sex:this.user.sex,
                    sign:this.user.sign,
                    location:this.user.location,
                    displayname:this.user.displayname,
                    line:this.user.line,
                    job:this.user.job,
                    relationship:this.user.relationship,
                    photourl:this.user.new_photourl?encodeURIComponent(this.user.new_photourl):this.user.photourl
                    //預防兩次加密URI,如果有更新才傳送新的,否則傳送舊的已加密
                }).then(
                    alert("儲存成功")
                )
            }
        }
    }
}

export {user}

