<template>
  <transition
    name="flip"
    @after-enter="clicked ? (frontVisible = true) : (frontVisible = false)"
    @before-leave="
      clicked ? (backVisible = false) : (backVisible = true);
      frontVisible = false;
    "
    mode="out-in"
  >
    <div
      class="card"
      :class="[
        clicked ? 'card_clicked' : null,
        backVisible ? 'card_back-visible' : null,
        frontVisible ? 'card_front-visible' : null,
      ]"
      @click="click()"
      :key="cardState"
    >
      <span class="card__front">
        <fa-icon :icon="icon" />
      </span>
      <span class="card__back">
        <fa-icon icon="question" />
      </span>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Card",
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      cardState: "initial",
      clicked: false,
      backVisible: true,
      frontVisible: false,
    };
  },
  methods: {
    click() {
      this.clicked = !this.clicked;
      if (this.clicked) this.cardState = "clicked";
      else this.cardState = "initial";
    },
  },
};
</script>

<style lang="less">
.card {
  @r: .card;

  border: 1px solid #666;
  border-radius: 6px;
  box-shadow: 4px 4px 6px 1px rgba(0, 0, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  height: 60px;
  position: relative;
  width: 60px;
  transform-origin: center center;
  will-change: transform;

  &:hover {
    cursor: pointer;

    &:not(@{r}_clicked) {
      background-color: lighten(#e4d4f4, 6);
    }
  }

  &:active:not(@{r}_clicked) {
    background-color: #e4d4f4;
  }

  &__back {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }

  &__front {
    opacity: 0;
    transform: rotateY(-180deg);
  }

  &_clicked {
    box-shadow: -4px 4px 6px 1px rgba(0, 0, 255, 0.2);
  }

  &_front-visible {
    transform: rotateY(180deg);
    @{r}__front {
      opacity: 1;
    }
  }

  &_back-visible {
    @{r}__back {
      opacity: 1;
    }
  }
}

.flip-enter {
  transform: rotateY(180deg);
}

.flip-enter-active {
  box-shadow: 4px 4px 6px 1px rgba(0, 0, 255, 0.2);
  transition: all 0.18s linear;
}

.flip-leave-active {
  box-shadow: -4px 4px 6px 1px rgba(0, 0, 255, 0.2);
  transition: 0.05s ease;
}
</style>
