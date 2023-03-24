<template>
  <div id="app">
    <div id="app-con">
      <NameCard :userData=userData />
      <RepoCard :reposList="repos" />
      <RepoDetailsCard class="repo-detail-card" :currentRepo="currentRepo" />
    </div>
  </div>
</template>

<script>
import NameCard from './components/NameCard.vue'
import RepoCard from './components/RepoCard.vue'
import RepoDetailsCard from './components/RepoDetailsCard.vue'
import { getUserInfo, getAllRepos, getRepoInfoFromGithub } from './tools.js'
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
      currentRepo: "",
      currentRepoInfo: {},
      repos: []
    }
  },
  methods: {
    updateAllRepos() {
      this.repos = getAllRepos();
    },
    makeCurrentRepoAsLatest() {
      let length = this.repos.length;
      this.currentRepo = this.repos[length - 1];
    }
  },
  created() {
    let userInfo = getUserInfo("yuenci");
    this.updateAllRepos();
    this.userData.avatar_url = userInfo.avatar_url;
    this.currentRepo = this.repos[0];
  },
  mounted() {
    PubSub.subscribe('changeRepoDetails', (msg, data) => {
      //console.log(data.message)
      this.currentRepo = data.message;
    });
    PubSub.subscribe('updateAllRepos', (msg, data) => {
      this.updateAllRepos();
      this.makeCurrentRepoAsLatest();
    });
  },
  beforeDestroy() {
    PubSub.unsubscribe('changeRepoDetails');
    PubSub.unsubscribe('updateAllRepos');
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
