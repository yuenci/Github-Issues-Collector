<template lang="">
    <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
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

    methods: {
        async getIssues() {
            const octokit = new Octokit({ auth: token });
            this.issues = await octokit.paginate(octokit.rest.issues.listForRepo, {
                owner: "yuenci",
                repo: "Roommate-Finder",
                per_page: 100,
            });
            //console.log(this.issues);
        },
    },

    mounted() {
        this.getIssues();
    },
}
</script>
<style lang="">
    
</style>