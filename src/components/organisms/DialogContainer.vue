<script>
export default {
  name: "DialogComponent",
  props: {
    title: {
      type: String,
      required: false
    },
    isOpen: {
      type: Boolean,
      required: true
    },
    closeModal: {
      type: Function,
      required: true
    }
  }
}
</script>

<template>
  <div class="z-50">
    <v-overlay :value="isOpen" z-index="5" @click="closeModal"></v-overlay>
    <v-card
        class="z-50 fixed-center min-w-[400px] fade-in overflow-hidden"
        elevation="2"
        outlined
        shaped
    >
      <header class="flex flex-col justify-center align-center gap-4 p-6">
        <slot name="symbol"></slot>
        <h2 class="text-primary text-xl text-center">{{ title }}</h2>
      </header>
      <v-btn class="top-2 right-2 btn" icon @click="closeModal">
        <v-icon>mdi-window-close</v-icon>
      </v-btn>
      <div class="divider"></div>
      <div class="p-8 max-h-[60vh] overflow-auto">
        <slot></slot>
      </div>
    </v-card>
  </div>
</template>

<style scoped>
.fixed-center {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.btn {
  position: absolute;
}

.divider {
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);

}

.fade-in {
  animation: fade-in 0.3s ease-in-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;

  }
}
</style>