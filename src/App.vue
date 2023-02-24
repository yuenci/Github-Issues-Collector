<template>
  <div id="app">
    <img :src="avatar_url" alt="Vue logo" class="avatar" />
    <NameCard />
    <RepoCard />
    <RepoDetailsCard />
  </div>
</template>

<script>
import NameCard from './components/NameCard.vue'
import RepoCard from './components/RepoCard.vue'
import RepoDetailsCard from './components/RepoDetailsCard.vue'
export default {
  components: {
    NameCard,
    RepoCard,
    RepoDetailsCard
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      avatar_url: ''
    }
  },
  created() {
    // fetch https://api.github.com/users/yuenci
    fetch('https://api.github.com/users/yuenci')
      .then(response => response.json())
      .then(data => {
        console.log(data.avatar_url)
        this.avatar_url = data.avatar_url
      })
  }
}
</script>



<style scoped>
#app {
  height: 80vh;
  width: 1000px;
  margin: 0;
  padding: 0;
  border: 3px solid white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.avatar {
  width: 250px;
  height: 250px;
  border-radius: 50%;
}
</style>
