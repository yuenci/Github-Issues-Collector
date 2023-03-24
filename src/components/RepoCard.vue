<template lang="">
    <div id="repo-con">
        <ReposToolBar />
    </div>
</template>
<script>
import ReposToolBar from './ReposToolBar.vue';
export default {
    components: {
        ReposToolBar
    },

}
</script>
<style scoped>
#repo-con {
    width: 700px;
    height: calc(100% - 240px);
    background-color: rgba(241, 243, 245, 0.6);
    border-radius: 10px;
}
</style>

<style></style>