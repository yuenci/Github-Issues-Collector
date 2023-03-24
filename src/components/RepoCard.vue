<template>
    <div id="repo-con">
        <ReposToolBar />
        <div class="repo-cards-con">
            <RepoInfoCard v-for="(repo, index) in repos" :key="index" :repoName="repo" />
        </div>
    </div>
</template>
<script>
import ReposToolBar from './ReposToolBar.vue';
import RepoInfoCard from './RepoInfoCard.vue';
import { getAllRepos } from '../tools.js';
export default {
    components: {
        ReposToolBar, RepoInfoCard
    },
    data() {
        return {
            repos: []
        }
    },
    created() {
        this.repos = getAllRepos();
    }

}
</script>
<style scoped>
#repo-con {
    width: 700px;
    height: calc(100% - 240px);
    background-color: rgba(241, 243, 245, 0.6);
    border-radius: 10px;
}

.repo-cards-con {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: flex-start;
    align-content: flex-start;
}
</style>

<style></style>