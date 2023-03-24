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
    </div>
</template>
<script>
import { ISOToDate } from '../tools.js'
export default {
    props: {
        issue: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            html_url: this.issue.html_url
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

    }
}
</script>
<style scoped>
.con {
    width: 100%;
    background-color: rgba(241, 243, 245, 0.6);
    color: black;
    border-radius: 10px;
    margin: 10px 0;
    padding: 10px;
    cursor: pointer;
    box-sizing: border-box;
}

.title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
}
</style>