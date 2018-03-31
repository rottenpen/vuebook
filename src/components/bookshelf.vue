<template>
  <div class="bookshelf">
    <mt-search v-model="value">
      <mt-cell v-for="item in result" :title="item.title" :to="'booki/'+item._id" track-by="_id"  is-link>
      </mt-cell>
    </mt-search>
    <div id="shelflist">
      <div id="booklist">
        <!-- <div class="box" v-for="book in bookshelf"  @click="$router.push({name:'read',query:{id:book.id},params:{chapter:0}})">
            <img :src="book.cover" alt="无图">
            <p> 
                <span class="title">{{book.title}}</span></br>
                <span class="lastChapter">{{book.lastChapter}}</span>
            </p>
        </div> -->
        <mt-cell-swipe
          v-for="book in bookshelf"
          :to="'read/0?id='+book.id"
          :title="book.title"
          :right="[
            {
              content: 'Delete',
              style: { background: 'red', color: '#fff' }
            }
          ]">
          
        </mt-cell-swipe>
      </div>
      <div class="box" v-if="!bookshelf&&!value">
            <p> 
                <span class="title">暂无藏书</span></br>
                <span class="lastChapter">.</span>
            </p>
        </div>
    </div>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="推荐">
        <div @click="$router.push({name:'HelloWorld'})" class="tab-container">
        <img slot="icon" src="../assets/earth.png">
        推荐
        </div>
      </mt-tab-item>
      <mt-tab-item id="书架">
        <div  class="tab-container">
        <img slot="icon" src="../assets/notebook.png">
        书架
        </div>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
export default {
  name: "bookshelf",
  data() {
    return {
      selected: "书架",
      result: [
        
      ],
      value: "",
      bookshelf:""
    };
  },
  mounted() {
    this.bookshelf=JSON.parse(localStorage.getItem('bookshelf')) 
    return;
  },
  watch:{
    'value':{
      handler:function(val,oldVal){
        this.$http({
          method:'get',
          url:'/api/book/fuzzy-search?query='+val+'&start=0&limit=10'
        }).then((res)=>{
          console.log(res);
          this.result=res.data.books
          // this.$set(this.result,res.data.books)
        },(err)=>{
          console.log('error')
        })
      }
    }
  },
};
</script>
<style scoped>
/* .bookshelf {
  display: flex;
  width: 100%;
  height: 100%;
} */
#shelflist {
  display: flex;
  width: 320px;
  height: 100vh;
}
.tab-container{
  display: flex;
  flex-direction: column;
}
.tab-container img{
  width: 24px;
  height: 24px;
  margin: 0 auto 5px;
}
.title{
  text-align: center;
}
#shelflist{
  position: absolute;
  width: 100vw;
  top: 60px;
  left: 0;
}
.box{
  width: 100vw;
  
}
#booklist{
  width: 100vw;
}
</style>
