<template>
  <section class="timer" :class="{ timer_disabled: disabled }">
    <Btn class="timer__btn" @click="startOrResetTimer">
      {{ btnText }}
    </Btn>
    <div class="timer__counter">
      {{ getFormattedTime(elapsedSeconds) }}
    </div>
  </section>
</template>

<script>
import Btn from "@/components/Btn";
import { mapGetters } from "vuex";
export default {
  name: "Timer",
  components: {
    Btn,
  },
  computed: {
    ...mapGetters(["getGameFinished", "getGameStarted"]),
  },
  data() {
    return {
      btnText: "Start",
      elapsedSeconds: 0,
      disabled: false,
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
      this.elapsedSeconds = 0;
      this.btnText = "Start";
      this.$emit("reset");
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
        this.elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      }, 980);
      this.$emit("start");
    },
    stopTimer() {
      clearInterval(this.interval);
      this.interval = null;
      this.$emit("stop", this.elapsedSeconds);
    },
  },
  watch: {
    getGameStarted(newState) {
      if (!newState) {
        this.btnText = "Start";
        this.elapsedSeconds = 0;
      }
    },
    getGameFinished(newState) {
      if (newState) {
        this.stopTimer();
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.timer {
  @r: .timer;
  &_disabled {
    @{r}__btn {
      background-color: #555;
      pointer-events: none;
      touch-action: none;
    }
  }

  &__counter {
    font-size: 2rem;
    font-weight: 700;
    margin-top: 15px;
  }
}
</style>
