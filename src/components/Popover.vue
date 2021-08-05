<template>
  <section class="popover" :class="{ 'popover_hidden' : !visible }">
    {{ text }}
  </section>
</template>

<script>
export default {
  name: "Popover",
  props: {
    text: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
};
</script>

<style scoped lang="less">
.popover {
  background-color: #2c3e50;
  border-radius: 6px;
  color: #fff;
  font-size: 1rem;
  padding: 20px;
  opacity: 0.96;
  height: auto;
  width: 100%;
  position: relative;
  max-width: 250px;
  transform-origin: center center;
  transition: all 0.3s ease;
  transform: scale(1);
  z-index: 9;

  &_hidden {
    transform: scale(0);
  }
}
</style>
