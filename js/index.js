
let search_data=[
    {type:'類型',selected:true},
    {type:'餐廳',selected:false},
    {type:'景點',selected:false},
    {type:'飯店',selected:false},
    {type:'文章',selected:false},
    {type:'活動',selected:false},
    ]

let vm=new Vue({
    el:"#app",
    data:{search_data},
    computed:{/*即刻運算*/
        selected(){
            new_arr=this.search_data.forEach(function(item,index,array){
                if(item.selected==true){
                    array[0]= Object.assign({},item)
                    array[0].type=array[0].type+"▼"
                }
            })
            return this.search_data
        }
    },
    methods:{/*方法*/
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
        }
    }
})

// vm();