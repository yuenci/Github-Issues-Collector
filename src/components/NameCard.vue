<template lang="">
    <div id="name-con">
        <img :src="avatar_url" alt="Vue logo" class="avatar" v-if="avatar_url"   @click="show"/>
        <img src="/Fintechtocat.png" alt="Vue logo" class="avatar" @click="show" v-else />
        <div class="badge">
            <img :src="statUrl" class="stats">
        </div>
    </div>
     <el-dialog v-model="dialogVisible" title="Enter GitHub user name">
        <el-input v-model="userName" placeholder="Please input your GitHub user name" clearable />
        <template #footer>
            <span class=" dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="onPositiveClick" color="#987cf7">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>


<script>
import { writeUserNameToLocalStorage, getUserNameFromLocalStorage } from '../tools.js'
export default {
    props: {
        avatar_url: String
    },
    data() {
        return {
            dialogVisible: false,
            userName: '',
        }
    },
    computed: {
        statUrl() {
            let stat_url = `https://github-readme-stats.vercel.app/api?username=${this.userName}&show_icons=true&locale=en`;
            return stat_url;
        }
    },
    methods: {
        show() {
            this.dialogVisible = true;
        },
        onPositiveClick() {
            this.dialogVisible = false;
            writeUserNameToLocalStorage(this.userName, true)
        }
    },
    mounted() {
        let useNameData = getUserNameFromLocalStorage();
        if (useNameData) {
            this.userName = useNameData.userName;
        }
        console.log(this.userData);
    }
}
</script>


<style scoped>
#name-con {
    width: 700px;
    height: 190px;
    background-color: rgba(241, 243, 245, 0.6);
    border-radius: 10px;
    margin-bottom: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}


.avatar {
    width: 170px;
    height: 170px;
    margin: 10px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
}

#name-con__right {
    background-color: aqua;
    margin-right: 20px;
}

.stats {
    height: 170px;
    margin: 10px;
}

.badge {
    cursor: pointer;
}
</style>