<template lang="">
    <div v-if="this.repo">
        <el-table :data="formatTableData" stripe style="width: 100%" v-loading="!issues" @row-click="goToIssue">
            <el-table-column prop="date" label="Date" :width="boxWidth[0]" sortable :formatter="formatter" />
            <el-table-column prop="name" label="Issue"  />
            <el-table-column prop="address" label="Details" />
        </el-table>
    </div>
    <div v-else>
        <el-table :data="formatTableData" stripe style="width: 100%"
            v-loading.fullscreen.lock="getAllIssuesLoading" @row-click="goToIssue">
            <el-table-column prop="date" label="Date" :width="boxWidth[0]"  sortable  :formatter="formatter" />
            <el-table-column prop="repo" label="Repo" :filters="repoFilter" :filter-method="filterHandler"/>
            <el-table-column prop="name" label="Issue"  />
            <el-table-column prop="address" label="Details" />
        </el-table>
    </div>
    <el-backtop :right="50" :bottom="50" />
</template>
<script>
import ProjectCard from "./ProjectCard.vue";
import { getIssuesFromGithub, getAllRepos, formatDate } from "../tools.js";



export default {
    components: {
        ProjectCard,
    },

    data() {
        return {
            repo: "",
            repos: [],
            getAllIssuesLoading: true,
            issues: [],
        };
    },
    computed: {
        formatTableData: function () {
            let formatTableData = [];
            for (let i = 0; i < this.issues.length; i++) {
                formatTableData.push({
                    date: this.issues[i].created_at,
                    name: this.issues[i].title,
                    address: this.issues[i].body,
                    repo: this.issues[i].repo,
                    URL: this.issues[i].html_url,
                });
            }
            return formatTableData;
        },

        repoFilter: function () {
            let repoData = [];
            for (let i = 0; i < this.issues.length; i++) {
                let data = {
                    text: this.issues[i].repo,
                    value: this.issues[i].repo,
                }
                // check if repo is already in repoData
                let repoExists = false;
                for (let j = 0; j < repoData.length; j++) {
                    if (repoData[j].value === data.value) {
                        repoExists = true;
                    }
                }
                if (!repoExists) {
                    repoData.push(data);
                }
            }
            return repoData;
        },

        boxWidth: function () {
            // get width of screen
            let width = window.innerWidth;
            if (width > 800) {
                return [180, 300]
            } else {
                return [110, 100]
            }
        },
    },

    methods: {
        async getIssues() {
            this.issues = await getIssuesFromGithub(this.repo)
            //console.log(this.issues);
        },
        async getAllIssues() {
            this.repos = getAllRepos();
            this.issues = [];
            // loop through repos and get issues, add results to this.issues
            for (let i = 0; i < this.repos.length; i++) {
                let issues = await getIssuesFromGithub(this.repos[i]);
                for (let j = 0; j < issues.length; j++) {
                    issues[j].repo = this.repos[i];
                }
                this.issues = this.issues.concat(issues);
            }
            this.getAllIssuesLoading = false;
            //console.log(this.issues);
        },
        getRepoName() {
            let repo = this.$route.params.repo;
            if (repo) {
                this.repo = repo;
            } else {
                this.repo = null;
            }
        },
        formatter(row) {
            return formatDate(row.date);
        },
        filterHandler(value, row, column) {
            const property = column['property']
            return row[property] === value
        },
        goToIssue(row) {
            let url = row.URL;
            window.open(url, '_blank');
        }
    },

    mounted() {
        this.getRepoName();
        if (this.repo === null) {
            this.getAllIssues();
        } else {
            this.getIssues();
        }
    },
}
</script>
<style >
.el-backtop__icon {
    color: black !important;
}
</style>