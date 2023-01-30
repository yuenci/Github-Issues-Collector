<script>
import { defineComponent } from "vue";
import Menu from "./components/Menu.vue";
import CardContainer from "./components/ProjectsContainer.vue";
import { darkTheme } from 'naive-ui'


export default defineComponent({
  components: {
    Menu,
    CardContainer,
  },
  data() {
    return {
      darkTheme: darkTheme
    }
  }
});

</script>

<template>
  <n-config-provider :theme="darkTheme">
    <Menu />
    <CardContainer />
  </n-config-provider>
</template>

<style scoped>

</style>
