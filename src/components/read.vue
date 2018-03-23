<template>
  <div id="read">
    <div id="contents" name="contents">
      <h2>{{title}}</h2>
      <pre id="body">{{tobody}}</pre>
      <div class="select">
        <div id="prev" >上一章</div>
        <div id="next">下一章</div>
      </div>
      
    </div>
  </div>
</template>
<script>

export default {
  name: 'read',
  components: {

  },
  data() {
    return {
      title: '',
      body:'',
      flag:true,
      index:0,
      chapterList:''
    }
  },
  computed:{
    tobody:function(){
      return '   '+ this.body.replace(/\n/g, "\n   ")
    }
  },
  created() {
    this.$http({
      method: 'get',
      url: '/chapter/' + this.$route.query.link + '?k=2124b73d7e2e1945&t=1468223717'
    }).then((res) => {
      this.body = res.data.chapter.body
      this.title = res.data.chapter.title
      // this.$set(this.result,res.data.books)
    }, (err) => {
      this.body='错误章节，请换源'
    })
  }
}
</script>
<style scoped>
#contents,
#read ,#body{
  width: 100%;
  height: 100%;
  background: #e0e0e0;
}
pre{
  white-space: pre-wrap;
}
</style>