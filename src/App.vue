<template>
  <div id="app">
    <div id="app-con">

      <NameCard :userData=userData />
      <RepoCard />
      <RepoDetailsCard class="repo-detail-card" />
    </div>
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
      userData: {
        avatar_url: ''
      },
    }
  },
  created() {
    // fetch https://api.github.com/users/yuenci
    fetch('https://api.github.com/users/yuenci')
      .then(response => response.json())
      .then(data => {
        console.log(data.avatar_url)
        this.userData.avatar_url = data.avatar_url
      })
  }
}
</script>



<style scoped>
#app {
  height: 80vh;
  width: 1100px;
  margin: 0;
  padding: 0;
  /* border: 3px solid white; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#app-con {
  height: 100%;
  width: 100%;
  position: relative;
}

.repo-detail-card {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
