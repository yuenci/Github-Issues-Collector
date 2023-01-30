<script>
import { defineComponent } from "vue";
import Menu from "./components/Menu.vue";
import CardContainer from "./components/CardContainer.vue";

export default defineComponent({
  components: {
    Menu,
    CardContainer,
  },
});

</script>

<template>
  <Menu />
  <CardContainer />
</template>

<style scoped>

</style>
