<template lang="">
    <div class="projects-container">
        <div class="project-con">
            <img src="@sicons/ionicons5/AddCircleOutline.svg" class="add-icon"/>
        </div>
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
            issues: [],
        };
    },

    methods: {
        async getProject() {
            const projects = localStorage.getItem("projects");
            if (projects) {
                this.issues = JSON.parse(projects);
            } else {
                let projects = [];
                localStorage.setItem("projects", JSON.stringify(projects));
            }
        }
    },

    mounted() {
        this.getProject();
    },
}
</script>
<style scoped>
.add-icon {
    width: 50px;
    height: 50px;
}

.projects-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
}
</style>

<style>
.project-con {
    background-color: #ced4da;
    width: 280px;
    height: 280px;
    margin: 20px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
</style>