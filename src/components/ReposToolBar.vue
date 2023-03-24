<template>
    <div class="con">
        <el-row :gutter="5" class="row">
            <el-col :span="12">
                <el-input v-model="input" placeholder="Please input" />
            </el-col>

            <el-col :span="3">
                <el-select v-model="typeValue" class="m-2" placeholder="Type">
                    <el-option v-for="item in type" :key="item.value" :label="item.label" :value="item.value" />
                </el-select></el-col>

            <el-col :span="4">
                <el-select v-model="languageValue" class="m-2" placeholder="Language">
                    <el-option v-for="item in language" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-col>
            <el-col :span="3">
                <el-select v-model="sortValue" class="m-2" placeholder="Sort">
                    <el-option v-for="item in sort" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-col>
            <el-col :span="2">
                <el-button type="success" color="#987cf7" dark>New</el-button>
            </el-col>
        </el-row>
    </div>
</template>
<script>
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
            language: [
                {
                    value: 'javascript',
                    label: 'JavaScript'
                }, {
                    value: 'python',
                    label: 'Python'
                }
            ],
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
            sortValue: ''
        }
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