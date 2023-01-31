<template lang="">
    <el-table :data="formatTableData" stripe style="width: 100%">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="300" />
        <el-table-column prop="address" label="Address" />
    </el-table>
</template>
<script>
import ProjectCard from "./ProjectCard.vue";
import token from "../config";
import { Octokit, App } from "https://cdn.skypack.dev/octokit";



export default {
    components: {
        ProjectCard,
    },

    data() {
        return {
            repo: "",
            issues: {},
            tableData: [
                {
                    date: '2016-05-03',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-02',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-04',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-01',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
            ],
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
                });
            }
            return formatTableData;
        }
    },

    methods: {
        async getIssues() {
            const octokit = new Octokit({ auth: token });
            if (this.repo == null) return;
            this.issues = await octokit.paginate(octokit.rest.issues.listForRepo, {
                owner: "yuenci",
                repo: this.repo,
                per_page: 100,
            });
            console.log(this.issues);
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
        this.getRepoName();
        this.getIssues();
    },
}
</script>
<style lang="">
    
</style>