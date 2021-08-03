<template>
  <section class="timer">
    <button class="timer__btn" @click.prevent="startOrResetTimer">
      {{ btnText }}
    </button>
    <div class="timer__counter">
      {{ getFormattedTime(elapsedSeconds) }}
    </div>
  </section>
</template>

<script>
export default {
  name: "Timer",
  data() {
    return {
      btnText: "Start",
      elapsedSeconds: 0,
      interval: null,
    };
  },
  methods: {
    formatToDoubleDigits(number) {
      if (number > 9) return "" + number;
      return "0" + number;
    },
    getFormattedTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      return `${this.formatToDoubleDigits(minutes)}:${this.formatToDoubleDigits(
        seconds % 60
      )}`;
    },
    resetTimer() {
      this.stopTimer();
      this.minutes = 0;
      this.seconds = 0;
      this.btnText = "Start";
    },
    startOrResetTimer() {
      if (this.interval === null) {
        this.btnText = "Reset";
        this.startTimer();
      } else {
        this.resetTimer();
      }
    },
    startTimer() {
      const startTime = Date.now();
      this.interval = setInterval(() => {
        const delta = Math.floor((Date.now() - startTime) / 1000);
        this.elapsedSeconds = delta;
      }, 980);
      this.$emit("start");
    },
    stopTimer() {
      clearInterval(this.interval);
      this.interval = null;
      this.$emit("stop");
    },
  },
};
</script>

<style scoped lang="less">
.timer {
  &__btn {
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
  &__counter {
    font-size: 2rem;
    font-weight: 700;
    margin-top: 20px;
  }
}
</style>
