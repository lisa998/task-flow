<script>
import AppHeader from "@/components/layout/AppHeader.vue";
import AppSidebar from "@/components/layout/AppSidebar.vue";


export default {
  name: "AppLayout",
  components: {AppSidebar, AppHeader}
}
</script>

<template>
  <div class="relative d-flex">
    <app-sidebar class="flex-grow-0"></app-sidebar>
    <app-header class="ml-[256px]"></app-header>
  </div>
</template>

<style scoped>

</style>