<script>
export default {
  name: "HalfMaskIcon",
  props: {
    iconName: {
      type: String,
      required: true,
    },
  }
}
</script>

<template>
  <div class="h-32 w-32 rounded flex items-center justify-center relative overflow-hidden shadow-md">
    <div class="h-32 w-16 bg-white-color relative z-10 rotate-45 transform-origin-r-c"></div>
    <v-icon class="absolute absolute-center z-10" color="primary" size="70">
      {{ iconName }}
    </v-icon>
    <div class="h-32 w-16 bg-gray-color relative z-20 rotate-45 transform-origin-l-c"></div>
  </div>

</template>

<style scoped>
.rounded {
  border-radius: 50% !important;
}

.absolute-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.rotate-45 {
  transform: rotate(45deg);

}

.transform-origin-r-c {
  transform-origin: right center;
}

.transform-origin-l-c {
  transform-origin: left center;
}

.bg-gray-color {
  background-color: rgba(0, 0, 0, 0.2);
}

.bg-white-color {
  background-color: rgba(0, 0, 0, 0.1);
}


</style>