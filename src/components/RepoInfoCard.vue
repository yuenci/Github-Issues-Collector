<template>
    <div class="con" @click="changeCurrentRepo">
        <div class="repo-title">{{ repoData.name }}</div>
        <div class="repo-desc">{{ repoData.description }}</div>
        <div class="data">
            <div class="language">
                <div class="language-circle" :style="{ backgroundColor: color }"></div>
                <div> {{ repoData.language }}</div>
            </div>
            <div class="star">
                <img src="/star.svg" alt="star" class="svg-con" v-if="repoData.stargazers_count === 0">
                <img src="/starred.svg" alt="star" class="svg-con" v-else>
                <span>{{ repoData.stargazers_count }}</span>
            </div>
            <div class="fork">
                <img src="/fork.svg" alt="fork" class="svg-con">
                <span>{{ repoData.forks_count }}</span>
            </div>
        </div>
    </div>
</template>
<script>
import { getRepoInfoFromGithub } from '../tools.js';
import colors from '../assets/colors.json';
export default {
    props: {
        repoData: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            repoInfo: {},
            color: "#000",
            html_url: "",
            language: "",
        }
    },
    methods: {
        openRepo() {
            window.open(this.html_url, '_blank');
        },
        changeCurrentRepo() {
            let repo = this.repoData.name;
            PubSub.publish('changeRepoDetails', { message: repo });
        }
    },
    created() {
        this.color = colors[this.repoData.language].color
        this.html_url = this.repoData.html_url
        this.language = this.repoData.language
        PubSub.publish('addLanguages', { message: this.language });
    }
}
</script>
<style scoped>
.con {
    width: 30%;
    height: 100px;
    background-color: #fff;
    border-radius: 5px;
    position: relative;
    box-sizing: border-box;
    padding: 5px 10px;
    cursor: pointer;
    margin: 7px 11px;
}

.data {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    bottom: 10px;
    height: 20px;
}

.language {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.language-circle {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #000;
    margin-right: 7px;
}

.star,
.fork {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-left: 20px;

}

.svg-con {
    width: 15px;
    height: 15px;
    margin-right: 5px;
}
</style>