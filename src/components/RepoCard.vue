<template>
    <div id="repo-con">
        <ReposToolBar />
        <div class="repo-cards-con">
            <RepoInfoCard v-for="repo in fileterRepos" :key="repo" :repoName="repo" />
        </div>
    </div>
</template>
<script>
import ReposToolBar from './ReposToolBar.vue';
import RepoInfoCard from './RepoInfoCard.vue';
import { getAllRepos } from '../tools.js';
import PubSub from 'pubsub-js';
export default {
    components: {
        ReposToolBar, RepoInfoCard
    },
    data() {
        return {
            repos: [],
            fileterRepos: []
        }
    },
    created() {
        this.repos = getAllRepos();
        this.fileterRepos = this.repos;
    },
    methods: {
        filterRepos(keyword) {
            //console.log(keyword);
            keyword = keyword.toLowerCase();
            this.fileterRepos = this.repos.filter((repo) => {
                return repo.toLowerCase().includes(keyword);
            })
        }
    },
    mounted() {
        PubSub.subscribe('filterRepos', (msg, data) => {
            //console.log(data.message)
            this.filterRepos(data.message);
        });
    },
    beforeDestroy() {
        PubSub.unsubscribe('filterRepos');
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
    /* justify-content: space-around; */
    align-items: flex-start;
    align-content: flex-start;
}
</style>

<style></style>