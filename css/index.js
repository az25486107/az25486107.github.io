function init(){
    let template=document.getElementById('template').contentWindow.document
    let vm=new Vue({
        template:template.getElementById('page-template'),
        data,
        created:()=>{
            console.log(this)
        },
    })
}