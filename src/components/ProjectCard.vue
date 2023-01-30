<template lang="">
    <div class="container">{{title}}</div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
    }
}
</script>

<style scoped>
.container {
    width: 300px;
    height: 300px;
}
</style>