<template lang="">
   <div class="container">
       <div class="github-log-con">
           <img src="@sicons/ionicons5/LogoGithub.svg" class="github-logo"/>
           <div>Github Issues Collector</div>
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
export default {
    data() {
        return {
            dialogVisible: false,
            token: "",
        };
    },
    methods: {
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
            localStorage.setItem("token", this.token);
            this.dialogVisible = false;
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
</style>

