<template lang="">
   <div class="container">
       <div class="github-log-con" >
           <img src="@sicons/ionicons5/LogoGithub.svg" class="github-logo" @click="toGithub" />
           <div class="logo-text">Github Issues Collector</div>
       </div>
       <div class="menu-item" @click="toRepositories">
           Repositories
       </div>
       <div class="menu-item" @click="toIssues">
           Issues
       </div>
       <div class="menu-item" @click="toSettings">
           Settings
       </div>
       <div class="menu-item" @click="setToken">
           Set Token
       </div>
       <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <img src="@sicons/ionicons5/Menu.svg" class="menu-icon" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="toRepositories">Repositories</el-dropdown-item>
            <el-dropdown-item @click="toIssues">Issues</el-dropdown-item>
            <el-dropdown-item @click="toSettings">Settings</el-dropdown-item>
            <el-dropdown-item @click="setToken">Set Token</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
   </div>
   <el-dialog
    v-model="dialogVisible"
    title="Enter your token"
    >
    <template #header>
      <div class="dialog-header">
        <span>Enter your token</span>
        <img src="@sicons/ionicons5/InformationCircle.svg" class="info-icon" @click="toGithubToken" />
      </div>

    </template>
    <el-input v-model="token"  clearable />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="saveToken">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { tokenTest, writeToken } from "../tools.js";
import { ElMessage } from "element-plus";
export default {
    data() {
        return {
            dialogVisible: false,
            token: "",
        };
    },
    methods: {
        toGithub() {
            window.open("https://github.com/");
        },

        toRepositories() {
            this.$router.push("/repos");
        },

        toIssues() {
            this.$router.push("/issues");
        },

        toSettings() {
            this.$router.push("/settings");
        },

        toGithubToken() {
            window.open("https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token");
        },

        setToken() {
            this.dialogVisible = true;
        },

        saveToken() {
            this.dialogVisible = false;
            tokenTest(this.token).then(() => {
                writeToken(this.token);
                ElMessage({
                    message: "Token saved",
                    type: "success",
                })
            }).catch((err) => {
                ElMessage({
                    message: "Token is invalid",
                    type: "error",
                });
            });
        },
    },
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: 10px;
    box-sizing: border-box;
    padding: 0 10px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 20px;
    border-bottom: 2px solid #626162;
    font-weight: 500;
}

.menu-item {
    transition: 0.3s ease-in-out;
    padding: 5px 10px;
    border-radius: 5px;
    user-select: none;
}

.menu-item:hover {
    background-color: #868e96;
    color: white;
    cursor: pointer;
}


.github-logo {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    cursor: pointer;
}

.github-log-con {
    display: flex;
    flex-direction: row;
    align-items: center;
    user-select: none;
}

.dialog-header {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.info-icon {
    width: 20px;
    height: 20px;
    margin-left: 10px;
    cursor: pointer;
}

.info-icon path {
    fill: #868e96;
}

.menu-icon {
    width: 30px;
    height: 30px;
    cursor: pointer;
}

.el-dropdown {
    display: none;
}

@media screen and (max-width: 768px) {
    .logo-text {
        display: none;
    }

    .el-dropdown {
        display: block;
    }

    .menu-item {
        display: none;
    }

}
</style>

