import {data as  data_res}  from "../restaurant.js" 
import {data as  data_attr}  from "../attraction.js" 

let data={
    attraction:data_attr.data,
    hotel:"",
    restaurant:data_res
}

function update_count(uid,collection){
    db.collection("count").doc(collection).set({
        count:uid
    })
}
function setdb(uid,data,collection){
    db.collection(collection).doc().set({
        ID:uid.toString(),
        address:data.Add||data.address||"待補",
        introduction: data.Description||data.introduction||"待補",
        phone:data.Tel||data.tel||"待補",
        opentime:data.Opentime||data.open_time||"待補",
        location:new firebase.firestore.GeoPoint(data.Py||data.nlat,data.Px||data.elong),
        metrics:{
            likes:0,
            views:0
        },
        name:data.Name||data.name||"待補",
        website:data.Website||data.official_site||data.facbook||"待補",
    }).then(()=>{
        console.log("完成UID:"+uid)
    })
}

let collection="景點"
let test=0
if (test==0){
    if(collection=="餐廳"){
        collection="restaurant"
        db.collection("count").doc(collection).get().then((res)=>{
            let uid=res.data().count
            console.log(collection)
            console.log(uid)
            let targetcount=20
            for(let i=0;i<targetcount && i<data[collection].length;i++){
                uid++
                setdb(uid,data[collection][i],collection)
            }
            update_count(uid,collection)
        })
    }else if(collection=="景點"){
        collection="attraction"
        db.collection("count").doc(collection).get().then((res)=>{
            let uid=res.data().count
            console.log(collection)
            console.log(uid)
            let targetcount=20
            for(let i=0;i<targetcount && i<data[collection].length;i++){
                uid++
                setdb(uid,data[collection][i],collection)
            }
            update_count(uid,collection)
        })    
    }
}
console.log(1)
