
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.20.0/axios.js"></script>

function view_data(){
    let item = axios.get('http://127.0.0.1:25555/api/attractions')
    return item
}

console.log(view_data())
console.log("XXXXX")