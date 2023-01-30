<template lang="">
    <div >
        <ProjectCard title="Project 1" />
    </div>
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
            console.log(this.issues);
        },
    },

    mounted() {
        this.getIssues();
    },
}
</script>
<style lang="">
    
</style>