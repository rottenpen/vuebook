<template>
  <div id="read">
    <div id="contents" name="contents" :class="color">
      <h2>{{title}}</h2>
      <pre id="body" @click="handleClick" :class="fontsize[size]">{{tobody}}</pre>
      <div class="select">
        <mt-button id="prev" v-if="chapters!=0" @click="prev">上一章</mt-button>
        <mt-button id="next" @click="next">下一章</mt-button>
      </div>
    </div>
		<mt-popup v-model="popupVisible" popup-transition="popup-fade" position="bottom">
      <div class="popupboxbottom">
        <div class="colorbox">
          <div class="normal selectcolor" @click="selectcolor('normal')"></div>
          <div class="brown selectcolor" @click="selectcolor('brown')"></div>
          <div class="green selectcolor" @click="selectcolor('green')"></div>
          <div class="night selectcolor" @click="selectcolor('night')"></div>
        </div>
        <div class="buttonbox">
          <mt-button id="prev" v-if="chapters!=0" @click="prev">上一章</mt-button>
          <mt-button class="bigger" @click="bigger()" :disabled="size>=6?true:false">Aa+</mt-button>
          <mt-button class="smaller" @click="smaller()" :disabled="size<=0?true:false">Aa-</mt-button>
          <mt-button  @click="showcatalog()" >目录</mt-button>
          <mt-button id="next" @click="next">下一章</mt-button>
        </div>
        
      </div>
      
	  </mt-popup>	
    <mt-popup v-model="popupLeft" popup-transition="popup-fade" position="left">
  	  <div class="popupboxleft">
        <mt-cell
          v-for="(item,index) in result"
          :title="item.title"
          :to="'read/'+index+'?id='+sourceid"
          is-link
          >
        </mt-cell>
      </div>
	  </mt-popup>	
  </div>
  
</template>
<script>
export default {
  name: "read",
  components: {},
  data() {
    return {
      title: "",
      body: "",
      flag: true,
      index: 0,
      chapterList: "",
      popupVisible: false,
      popupLeft: false,
      chapters: 0,
      color: "normal",
      fontsize: ["px12", "px16", "px20", "px24", "px28", "px32", "px36"],
      size: 1,
      result:''
    };
  },
  computed: {
    tobody: function() {
      return "   " + this.body.replace(/\n/g, "\n   ");
    }
  },
  methods: {
    handleClick() {
      this.popupVisible = true;
      console.log("ok");
    },
    selectcolor(color) {
      this.color = color;
      console.log("??");
    },
    bigger() {
      if (this.size != 6) {
        this.size++;
      }
    },
    smaller() {
      if (this.size != 0) {
        this.size--;
      }
    },
    showcatalog() {
      this.popupLeft = true;
    },
    prev() {
      let chapter = parseInt(this.chapters);
      this.$router.push({
        name: "read",
        query: { id: this.$route.query.id },
        params: { chapter: chapter - 1 }
      });
    },
    next() {
      let chapter = parseInt(this.chapters);
      this.$router.push({
        name: "read",
        query: { id: this.$route.query.id },
        params: { chapter: chapter + 1 }
      });
    },
    loadchapter() {
      this.chapters = this.$route.params.chapter;
      this.$http({
        method: "get",
        url: "/api/toc/" + this.$route.query.id + "?view=chapters"
      })
        .then(
          res => {
            console.log(res.data.chapters);
            this.result = res.data.chapters;
            console.log(this.result);
            // localStorage.setItem("now-chapterlist", this.data.chapters);
            // this.$set(this.result,res.data.books)
          },
          err => {
            console.log("error");
          }
        )
        .then(() => {
          let link = encodeURIComponent(this.result[this.chapters].link);
          console.log(link);
          this.$http({
            method: "get",
            url: "/chapter/" + link + "?k=2124b73d7e2e1945&t=1468223717"
          }).then(
            resp => {
              this.body = resp.data.chapter.body;
              this.title = resp.data.chapter.title;
              // this.$set(this.result,res.data.books)
            },
            err => {
              this.body = "错误章节，请换源";
            }
          );
        });
    }
  },
  created() {
    this.loadchapter();
    this.sourceid=this.$route.query.id
  },
  watch: {
    $route(to, from) {
      this.loadchapter();
      this.popupVisible= false;
      this.popupLeft= false;
      (function smoothscroll() {
        var currentScroll =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo(0, currentScroll - currentScroll / 5);
        }
      })();
    }
  }
};
</script>
<style scoped>
#contents,
#read,
#body {
  min-width: 100vw;
  min-height: 100vh;
}
#body {
  text-align: left;
}
.normal {
  background: #e0e0e0;
}
pre {
  white-space: pre-wrap;
}
.pop {
  width: 100vw;
  height: 200px;
}
.popupboxleft {
  width: 50vw;
  height: 100vh;
  overflow-y: scroll;
}
.selectcolor {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.brown {
  background: #cdc673;
}
.night {
  background: #1a1a1a;
  color: #e0e0e0;
}
.green {
  background: #7ccd7c;
}
.colorbox {
  display: flex;
  flex-direction: row;
}
.popupboxbottom {
  width: 100vw;
  height: 100px;
  background-color: #404040;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.px12 {
  font-size: 12px;
}
.px16 {
  font-size: 16px;
}
.px20 {
  font-size: 20px;
}
.px24 {
  font-size: 24px;
}
.px28 {
  font-size: 28px;
}
.px32 {
  font-size: 32px;
}
.px36 {
  font-size: 36px;
}
</style>