<script>
export default {
  name: "VirtualScroll",
  props: {
    itemsHeight: {
      type: Number,
      required: true,
    },
    containerHeight: {
      type: Number,
      required: true,
    },
    itemsLength: {
      type: Number,
      required: true,
    },
    bufferItem: {
      type: Number,
      required: false,
      default: 3
    },
  },
  data: () => ({
    scrollTop: 0,
  }),
  computed: {
    visibleItemsCount() {
      return Math.ceil(this.containerHeight / this.itemsHeight)
    },
    startIndex() {
      return Math.max(Math.floor(this.scrollTop / this.itemsHeight) - this.bufferItem, 0)
    },
    endIndex() {
      return Math.min(this.startIndex + this.visibleItemsCount + this.bufferItem, this.itemsLength)
    },
  },
  methods: {
    onScroll(e) {
      this.scrollTop = e.target.scrollTop
    }
  }
}
</script>

<template>
  <div :style="{height: containerHeight + 'px', overflowY: 'scroll', width: '100%', position:'relative'}"
       @scroll="onScroll">
    <div :style="{height: itemsHeight * itemsLength + 'px', width:'100%',position:'absolute'}"></div>
    <div :style="{ position: 'absolute', top: startIndex * itemsHeight + 'px', left: 0, right: 0 }">
      <slot :end-index="endIndex" :start-index="startIndex"></slot>
    </div>
  </div>
</template>

<style scoped>

</style>