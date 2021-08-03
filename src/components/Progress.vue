<template>
  <div class="progress" :style="`transform: scaleX(${this.percents / 100})`" />
</template>

<script>
export default {
  name: "Progress",
  props: {
    percents: {
      type: Number,
      required: false,
      default: 100,
      validator: (value) => {
        return value <= 100 && value >= 0;
      },
    },
  },
};
</script>

<style scoped lang="less">
.progress {
  background-color: chartreuse;
  border-radius: 6px;
  height: 5px;
  float: right;
  max-width: 600px;
  position: relative;
  width: 100%;
  transform-origin: center right;
  transform: scaleX(1);
  transition: transform 0.3s ease;
}
</style>
