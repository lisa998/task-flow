<script>
export default {
  name: "LoadingIcon",
  props: {
    size: {
      type: String,
      default: '24',
    },
  },
}
</script>

<template>
  <div :style="{height: `${size}px`, width: `${size}px`}" class="relative">
    <v-icon :size="size" :style="{color:'rgba(0,0,0,0.2)'}">mdi-circle-outline</v-icon>
    <v-icon :size="size" :style="{color:'rgba(0,0,0,0.5)'}" class="rotate-element">mdi-loading</v-icon>
  </div>
</template>

<style scoped>
.v-icon {
  position: absolute !important;
  top: 0;
  left: 0;
}

.rotate-element {
  animation: rotate 1s linear infinite;
  transform-origin: center;
}

@keyframes rotate {
  from {
    transform: rotate(0deg); /* 起始角度 */
  }
  to {
    transform: rotate(360deg); /* 結束角度 */
  }
}
</style>