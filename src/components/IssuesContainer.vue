<template lang="">
    <div v-if="this.repo">
        <el-table :data="formatTableData" stripe style="width: 100%" v-loading="!issues" >
            <el-table-column prop="date" label="Date" width="180" />
            <el-table-column prop="name" label="Name" width="300" />
            <el-table-column prop="address" label="Address" />
        </el-table>
    </div>
    <div v-else>
        <el-table :data="formatTableData" stripe style="width: 100%" v-loading="!issues" >
            <el-table-column prop="date" label="Date" width="180" />
            <el-table-column prop="repo" label="Repo" />
            <el-table-column prop="name" label="Name" width="300" />
            <el-table-column prop="address" label="Address" />
        </el-table>
    </div>
</template>
<script>
import ProjectCard from "./ProjectCard.vue";
import { getIssuesFromGithub, getAllRepos } from "../tools.js";



export default {
    components: {
        ProjectCard,
    },

    data() {
        return {
            repo: "",
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
                });
            }
            return formatTableData;
        },


    },

    methods: {
        async getIssues() {
            this.issues = await getIssuesFromGithub(this.repo)
            //console.log(this.issues);
        },
        async getAllIssues() {
            let repos = getAllRepos();
            this.issues = [];
            // loop through repos and get issues, add results to this.issues
            for (let i = 0; i < repos.length; i++) {
                let issues = await getIssuesFromGithub(repos[i]);
                for (let j = 0; j < issues.length; j++) {
                    issues[j].repo = repos[i];
                }
                this.issues = this.issues.concat(issues);
            }
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
    },

    mounted() {
        console.log("IssuesContainer mounted");
        this.getRepoName();
        if (this.repo === null) {
            this.getAllIssues();
        } else {
            this.getIssues();
        }
    },
}
</script>
<style lang="">
    
</style>