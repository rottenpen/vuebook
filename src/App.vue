<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.mint-header{
  background-color: #42b983;
}
.mint-search-list-warp{
  z-index: 10;
  border-bottom: gray solid 1px;
  
}
.mint-search-list{
  top: auto;
  right: auto;
  bottom: auto;
  left: auto;
  padding-top: 0;
  width: 100vw;
  z-index: 10;
}

</style>
