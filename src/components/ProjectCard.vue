<template lang="">
    <div class="project-con" @click="toIssues"  
        @mouseenter="deleteIconStyle = 'delete-icon-active'"
        @mouseleave="deleteIconStyle = 'delete-icon-disactive'"
        >
        <div>{{title}}</div>
        <el-tooltip
        class="box-item"
        effect="dark"
        content="Delete Project"
        placement="top"
      >
        <img src="@sicons/ionicons5/Trash.svg" :class="deleteIconStyle" 
        @click="deleteProject"
       
        />
        </el-tooltip>
    </div>
    
</template>

<script>
import { ElMessageBox, ElMessage } from 'element-plus';
import { getAllRepos } from "../tools.js";
export default {
    props: {
        title: {
            type: String,
            required: true
        },
    },
    data() {
        return {
            deleteIconStyle: "delete-icon-disactive",
        };
    },
    methods: {
        toIssues() {
            this.$router.push(`/issues/${this.title}`);
        },
        deleteProject(e) {
            e.stopPropagation();
            console.log("delete");
            //this.$emit("delete-project", this.title);
            ElMessageBox.confirm(
                'proxy will permanently delete the file. Continue?',
                'Warning',
                {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning',
                }
            )
                .then(() => {
                    let repos = getAllRepos()
                    let newRepos = repos.filter((repo) => {
                        return repo !== this.title;
                    });
                    console.log(newRepos);
                    localStorage.setItem("projects", JSON.stringify(newRepos));
                    ElMessage({
                        type: 'success',
                        message: 'Delete completed',
                    })
                })
                .catch(() => {
                    // ElMessage({
                    //     type: 'info',
                    //     message: 'Delete canceled',
                    // })
                })
        },
    },
}
</script>

<style scoped>
.project-con {
    position: relative;
}

.delete-icon-active {
    position: absolute;
    right: 5px;
    bottom: 5px;
    width: 20px;
    height: 20px;
    opacity: 1;
    transition: opacity 0.4s;
}


.delete-icon-disactive {
    position: absolute;
    right: 5px;
    bottom: 5px;
    width: 20px;
    height: 20px;
    opacity: 0;
    transition: opacity 0.4s;
}
</style>