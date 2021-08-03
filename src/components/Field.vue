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
    <Progress
      class="game-field__progress"
      :percents="Math.floor(this.turnTimeLeft * 20)"
    />
  </section>
</template>

<script>
import Card from "@/components/Card";
import Progress from "@/components/Progress";
export default {
  components: {
    Card,
    Progress,
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
      randomIndexArr: Array.apply(null, Array(this.cardsQty))
        .map((e, i) => i)
        .sort(() => Math.random() - 0.5),
      pairedCards: [],
      turnTime: 5,
      turnTimeLeft: 5,
    };
  },
  computed: {
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
          let firstCard = this.pairedCards.find(
            (c) => c.id === this.firstCardId
          );

          if (firstCard !== undefined) {
            if (clickedCard.icon === firstCard.icon) {
              clickedCard.visible = false;
              firstCard.visible = false;
            } else {
              clickedCard.opened = false;
              firstCard.opened = false;
            }
          }
          this.firstCardId = -1;
        } else {
          this.firstCardId = clickedCard.id;
          let pace = (this.turnTime / 100).toFixed(2);
          let interval = setInterval(() => {
            this.turnTimeLeft = (this.turnTimeLeft - pace).toFixed(2);
            if (this.turnTimeLeft <= 0) {
              clearInterval(interval);
            }
          }, pace * 1000);
        }
      }
    },
    getNextPairedCardIcon(cardIndex) {
      let cardsLength = this.getIcons.length;
      let indexInIcons =
        this.randomIndexArr[cardIndex] > cardsLength - 1
          ? this.randomIndexArr[cardIndex] - cardsLength
          : this.randomIndexArr[cardIndex];

      return this.getIcons[indexInIcons];
    },
  },
  created() {
    for (let i = 0; i < this.cardsQty; i++) {
      this.pairedCards.push({
        id: i,
        icon: this.getNextPairedCardIcon(i),
        opened: false,
        visible: true,
      });
    }
  },
};
</script>

<style scoped lang="less">
.game-field {
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: 0 0 20px 0 #e4d4f4;
  max-width: 55vw;
  max-width: clamp(320px, 55vw, 600px);
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

  &__progress {
    margin-top: 30px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
