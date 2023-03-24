<template>
    <div id="repo-con">
        <ReposToolBar />
        <div class="repo-cards-con">
            <RepoInfoCard v-for="repo in filterReposData" :key="repo.name" :repoData="repo" />
        </div>
    </div>
</template>
<script>
import ReposToolBar from './ReposToolBar.vue';
import RepoInfoCard from './RepoInfoCard.vue';
import { getAllRepos, getRepoInfoFromGithub } from '../tools.js';
import PubSub from 'pubsub-js';
import { filter } from 'lodash';
export default {
    components: {
        ReposToolBar, RepoInfoCard
    },
    props: {
        reposList: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            reposData: {},
            filterReposData: {}
        }
    },
    watch: {
        reposList() {
            let newRepo = this.reposList[this.reposList.length - 1];
            getRepoInfoFromGithub(newRepo)
                .then(result => {
                    this.reposData[newRepo] = result.data;
                    this.filterReposData = this.reposData;
                })
                .catch(error => {
                    console.error(error);
                });
        }
    },
    methods: {
        filterRepos(keyword) {
            //console.log(keyword);
            if (keyword === '') {
                this.filterReposData = this.reposData;
                return;
            }
            keyword = keyword.toLowerCase();
            this.filterReposData = {};
            for (let repo in this.reposData) {
                // console.log(repo);
                if (repo.toLowerCase().indexOf(keyword) !== -1) {
                    this.filterReposData[repo] = this.reposData[repo];
                }
            }
        },
        filterLanguage(language) {
            if (language === "all") {
                this.filterReposData = this.reposData;
                return;
            }

            // console.log(language);
            language = language.toLowerCase();
            this.filterReposData = {};
            for (let repo in this.reposData) {
                let repoLanguage = this.reposData[repo].language;
                if (repoLanguage.toLowerCase() === language) {
                    this.filterReposData[repo] = this.reposData[repo];
                }
            }
        },

        filterType(type) {
            if (type === "all") {
                this.filterReposData = this.reposData;
                return;
            }
            type = type.toLowerCase();
            this.filterReposData = {};
            //console.log(type);

            for (let repo in this.reposData) {
                let repoType = this.reposData[repo].private;
                if (type === "private" && repoType === true) {
                    this.filterReposData[repo] = this.reposData[repo];
                }
                if (type === "public" && repoType === false) {
                    this.filterReposData[repo] = this.reposData[repo];
                }
            }
        }
    },
    mounted() {
        PubSub.subscribe('filterRepos', (msg, data) => {
            this.filterRepos(data.message);
        });
        PubSub.subscribe('filterLanguage', (msg, data) => {
            this.filterLanguage(data.message);
        });
        PubSub.subscribe('filterType', (msg, data) => {
            this.filterType(data.message);
        });

        Promise.all(this.reposList.map(repo => getRepoInfoFromGithub(repo)))
            .then(results => {
                for (let i = 0; i < results.length; i++) {
                    const data = results[i].data;
                    const repo = this.reposList[i];
                    this.reposData[repo] = data;
                }
                this.filterReposData = this.reposData;
            })
            .catch(error => {
                console.error(error);
            });
    },
    beforeDestroy() {
        PubSub.unsubscribe('filterRepos');
        PubSub.unsubscribe('filterLanguage');
        PubSub.unsubscribe('filterType');
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
    height: 460px;
    overflow-y: auto;
}

.repo-cards-con::-webkit-scrollbar {
    width: 4px;
}

.repo-cards-con::-webkit-scrollbar-track {
    background: rgb(239, 239, 239);
    border-radius: 2px;
}

.repo-cards-con::-webkit-scrollbar-thumb {
    background: #583FAE;
    border-radius: 10px;
}

.repo-cards-con::-webkit-scrollbar-thumb:hover {
    background: #987CF7;
}
</style>

<style></style>