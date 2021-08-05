<template>
  <form class="dialog" :class="{ dialog_hidden: !visible }">
    <fieldset>
      <legend>Please enter your name</legend>
      <input class="dialog__input" v-model="name" />
      <span
        class="dialog__result"
        :class="{ dialog__result_error: !result.success }"
      >
        {{ result.text }}</span
      >
      <Btn class="dialog__btn" @click="submit"> Submit </Btn>
    </fieldset>
  </form>
</template>

<script>
import Btn from "@/components/Btn";
export default {
  name: "Dialog",
  components: {
    Btn,
  },
  props: {
    visible: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      result: {
        success: true,
        text: "",
      },
      name: "",
    };
  },
  methods: {
    submit() {
      if (this.name === "") {
        this.result.success = false;
        this.result.text = "Please enter your name";
      } else {
        this.result.success = true;
        this.$emit("submit", this.name);
      }
    },
  },
};
</script>

<style scoped lang="less">
.dialog {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: 0 0 20px 0 #e4d4f4;
  max-width: 300px;
  padding: 15px 10px 10px 10px;
  transition: transform 0.3s ease;
  transform-origin: center center;
  transform: scale(1);

  &_hidden {
    touch-action: none;
    pointer-events: none;
    transform: scale(0);
  }

  fieldset {
    border: none;
    border-radius: 6px;
    // box-shadow: 0 0 20px 0 #e4d4f4;
    display: inline-block;
    padding: 20px 30px 20px 30px;
  }

  legend {
    background-color: transparent;
    position: relative;
  }

  input {
    border: 1px solid #ccc;
    border-radius: 6px;
    display: block;
    font-size: 1.25rem;
    padding: 10px;
    outline: none;
    margin-left: auto;
    margin-right: auto;
  }

  &__btn {
    display: block;
    margin-top: 7px;
    margin-left: auto;
    margin-right: auto;
  }

  &__result {
    color: green;
    display: inline-block;
    font-size: 14px;
    margin-top: 3px;
    width: 100%;
    white-space: normal;

    &_error {
      color: red;
    }
  }
}
</style>
