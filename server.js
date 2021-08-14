let citiesRef = db.collection("attractions")
citiesRef.orderBy("ID").limit(3).get().then((res)=>{
    console.log(res)
})
