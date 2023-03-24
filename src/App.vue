<template>
  <div id="app">
    <div id="app-con">
      <NameCard :avatar_url=avatar_url />
      <RepoCard :reposList="repos" />
      <RepoDetailsCard class="repo-detail-card" :currentRepo="currentRepo" />
    </div>
  </div>
  <el-dialog v-model="dialogVisible" title="Enter Access token">
    <el-input v-model="token" placeholder="Please input github token" clearable />
    <template #footer>
      <span class=" dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="onPositiveClick" color="#987cf7">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import NameCard from './components/NameCard.vue'
import RepoCard from './components/RepoCard.vue'
import RepoDetailsCard from './components/RepoDetailsCard.vue'
import { getUserInfo, getAllRepos, getRepoInfoFromGithub, getUserNameFromLocalStorage } from './tools.js'
export default {
  components: {
    NameCard,
    RepoCard,
    RepoDetailsCard
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      avatar_url: '',
      currentRepo: "",
      currentRepoInfo: {},
      repos: [],
      dialogVisible: false,
      token: '',
    }
  },
  methods: {
    updateAllRepos() {
      this.repos = getAllRepos();
    },
    makeCurrentRepoAsLatest() {
      let length = this.repos.length;
      this.currentRepo = this.repos[length - 1];
    },
    initAvatarAndBadge() {
      let userNameData = getUserNameFromLocalStorage();
      if (userNameData) {
        getUserInfo(userNameData.userName).then(data => {
          console.log(data);
          this.avatar_url = data.avatar_url;
        });
      }
    },
    onPositiveClick() {
      this.dialogVisible = false;
      if (this.token) {
        localStorage.setItem('github_token', this.token);
        // refresh the page
        location.reload();
      }
    },
  },
  created() {
    let token = localStorage.getItem('github_token');
    if (!token) {
      this.dialogVisible = true;
    } else {
      this.initAvatarAndBadge();
      this.updateAllRepos();
      this.currentRepo = this.repos[0];
    }
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
