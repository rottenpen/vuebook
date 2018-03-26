<template>
  <div id="booki">
      <mt-header fixed :title="tit">
        <mt-button @click="$router.push({name:'HelloWorld'})" icon="back" slot="left">返回</mt-button>
      </mt-header>
      <div id="contents" name="contents" v-if="result">
       <img :src="result.cover" alt="无图" onerror="javascript:this.src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521801756336&di=44b5ab8c98206c00ef1008082704627b&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3Deb32c1cfd6a20cf446c5f6db43396700%2F10dfa9ec8a136327d060847b978fa0ec09fac7ed.jpg'" id="cover">
            <p> 
                <span class="title">{{result.title}}</span></br>
                <span class="lastChapter">{{result.lastChapter}}</span>
            </p>
            <mt-button type="danger" @click="$router.push({name:'read',query:{id:source[2]._id},params:{chapter:0}})">阅读</mt-button>
      </div>
      <div class="longintro">
        <p>{{result.longIntro}}</p>
      </div>
  </div>
</template>

<script>
import url2Real from "../method/index.js";
export default {
  name: "booki",

  data() {
    return {
      tit: "书本信息",
      result: {
        _id: "",
        title: "",
        author: "", 
        longIntro: "",
        cover: "",
        majorCate: "",
        minorCate: "",
        creater: "",
        rating: { count: 0, score: 0, isEffect: true },
        sizetype: -1,
        superscript: "",
        currency: 0,
        contentType: "txt",
        _le: false,
        allowMonthly: false,
        allowVoucher: true,
        allowBeanVoucher: false,
        hasCp: true,
        postCount: 0,
        latelyFollower: 0,
        followerCount: 0,
        wordCount: 0,
        serializeWordCount: 0,
        retentionRatio: "0",
        updated: "0",
        isSerial: true,
        chaptersCount: 1087,
        lastChapter: "",
        gender: ["male"],
        tags: [],
        cat: "幻想修仙",
        donate: false,
        copyright: "",
        _gg: false,
        discount: null
      },
      source: "",
      sourceId: "",
      chapterNum:0
    };
  },
  created() {
    this.$http({
      method: "get",
      url: "/api/book/" + this.$route.params.id
    })
      .then(
        res => {
          this.result = res.data;
          this.result.cover = url2Real.url2Real(this.result.cover);

          // this.$set(this.result,res.data.books)
        },
        err => {
          console.log("error");
        }
      )
      .then(
        this.$http({
          method: "get",
          url: "/api/toc?view=summary&book=" + this.$route.params.id
        }).then(
          res => {
            this.source = res.data;
            let sourceId = res.data.length > 1 ? res.data[1]._id : res.data[0]._id;
            for (let item of res.data) {
              if (item.source === "my176") {
                sourceId = item._id;
              }
              this.sourceId = sourceId;
            }
            
            let shelf=localStorage.getItem('shelf')||[]
            let chapterNum=0
            let islocal=false
            for(let item of shelf){
              if(item.sourceId==this.sourceId){
                this.chapterNum=item.chapterNum
                islocal=true
              }
            }
            if(!islocal){
              shelf.push({
                cover:this.result.cover,
                bookname:this.result.title,
                chapterNum:this.chapterNum,
                sourceId:this.sourceId,
                lastChapter:this.result.lastChapter
              })
            }
            // this.$set(this.result,res.data.books)
          },
          err => {
            console.log("source error");
          }
        )
      );
  }
};
</script>



<style scoped>
#booki {
  width: 100%;
  height: 100%;
}
#contents {
  height: 420px;
  width: 100%;
  border-bottom: 1px solid #e1e1e2;
}
#cover{
  width: 80vw;
  height: 80vw;
}
.left {
  width: 20%;
  height: 100%;
  float: left;
}

.right {
  width: 80%;
  height: 100%;
  float: right;
}
.longintro{
    padding: 20px 35px;
    font-size: .8rem;
}
#contents{
  margin-top: 50px;
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 10px;
  background-color: #f5f5f5;
}
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  border-radius: 10px;
  background-color: rgb(245, 245, 247);
}
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgb(225, 225, 226);
  background-color: rgb(225, 225, 226);
}

</style>
