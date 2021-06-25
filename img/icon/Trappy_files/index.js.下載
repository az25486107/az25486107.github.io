
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
    top_anno:{display:false}
}

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
        }
    }
})



// vm();