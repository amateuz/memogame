<template>
  <section class="popover" :class="hidden ? 'popover_hidden' : null">
    {{ text }}
  </section>
</template>

<script>
export default {
  name: "Popover",
  props: {
    hidden: {
      type: Boolean,
      required: false,
      default: false,
    },
    text: {
      type: String,
      required: true,
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
  opacity: 0.92;
  height: auto;
  width: 100%;
  max-width: 250px;
  transform-origin: center center;
  transition: all 0.3s ease;
  transform: scale(1);
  z-index: 99;

  &_hidden {
    transform: scale(0);
  }
}
</style>
