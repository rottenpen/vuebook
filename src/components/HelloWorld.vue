<template>
  <div class="homepage">
    <mt-header fixed title="推荐"></mt-header>
    <div>
      <div class="stack-wrapper">
        <stack ref="stack" @upup='pageup' :pages="someList" :stackinit="stackinit"></stack>
      </div>
      <div class="controls">
        <button @click="prev" class="button"><i class="prev"></i><span class="text-hidden">prev</span></button>
        <button @click="next" class="button"><i class="next"></i><span class="text-hidden">next</span></button>
      </div>
    </div>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="推荐" >
        <div  class="tab-container">
          <img slot="icon" src="../assets/earth.png">
          推荐
        </div>
      </mt-tab-item>
      <mt-tab-item id="书架" >
        <div @click="$router.push({name:'bookshelf'})" class="tab-container">
          <img slot="icon" src="../assets/notebook.png">
          书架
        </div>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import stack from "../components/stack";
export default {
  name: "homepage",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      selected: "推荐",
      someList: [],
      stackinit: {
        visible: 3,
        currentPage: 0
      },
      pageid:'5816b415b06d1d32157790b1',
      bookId:['5816b415b06d1d32157790b1','52e13475c09f68641700068d','592fe687c60e3c4926b040ca','53855a750ac0b3a41e00c7e6','59e2c2b08bde16e66f9e3b85','582c62b16b292ab6169692e7','5622536e06d01acc43f041e3']
    };
  },
  mounted() {
    let that = this;
    setTimeout(function() {
      that.someList = [
        {
          html:
            '<img class="cover" src="https://qidian.qpic.cn/qdbimg/349573/1004608738/150" alt="01"><div>圣墟</div>'
        },
        {
          html:
            '<img class="cover" src="https://qidian.qpic.cn/qdbimg/349573/3070038/180" alt="02"><div>大宋的智慧</div>'
        },
        {
          html:
            '<img class="cover" src="https://qidian.qpic.cn/qdbimg/349573/2789022/150" alt="03"><div>剑来</div>'
        },
        {
          html:
            '<img class="cover" src="https://qidian.qpic.cn/qdbimg/349573/3347595/150" alt="04"><div>择天记</div>'
        },
        {
          html:
            '<img class="cover" src="https://qidian.qpic.cn/qdbimg/349573/1010496369/150" alt="05"><div>大道朝天</div>'
        },
        {
          html:
            '<img class="cover" src="https://img1.doubanio.com/lpic/s2768378.jpg" alt="06"><div>三体</div>'
        },
        {
          html:
            '<img class="cover" src="http://www.zhuaji.org/files/article/image/1/1490/1490s.jpg" alt="07"><div>龙族</div>'
        }
      ];
    }, 0);
  },
  components: {
    stack
  },
  methods: {
    pageup(page){
      this.stackinit.currentPage=page
      console.log(this.stackinit.currentPage)
      this.pageid=this.bookId[this.stackinit.currentPage]
    },
    prev() {
      this.$refs.stack.$emit("prev");
      console.log('prev')
      console.log(this.stackinit.currentPage)
    },
    next() {
      this.$router.push({name:'booki',params:{id:this.pageid}})
      this.$refs.stack.$emit("next");
      console.log('next')
      
      console.log(this.stackinit.currentPage)
      
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.stack-wrapper {
  margin: 60px auto;
  position: relative;
  z-index: 1000;
  width: 320px;
  height: 335px;
  padding: 0;
  list-style: none;
  pointer-events: none;
}
.controls {
  position: relative;
  width: 200px;
  text-align: center;
  display: flex; /*Flex布局*/
  display: -webkit-flex; /* Safari */
  justify-content: space-around;
  margin: 0 auto;
  margin-top: 50px;
}
.controls .button {
  border: none;
  background: none;
  position: relative;
  display: inline-block;
  cursor: pointer;
  font-size: 16px;
  width: 50px;
  height: 50px;
  z-index: 100;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  border-radius: 50%;
  background: #fff;
}
.button .next {
  display: inline-block;
  width: 10px;
  height: 5px;
  background: rgb(129, 212, 125);
  line-height: 0;
  font-size: 0;
  vertical-align: middle;
  -webkit-transform: rotate(45deg);
  left: -5px;
  top: 2px;
  position: relative;
}
.button .next:after {
  content: "/";
  display: block;
  width: 20px;
  height: 5px;
  background: rgb(129, 212, 125);
  -webkit-transform: rotate(-90deg) translateY(-50%) translateX(50%);
}
.button .prev {
  display: inline-block;
  width: 20px;
  height: 5px;
  background: rgb(230, 104, 104);
  line-height: 0;
  font-size: 0;
  vertical-align: middle;
  -webkit-transform: rotate(45deg);
}
.button .prev:after {
  content: "/";
  display: block;
  width: 20px;
  height: 5px;
  background: rgb(230, 104, 104);
  -webkit-transform: rotate(-90deg);
}
.controls .text-hidden {
  position: absolute;
  overflow: hidden;
  width: 0;
  height: 0;
  color: transparent;
  display: block;
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
</style>
