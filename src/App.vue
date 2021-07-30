<template>
  <div id="app">
    <h1>Memo Game</h1>
    <Field />
  </div>
</template>

<script>
import Field from "@/components/Field";

export default {
  name: "App",
  components: {
    Field,
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
