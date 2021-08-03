<template>
  <div id="app">
    <h1>Memo Game</h1>
    <section class="game" :class="{ game_stopped: !this.getGameStarted }">
      <section class="game__meta">
        <Timer class="game__timer" @start="startGame" @stop="stopGame" />
      </section>
      <Field
        class="game__field"
        @click.native="
          !getGameStarted
            ? showPopover($event, 'Please press Start to start the game!')
            : null
        "
      />
      <section class="game__info">
        <Popover
          class="game__popover"
          :hidden="popoverHidden"
          :text="popoverText"
        />
      </section>
    </section>
  </div>
</template>

<script>
import Field from "@/components/Field";
import Popover from "@/components/Popover";
import Timer from "@/components/Timer";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  components: {
    Field,
    Popover,
    Timer,
  },
  data() {
    return {
      popoverHidden: true,
      popoverText: "",
    };
  },
  computed: {
    ...mapGetters(["getGameStarted"]),
  },
  methods: {
    ...mapActions(["setGameStarted"]),
    showPopover(evt, text, seconds = 5) {
      if (this.popoverHidden) {
        this.popoverHidden = false;
        this.popoverText = text;

        setTimeout(() => {
          this.popoverHidden = true;
        }, seconds * 1000);
      }
    },
    startGame() {
      this.setGameStarted(true);
    },
    stopGame() {
      this.setGameStarted(false);
    },
  },
};
</script>

<style lang="less">
html,
body {
  overflow-x: hidden;
}
body {
  position: relative;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.game {
  * {
    // outline: 1px solid red;
  }

  display: grid;
  grid-template-columns: 1fr;

  &_stopped {
    .game-field__card {
      pointer-events: none;
      touch-action: none;
    }
  }

  &__field {
    margin-top: 30px;
    margin-left: auto;
    margin-right: auto;
  }

  &__popover {
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
  }
}

@media (min-width: 950px) {
  .game {
    grid-template-columns: repeat(3, 1fr);

    &__field {
      margin-top: 0;
      margin-left: 0;
      margin-right: 0;
    }

    &__popover {
      margin-top: 0;
    }
  }
}
</style>
