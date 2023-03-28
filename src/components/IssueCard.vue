<template>
    <div class="con" @click="goToIssue">
        <div class="title">
            {{ issue.title }}
        </div>
        <div>
            <span>#{{ issue.number }} opened on </span>
            <span>{{ dateTime }} </span>
            <span> by {{ issue.user.login }}</span>
        </div>
        <el-tooltip class="box-item" effect="dark" :content="tag" placement="top">
            <div class="circle" :style="{ backgroundColor: color }" v-show="color !== ''"></div>
        </el-tooltip>
    </div>
</template>
<script>
import { ISOToDate, capitalizeFirstLetter } from '../tools.js'
import data from "../assets/issue_color.json"
export default {
    props: {
        issue: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            html_url: this.issue.html_url,
            color: "",
            tag: ""
        }
    },
    computed: {
        dateTime() {
            return ISOToDate(this.issue.created_at);
        }
    },
    methods: {
        goToIssue() {
            window.open(this.html_url, '_blank');
        }

    },
    mounted() {
        let array = this.issue.labels;
        if (array.length > 0) {
            let label = array[0].name;
            this.tag = capitalizeFirstLetter(label);
            this.color = data[label];
        }
        else {
            this.color = "";
        }
    }
}
</script>
<style scoped>
.con {
    width: 100%;
    background-color: rgba(241, 243, 245, 0.7);
    color: black;
    border-radius: 10px;
    margin: 10px 0;
    padding: 10px;
    cursor: pointer;
    box-sizing: border-box;
    position: relative;
}

.title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 10px;
}

.circle {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    position: absolute;
    right: 10px;
    top: 15px;
    z-index: 999;
}
</style>