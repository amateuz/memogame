<template>
  <button class="btn" @click.prevent.stop="$emit('click')">
    <slot />
  </button>
</template>

<script>
export default {
  name: "Btn",
};
</script>

<style scoped lang="less">
.btn {
  background-color: rebeccapurple;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.15rem;
  margin-right: 10px;
  margin-left: 10px;
  outline: none;
  height: 40px;
  width: 200px;
  transition: all 0.2s ease;

  &:hover {
    background-color: lighten(rebeccapurple, 15);
    cursor: pointer;
  }

  &:active {
    background-color: lighten(rebeccapurple, 20);
    transform: translate(2px, 1px);
  }
}
</style>
