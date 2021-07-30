<template>
  <section class="game">
    <section class="game__field">
      <Card
        class="game__card"
        v-for="i in cardsQty"
        :key="i"
        :icon="getNextIconName(i - 1)"
      />
    </section>
    <section class="game__progress-section">
      <Progress class="game__progress" />
    </section>
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
  methods: {
    getNextIconName(i) {
      let indexInIcons =
        this.randomIndexArr[i] > this.icons.length - 1
          ? this.randomIndexArr[i] - this.icons.length
          : this.randomIndexArr[i];

      return this.icons[indexInIcons];
    },
  },
};
</script>

<style scoped lang="less">
.game {
  &__field {
    border: 1px solid #ccc;
    border-radius: 6px;
    box-shadow: 0 0 20px 0 #e4d4f4;
    height: 600px;
    width: 600px;
    margin-left: auto;
    margin-right: auto;
    padding: 20px;

    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 5px;
    align-items: center;
    justify-items: center;
  }

  &__card {
    color: rebeccapurple;
    font-size: 36px;
  }

  &__progress-section {
    margin-top: 20px;
  }

  &__progress {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
