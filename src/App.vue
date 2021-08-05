<template>
  <div id="app">
    <h1>Memo Game</h1>
    <section
      class="game"
      :class="{ game_stopped: !this.getGameStarted || blockField }"
    >
      <section class="game__meta">
        <Timer
          class="game__timer"
          @start="startGame"
          @reset="resetGame"
          @stop="getScore($event)"
        />
        <Popover
          class="game__popover"
          :text="popoverText"
          :visible="popoverVisible"
        />
      </section>
      <section class="game__field-container">
        <Field
          class="game__field"
          :cards-qty="36"
          @click.native="
            !getGameStarted && blockField
              ? showPopover($event, 'Press Start to start the game!')
              : null
          "
          @turnStart="startTurn"
          @secondCardClicked="secondCardClicked"
          @turnEnd="endTurn($event)"
        >
          <Dialog
            class="game-field__dialog"
            :visible="formVisible"
            @submit="saveResult($event)"
          />
          <Progress class="game-field__progress" :percents="getTurnProgress" />
        </Field>
      </section>
      <section class="game__info">
        <ResultsTable
          v-if="results.length > 0"
          class="game__result-table"
          :data="results"
        />
      </section>
    </section>
  </div>
</template>

<script>
import Dialog from "@/components/Dialog";
import Field from "@/components/Field";
import Popover from "@/components/Popover";
import Progress from "@/components/Progress";
import ResultsTable from "@/components/ResultsTable";
import Timer from "@/components/Timer";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  components: {
    Dialog,
    Field,
    Popover,
    Progress,
    ResultsTable,
    Timer,
  },
  data() {
    return {
      blockField: true,
      formVisible: false,
      popoverText: "",
      popoverVisible: false,
      score: 0,
      results: [],
      turnIntervalFunction: null,
      turnTime: 5000,
      turnTimeLeft: 5000,
      turnTimeout: 100,
    };
  },
  computed: {
    ...mapGetters(["getGameStarted", "getTurnTimeIsUp", "getGameFinished"]),
    getTurnProgress() {
      return this.getGameStarted
        ? Math.floor((this.turnTimeLeft * 100) / this.turnTime)
        : 100;
    },
  },
  methods: {
    ...mapActions(["setGameStarted", "setTurnTimeIsUp", "setGameFinished"]),
    showPopover(evt, text, seconds = 5) {
      if (!this.popoverVisible) {
        this.popoverVisible = true;
        this.popoverText = text;

        setTimeout(() => {
          this.popoverVisible = false;
        }, seconds * 1000);
      }
    },
    startGame() {
      this.$store.dispatch("setGameFinished", false).then(() => {
        this.$store.dispatch("setGameStarted", true);
      });
      this.blockField = false;
      this.turnTimeLeft = this.turnTime;
    },
    resetGame() {
      this.$store.dispatch("setGameFinished", false).then(() => {
        this.$store.dispatch("setGameStarted", false);
      });
      this.blockField = true;
      this.turnTimeLeft = this.turnTime;
    },
    startTurn() {
      let startTime = Date.now();
      this.turnIntervalFunction = setInterval(() => {
        const dt = Date.now() - startTime;
        this.turnTimeLeft = this.turnTime - dt;
        if (this.turnTimeLeft <= 0) {
          clearInterval(this.turnIntervalFunction);
          this.$store
            .dispatch("setTurnTimeIsUp", true)
            .then(() => this.$store.dispatch("setTurnTimeIsUp", false));
          this.turnTimeLeft = 0;
          this.blockField = true;
          setTimeout(() => {
            this.endTurn();
          }, 2 * this.turnTimeout);
        }
      }, this.turnTimeout);
    },
    secondCardClicked() {
      clearInterval(this.turnIntervalFunction);
      this.blockField = true;
    },
    endTurn(gameFinished) {
      if (!gameFinished) {
        this.blockField = false;
        this.turnTimeLeft = this.turnTime;
      } else {
        this.formVisible = true;
        this.$store.dispatch("setGameFinished", true);
      }
    },
    getScore(score) {
      this.score = score;
    },
    getCurrentResults() {
      let results = [];
      if (localStorage.getItem("results")) {
        try {
          results = JSON.parse(localStorage.getItem("results"));
        } catch (e) {
          localStorage.removeItem("results");
        }
      }
      this.results = results.sort((a, b) => a.score - b.score);
    },
    saveResult(name) {
      this.formVisible = false;
      this.results.push({ name, score: this.score });
      this.results.sort((a, b) => a.score - b.score);
      if (this.results.length >= 10) {
        this.results.pop();
      }

      const jsonResults = JSON.stringify(this.results);
      localStorage.setItem("results", jsonResults);

      this.$store.dispatch("setGameFinished", false);
      this.$store.dispatch("setGameStarted", false);
    },
  },
  created() {
    this.getCurrentResults();
  },
};
</script>

<style lang="less">
html,
body {
  overflow-x: hidden;
}
body {
  background-color: #efefef;
  margin: 5px;
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
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 100px auto;

  &_stopped {
    .game-field__card {
      pointer-events: none;
      touch-action: none;
    }
  }

  &__field-container {
    margin-top: 15px;
    margin-left: auto;
    margin-right: auto;
  }

  &__popover {
    margin-left: auto;
    margin-right: auto;
    margin-top: 0;
  }

  &__result-table {
    margin-top: 15px;
  }
}

@media (min-width: 815px) {
  #app {
    height: 700px;
  }
  .game {
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 100px auto;

    &__field-container {
      margin-top: 0;
      grid-column-start: 2;
      grid-row-start: 1;
      grid-row-end: 2;
    }

    &__meta {
      grid-row-start: 1;
      grid-column-start: 1;
    }
    &__info {
      grid-row-start: 2;
      grid-column-start: 1;
    }
  }
}

@media (min-width: 1250px) {
  .game {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;

    &__field-container {
      grid-column-start: 2;
      grid-column-end: 2;
      margin-left: 0;
      margin-right: 0;
    }

    &__info {
      grid-column-start: 3;
      grid-column-end: 3;
      grid-row-start: 1;
    }

    &__meta {
      grid-column-start: 1;
      grid-column-end: 1;
      grid-row-start: 1;
    }

    &__popover {
      margin-top: 15px;
    }

    &__result-table {
      margin-top: 0;
    }
  }
}
</style>
