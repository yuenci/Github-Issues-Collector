<template lang="">
    <div class="projects-container">
        <div class="project-con" @click="showModal = true">
            <img src="@sicons/ionicons5/AddCircleOutline.svg" class="add-icon"/>
        </div>
        <ProjectCard title="Project 1" />
    </div>
    <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="Enter project's link"
    positive-text="OK"
    negative-text="Cancel"
    @positive-click="onPositiveClick"
    @negative-click="onNegativeClick"
    >
    <n-message-provider>
         <n-input type="text" clearable :on-change="inputChange" />
    </n-message-provider>
    </n-modal>
</template>
<script>
import ProjectCard from "./ProjectCard.vue";
import { useMessage } from "naive-ui";
import { validEmail } from "../tools.js";


export default {

    components: {
        ProjectCard,
    },

    data() {
        return {
            message: useMessage(),
            issues: [],
            showModal: false,
            projectLink: "",
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
        },
        onNegativeClick() {
            this.showModal = false;
        },
        onPositiveClick() {
            if (validEmail(this.projectLink)) {
                this.showModal = false;
            } else {
                // message.warning("Invalid link");
                this.warning();
            }
            console.log(this.projectLink);
        },
        inputChange(value) {
            this.projectLink = value;
        },
        warning() {
            message.warning("How many roads must a man walk down");
        },
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