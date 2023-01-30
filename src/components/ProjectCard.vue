<template lang="">
    <div class="project-con" @click="toIssues">{{title}}</div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
    },
    methods: {
        toIssues() {
            this.$router.push(`/issues/${this.title}`);
        },
    },
}
</script>

<style scoped>
.container {
    width: 300px;
    height: 300px;
}
</style>