<template>
  <div>
    <div v-for="(item,index) in ProList" :key='index'>{{item.name}}</div>
    <button  @click='toDetailPage'>跳转到详情页面</button>
  </div>
</template>

<script>
let testDB = {
  name:'testDB',
  version:'1',
  db:null
}
import axios from 'axios'
export default {
  name:'index',
  data(){
    return {
      ProList:[]
    }
  },
  methods:{
    getInitData(){
      console.log(111)
      axios({
        method:'get',
        url:'http://jsonplaceholder.typicode.com/users',
      })
      .then((res)=>{
        // console.log(res.data)
        this.ProList = res.data
      })
    },
    toDetailPage(){
      this.$router.push({
        path:'/detail'
      })
    },
    saveDataToIndexDB(DB,callback){
     let request =  window.indexedDB.open(DB.name)
     request.onerror= function(){
       console.log('打开indexDB失败')
     }
     request.onsuccess =function(e){
      console.log('打开indexDB成功')
      DB.db= e.target.result
      callback && callback()
     }

      // 从没有数据库到有数据库，或者是版本发生变化会触发下面这个回调
     request.onupgradeneeded = function(){
       alert(1)
       // 创建objectStore
       let store = request.result.createObjectStore('books',{
         keyPath:'isbn'
       })
      //  store.put({
      //    name:'你不知道的javaScript',
      //    isbn:'test',
      //  })
     }
    },
    addData(db){
      // object store 类似于关系型数据库中的表
      let transaction = db.transaction('books','readwrite')
      let store = transaction.objectStore('books')

      // 从IndexDB中读取数据
      // var request = store.get('test')
      // request.onsuccess = function(e){
      //   console.log(e.target.result)
      // }

      // 从IndexDB中插入数据
      store.add({
        name:'JS权威指南',
        isbn:'test2'
      })

      //从IndexDB中删除数据
      // store.delete('test2')

      // 更新IndexDB中的数据
      // store.get('test').onsuccess = function(e){
      //   var books = e.target.result
      //   books.name ='HTML5 编程指南'
      //   let  request =  store.put(books) 
      //   request.onsuccess = function(){
      //     console.log('更新成功')
      //   }
      // }
      
    }
  },
  activated(){
    var that = this;
    if(!this.$route.meta.isUseCache){
        this.getInitData()
    }

    // 将大量的结构化数据存入indexDB
    this.saveDataToIndexDB(testDB,function(){
      // testDB.db.close()
      // window.indexedDB.deleteDatabase(testDB.db)

      // 往indexDB中添加数据
      that.addData(testDB.db)
    })
  },
  method(){
    //  this.getInitData()
  }
}
</script>


<style scoped>

</style>
