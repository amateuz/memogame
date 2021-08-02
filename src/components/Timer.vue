<template>
  <section class="timer">
    <button class="timer__btn" @click.prevent="startOrResetTimer">
      {{ btnText }}
    </button>
    <div class="timer__counter">
      {{ getFormattedTime(minutes) }}:{{ getFormattedTime(seconds) }}
    </div>
  </section>
</template>

<script>
export default {
  name: "Timer",
  data() {
    return {
      btnText: "Start",
      minutes: 0,
      seconds: 0,
      interval: null,
    };
  },
  methods: {
    getFormattedTime(time) {
      return time < 10 ? "0" + time : "" + time;
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
      this.interval = setInterval(() => {
        if (this.seconds < 59) {
          ++this.seconds;
        } else if (this.minutes < 99) {
          this.seconds = 0;
          ++this.minutes;
        } else {
          this.stopTimer();
          this.btnText = "Start";
        }
      }, 1000);
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
