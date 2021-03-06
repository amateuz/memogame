<template>
  <section class="game-field">
    <section class="game-field__cards">
      <Card
        class="game-field__card"
        v-for="i in cardsQty"
        :key="i"
        :id="pairedCards[i - 1].id"
        :icon="pairedCards[i - 1].icon"
        :opened="pairedCards[i - 1].opened"
        :visible="pairedCards[i - 1].visible"
        @click="cardClicked($event)"
      />
    </section>
    <slot />
  </section>
</template>

<script>
import Card from "@/components/Card";
import { mapGetters } from "vuex";
export default {
  components: {
    Card,
  },
  name: "Field",
  props: {
    cardsQty: {
      type: Number,
      required: false,
      default: 36,
      validator: (value) => {
        return value <= 36 && value % 2 === 0;
      },
    },
  },
  data() {
    return {
      firstCardId: -1,
      icons: [
        "air-freshener",
        "anchor",
        "apple-alt",
        "atom",
        "baby-carriage",
        "bed",
        "bell",
        "candy-cane",
        "coffee",
        "fish",
        "feather-alt",
        "ghost",
        "jedi",
        "heart",
        "hippo",
        "lemon",
        "tram",
        "tree",
      ],
      pairedCards: [],
      randomIndexArr: [],
    };
  },
  computed: {
    ...mapGetters(["getGameStarted", "getTurnTimeIsUp"]),
    getIcons() {
      let uniqueCardsQty = this.cardsQty / 2;
      return this.icons.length !== uniqueCardsQty
        ? this.icons.slice(0, uniqueCardsQty)
        : this.icons;
    },
  },
  methods: {
    cardClicked(card) {
      if (card.id === this.firstCardId) return;

      let clickedCard = this.pairedCards.find((c) => c.id === card.id);

      if (clickedCard !== undefined) {
        clickedCard.opened = !clickedCard.opened;

        if (this.firstCardId >= 0) {
          this.$emit("secondCardClicked");
          let firstCard = this.pairedCards.find(
            (c) => c.id === this.firstCardId
          );

          if (firstCard !== undefined) {
            setTimeout(() => {
              if (clickedCard.icon === firstCard.icon) {
                clickedCard.visible = false;
                firstCard.visible = false;
              } else {
                clickedCard.opened = false;
                firstCard.opened = false;
              }
              this.firstCardId = -1;
              this.$emit("turnEnd", this.checkGameFinished());
            }, 1000);
          }
        } else {
          this.firstCardId = clickedCard.id;
          this.$emit("turnStart");
        }
      }
    },
    createNewField() {
      this.pairedCards = [];
      this.randomIndexArr = this.getRandomIndexArr();
      for (let i = 0; i < this.cardsQty; i++) {
        this.pairedCards.push({
          id: i,
          icon: this.getNextPairedCardIcon(i),
          opened: false,
          visible: true,
        });
      }
    },
    checkGameFinished() {
      return this.pairedCards.find(c => c.visible) === undefined
    },
    getNextPairedCardIcon(cardIndex) {
      const cardsLength = this.getIcons.length;
      const indexInIcons =
        this.randomIndexArr[cardIndex] > cardsLength - 1
          ? this.randomIndexArr[cardIndex] - cardsLength
          : this.randomIndexArr[cardIndex];

      return this.getIcons[indexInIcons];
    },
    getRandomIndexArr() {
      return Array.apply(null, Array(this.cardsQty))
        .map((e, i) => i)
        .sort(() => Math.random() - 0.5);
    },
  },
  created() {
    this.createNewField();
  },
  watch: {
    getGameStarted(newState) {
      if (!newState) {
        this.createNewField();
      }
    },
    getTurnTimeIsUp(newState) {
      if (newState) {
        this.firstCardId = -1;
        this.pairedCards
          .filter((c) => c.opened)
          .forEach((c) => (c.opened = false));
      }
    },
  },
};
</script>

<style scoped lang="less">
.game-field {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
  box-shadow: 0 0 20px 0 #e4d4f4;
  min-width: 320px;
  max-width: 55vw;
  max-width: clamp(320px, 75vw, 100%);
  padding: 20px;

  &__cards {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 2vmin;
    align-items: center;
    justify-items: center;
  }

  &__card {
    color: rebeccapurple;
    font-size: 2.5rem;
    font-size: clamp(1.5rem, 5vw, 2.5rem);
  }

  &__dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;

    &.dialog_hidden {
      transform: scale(0) translate(-50%, -50%);
    }
  }

  &__progress {
    margin-top: 30px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
