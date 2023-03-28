<template>
    <div class="con">
        <el-row :gutter="5" class="row">
            <el-col :span="12">
                <el-input v-model="input" placeholder="Find a repository..." @input="filterRepos" />
            </el-col>

            <el-col :span="3">
                <el-select v-model="typeValue" class="m-2" placeholder="Type" @change="typeChange">
                    <el-option v-for="item in type" :key="item.value" :label="item.label" :value="item.value" />
                </el-select></el-col>

            <el-col :span="4">
                <el-select v-model="languageValue" class="m-2" placeholder="Language" @change="languageChange">
                    <el-option v-for="item in language" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-col>
            <el-col :span="3">
                <el-select v-model="sortValue" class="m-2" placeholder="Sort" @change="sortChange">
                    <el-option v-for="item in sort" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-col>
            <el-col :span="2">
                <el-button type="success" color="#987cf7" dark @click="showDialog">New</el-button>
            </el-col>
        </el-row>
    </div>
    <el-dialog v-model="dialogVisible" title="Enter project's link">
        <el-input v-model="projectLink" placeholder="Please input project's link" clearable />
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
import { ifGithubRepoURL, addRepo, isWriteUserNameFromUrl, writeUserNameToLinkLocalStorage } from '../tools.js'
import { ElMessage } from 'element-plus'
export default {
    data() {
        return {
            input: '',
            type: [{
                value: 'all',
                label: 'All'
            }, {
                value: 'public',
                label: 'Public'
            }, {
                value: 'private',
                label: 'Private'
            }],
            language: [{
                value: 'all',
                label: 'All'
            }],
            sort: [
                {
                    value: 'name',
                    label: 'Name'
                }, {
                    value: 'stars',
                    label: 'Stars'
                }
            ],
            typeValue: '',
            languageValue: '',
            sortValue: '',
            dialogVisible: false,
            projectLink: '',
        }
    },
    methods: {
        onPositiveClick() {
            this.dialogVisible = false;
            if (ifGithubRepoURL(this.projectLink)) {
                addRepo(this.projectLink);

                if (isWriteUserNameFromUrl()) {
                    writeUserNameToLinkLocalStorage(this.projectLink, false);
                }

                this.projectLink = '';

                // update repo cards display
                PubSub.publish('updateAllRepos', { message: 'you message here' });
                ElMessage({
                    message: 'Add repo successfully',
                    type: 'success',
                })
            } else {
                ElMessage({
                    message: 'Please enter a valid github repo link',
                    type: 'warning',
                })
            }

        },
        showDialog() {
            this.dialogVisible = true;
        },
        filterRepos() {
            PubSub.publish('filterRepos', { message: this.input });
        },
        addLanguages(language) {
            //console.log(language);

            if (this.language.find(item => item.value === language.toLowerCase())) {
                return;
            }

            this.language.push({
                value: language.toLowerCase(),
                label: language
            })
        },
        languageChange() {
            PubSub.publish('filterLanguage', { message: this.languageValue });
        },
        typeChange() {
            PubSub.publish('filterType', { message: this.typeValue });
        },
        sortChange() {
            PubSub.publish('filterSort', { message: this.sortValue });
        }
    }, mounted() {
        PubSub.subscribe('addLanguages', (msg, data) => {
            // console.log(data.message)
            this.addLanguages(data.message);
        });
    },
    beforeDestroy() {
        PubSub.unsubscribe('addLanguages');
    }
}
</script>
<style>
.con {
    padding: 5px;
}

.row {
    width: 690px;
}
</style>