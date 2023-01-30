<script>
import { defineComponent } from "vue";
import Menu from "./components/Menu.vue";
// import CardContainer from "./components/ProjectsContainer.vue";


export default defineComponent({
  components: {
    Menu
  },
});

</script>

<template>
  <Menu />
  <router-view></router-view>
</template>

<style scoped>

</style>
