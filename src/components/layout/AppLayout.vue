<script>
import AppHeader from "@/components/layout/AppHeader.vue";
import AppSidebar from "@/components/layout/AppSidebar.vue";
import ToastList from "@/components/molecules/ToastList.vue";

export default {
  name: "AppLayout",
  components: {ToastList, AppSidebar, AppHeader}
}
</script>

<template>
  <div class="relative d-flex">
    <app-sidebar class="flex-grow-0"></app-sidebar>
    <app-header class=""></app-header>
    <ToastList/>
  </div>
</template>

<style scoped>

</style>