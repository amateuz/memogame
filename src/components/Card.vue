<template>
  <transition
    name="flip"
    @after-enter="opened ? (frontVisible = true) : (frontVisible = false)"
    @before-leave="
      opened ? (backVisible = false) : (backVisible = true);
      frontVisible = false;
    "
    mode="out-in"
  >
    <div
      class="card"
      :class="[
        { card_opened: opened },
        { 'card_back-visible': backVisible },
        { 'card_front-visible': frontVisible },
        { card_hidden: !visible },
      ]"
      @click="click()"
      :key="opened"
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
    id: {
      type: Number,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    opened: {
      type: Boolean,
      required: false,
      default: false,
    },
    visible: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      backVisible: !this.opened,
      frontVisible: this.opened,
    };
  },
  methods: {
    click() {
      this.$emit("click", {
        id: this.id,
        icon: this.icon,
        opened: this.opened,
        visible: this.visible,
      });
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
  height:~"min(6vh, 4vw)";
  width: ~"min(6vh, 4vw)";
  position: relative;
  transform-origin: center center;
  will-change: transform;

  &:hover {
    cursor: pointer;

    &:not(@{r}_opened) {
      background-color: lighten(#e4d4f4, 6);
    }
  }

  &:active:not(@{r}_opened) {
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

  &_back-visible {
    @{r}__back {
      opacity: 1;
    }
  }

  &_hidden {
    opacity: 0;
    pointer-events: none;
    touch-action: none;
    transition: all 0.3s ease;
  }

  &_front-visible {
    transform: rotateY(180deg);
    @{r}__front {
      opacity: 1;
    }
  }

  &_opened {
    box-shadow: -4px 4px 6px 1px rgba(0, 0, 255, 0.2);
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
