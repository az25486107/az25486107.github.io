
let search_data=[
    {type:'類型 ▼',selected:true},
    {type:'餐廳',selected:false},
    {type:'景點',selected:false},
    {type:'飯店',selected:false},
    {type:'文章',selected:false},
    {type:'活動',selected:false},
    ]

let photo_list=[
        {index:1,src:'https://picsum.photos/960/500?random=1'},
        {index:2,src:'https://picsum.photos/960/500?random=2'},
        {index:5,src:'https://picsum.photos/960/500?random=3'},
        {index:4,src:'https://picsum.photos/960/500?random=4'},
        {index:5,src:'https://picsum.photos/960/500?random=5'},      
    ]

let css={
    black_block:{display:false},
    top_anno:{display:false},
    signin:{display:false}
}

let main_nav=[
    {name:"帳戶",href:"javascript:void(0)",action:"open_acc_window"},
    {name:"行程",href:"javascript:void(0)",action:"open_acc_window"},
    {name:"聊天",href:"javascript:void(0)",action:"open_acc_window"},
    {name:"通知",href:"javascript:void(0)",action:"open_acc_window"},
    {name:"下載",href:"javascript:void(0)",action:"open_acc_window"},
    {name:"關於我們",href:"javascript:void(0)",action:"open_acc_window"},
]

let test_article=[
    {src:"https://picsum.photos/400/250?random=4",title:"追求小學，新型暫無百度能夠所說印刷面對，理由程度大家都",content:"地方整體結合你能漸漸清晰會議，現在例如關注實驗依舊持續不久品牌我想，就不威脅自己外觀我又無人掌握相。地方整體結合你能漸漸清晰會議，現在例如關注實驗依舊持續不久品牌我想，就不威脅自己外觀我又無人掌握相。地方整體結合你能漸漸清晰會議，現在例如關注實驗依舊持續不久品牌我想，就不威脅自己外觀我又無人掌握相。地方整體結合你能漸漸清晰會議，現在例如關注實驗依舊持續不久品牌我想，就不威脅自己外觀我又無人掌握相。"},
    {src:"https://picsum.photos/400/250?random=5",title:"追求小學，新型暫無百度能夠所說印刷面對，理由程度大家都",content:"地方整體結合你能漸漸清晰會議，現在例如關注實驗依舊持續不久品牌我想，就不威脅自己外觀我又無人掌握相。地方整體結合你能漸漸清晰會議，現在例如關注實驗依舊持續不久品牌我想，就不威脅自己外觀我又無人掌握相。地方整體結合你能漸漸清晰會議，現在例如關注實驗依舊持續不久品牌我想，就不威脅自己外觀我又無人掌握相。地方整體結合你能漸漸清晰會議，現在例如關注實驗依舊持續不久品牌我想，就不威脅自己外觀我又無人掌握相。"},
    {src:"https://picsum.photos/400/250?random=6",title:"追求小學，新型暫無百度能夠所說印刷面對，理由程度大家都",content:"地方整體結合你能漸漸清晰會議，現在例如關注實驗依舊持續不久品牌我想，就不威脅自己外觀我又無人掌握相。地方整體結合你能漸漸清晰會議，現在例如關注實驗依舊持續不久品牌我想，就不威脅自己外觀我又無人掌握相。地方整體結合你能漸漸清晰會議，現在例如關注實驗依舊持續不久品牌我想，就不威脅自己外觀我又無人掌握相。地方整體結合你能漸漸清晰會議，現在例如關注實驗依舊持續不久品牌我想，就不威脅自己外觀我又無人掌握相。"},
    {src:"https://picsum.photos/400/250?random=7",title:"追求小學，新型暫無百度能夠所說印刷面對，理由程度大家都",content:"地方整體結合你能漸漸清晰會議，現在例如關注實驗依舊持續不久品牌我想，就不威脅自己外觀我又無人掌握相。地方整體結合你能漸漸清晰會議，現在例如關注實驗依舊持續不久品牌我想，就不威脅自己外觀我又無人掌握相。地方整體結合你能漸漸清晰會議，現在例如關注實驗依舊持續不久品牌我想，就不威脅自己外觀我又無人掌握相。地方整體結合你能漸漸清晰會議，現在例如關注實驗依舊持續不久品牌我想，就不威脅自己外觀我又無人掌握相。"},
    {src:"https://picsum.photos/400/250?random=8",title:"追求小學，新型暫無百度能夠所說印刷面對，理由程度大家都",content:"地方整體結合你能漸漸清晰會議，現在例如關注實驗依舊持續不久品牌我想，就不威脅自己外觀我又無人掌握相。地方整體結合你能漸漸清晰會議，現在例如關注實驗依舊持續不久品牌我想，就不威脅自己外觀我又無人掌握相。地方整體結合你能漸漸清晰會議，現在例如關注實驗依舊持續不久品牌我想，就不威脅自己外觀我又無人掌握相。地方整體結合你能漸漸清晰會議，現在例如關注實驗依舊持續不久品牌我想，就不威脅自己外觀我又無人掌握相。"},
]

Vue.component("article_page",{
    data:function(){
        return {test_article}
    },
    template:
    `<div class="sect">
        <p class="title">熱門文章</p>
        <ul>
            <li v-for="item in test_article" >
                <img :src=item.src alt="">
                <div class="text">
                    <div class='title'>{{item.title}} </div>
                    <div class='content'>{{item.content}}</div>
                    <div class="comment">
                        <i class="fas fa-chart-line"></i><span>2808</span>
                        <i class="fas fa-heart"></i><span>2808</span>
                    </div>
                </div>
            </li>
            
            <li><a class="morSe_btn" href="">查看更多</a></li>
        </ul>
    </div>
    `
})



let vm=new Vue({
    el:"#app",
    data:{index:1,search_data,photo_list,css},
    computed:{/*即刻運算*/
        selected(){
            new_arr=this.search_data.forEach(function(item,index,array){
                if(item.selected==true && array[0]!=item){
                    array[0]= Object.assign({},item)
                    array[0].type=array[0].type+" ▼"
                }
            })
            return this.search_data
        }
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
    }
})



// vm();