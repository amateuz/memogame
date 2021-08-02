<template>
  <section class="game-field">
    <section class="game-field__cards">
      <Card
        class="game-field__card"
        v-for="i in cardsQty"
        :key="i"
        :icon="getNextIconName(i - 1)"
        @click="cardClicked($event)"
      />
    </section>
    <slot />
  </section>
</template>

<script>
import Card from "@/components/Card";
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
      clickedCard: "",
      randomIndexArr: Array.apply(null, Array(this.cardsQty))
        .map((e, i) => i)
        .sort(() => Math.random() - 0.5),
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
    };
  },
  computed: {
    getIcons() {
      let iconsQty = this.cardsQty / 2;
      return this.icons.length !== iconsQty
        ? this.icons.slice(0, iconsQty)
        : this.icons;
    },
  },
  methods: {
    cardClicked(cardName) {
      if (this.clickedCard === "") {
        this.clickedCard = cardName;
      }
    },
    getNextIconName(i) {
      let iconsLength = this.getIcons.length;
      let indexInIcons =
        this.randomIndexArr[i] > iconsLength - 1
          ? this.randomIndexArr[i] - iconsLength
          : this.randomIndexArr[i];

      return this.getIcons[indexInIcons];
    },
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
}
</style>
