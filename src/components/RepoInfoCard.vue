<template>
    <div class="con" @click="openRepo">
        <div class="repo-title">{{ repoName }}</div>
        <div class="repo-desc" v-if="repoInfo.data !== undefined">{{ repoInfo.data.description }}</div>
        <div class="data" v-if="repoInfo.data !== undefined">
            <div class="language">
                <div class="language-circle" :style="{ backgroundColor: color }"></div>
                <div> {{ repoInfo.data.language }}</div>
            </div>
            <div class="star">
                <img src="/star.svg" alt="star" class="svg-con" v-if="repoInfo.data.stargazers_count === 0">
                <img src="/starred.svg" alt="star" class="svg-con" v-else>
                <span>{{ repoInfo.data.stargazers_count }}</span>
            </div>
            <div class="fork">
                <img src="/fork.svg" alt="fork" class="svg-con">
                <span>{{ repoInfo.data.forks_count }}</span>
            </div>
        </div>
    </div>
</template>
<script>
import { getRepoInfoFromGithub } from '../tools.js';
import colors from '../assets/colors.json';
export default {
    props: {
        repoName: {
            type: String,
            required: true
        },
    },
    data() {
        return {
            repoInfo: {},
            color: "#000",
            html_url: ""
        }
    },
    methods: {
        openRepo() {
            window.open(this.html_url, '_blank');
        }
    },
    created() {
        getRepoInfoFromGithub(this.repoName).then((data) => {
            console.log(data);
            this.repoInfo = data;
            this.color = colors[this.repoInfo.data.language].color
            this.html_url = this.repoInfo.data.html_url
        })

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
    margin-top: 10px;
    cursor: pointer;
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