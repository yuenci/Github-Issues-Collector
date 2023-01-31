<template lang="">
    <div class="projects-container">
        <div class="project-con" @click="dialogVisible = true">
            <img src="@sicons/ionicons5/AddCircleOutline.svg" class="add-icon"/>
        </div>
        <ProjectCard v-for="project in projectsObj"  :title="project.title" :key="project.index"/>
    </div>
    <el-dialog
    v-model="dialogVisible"
    title="Enter project's link"
    >
    <el-input v-model="projectLink" placeholder="Please input" clearable />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="onPositiveClick">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import ProjectCard from "./ProjectCard.vue";
import { validLink, initGithub } from "../tools.js";
import { ElMessage } from "element-plus";


export default {

    components: {
        ProjectCard,
    },

    data() {
        return {
            userName: "",
            projects: [],
            dialogVisible: false,
            projectLink: "",
        };

    },
    computed: {
        projectName() {
            return this.projectLink.split("/")[4];
        },
        projectsObj() {
            return this.projects.map((project, index) => {
                return {
                    title: project,
                    index: index,
                };
            });
        }
    },

    methods: {
        getProject() {
            const projects = localStorage.getItem("projects");
            if (projects) {
                this.projects = JSON.parse(projects);
            } else {
                let projects = [];
                localStorage.setItem("projects", JSON.stringify(projects));
            }
        },
        onNegativeClick() {
            this.dialogVisible = false;
        },
        onPositiveClick() {
            if (validLink(this.projectLink)) {
                this.dialogVisible = false;
                //console.log(this.projectName);
                this.addProject(this.projectName);
                this.projectLink = "";
            } else {
                this.warning();
            }
        },
        inputChange(value) {
            this.projectLink = value;
        },
        warning() {
            ElMessage({
                message: 'Invalid link',
                type: 'warning',
            })
        },
        addProject(project) {
            if (this.projects.includes(project)) {
                ElMessage({
                    type: 'warning',
                    message: 'Repo already exists',
                })
                return;
            }

            this.projects.push(project);
            localStorage.setItem("projects", JSON.stringify(this.projects));
        }
    },

    mounted() {
        initGithub().then((userName) => {
            this.userName = userName;
            this.getProject();
        }).catch(() => {
            console.log("Github not initialized");
        });
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
    box-sizing: border-box;
    transition: all 0.3s ease-in-out;
    padding: 10px;
}

@media screen and (max-width: 768px) {
    .project-con {
        width: 200px;
        height: 200px;
    }
}

@media screen and (max-width: 500px) {
    .project-con {
        width: 150px;
        height: 150px;
    }
}
</style>