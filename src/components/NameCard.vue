<template lang="">
    <div id="name-con">
        <!-- <img :src="userData.avatar_url" alt="Vue logo" class="avatar" /> -->
        <img src="public/Fintechtocat.png" alt="Vue logo" class="avatar" />
        <div>
            <img src="https://github-readme-stats.vercel.app/api?username=yuenci&show_icons=true&locale=en" class="stats">
        </div>

    </div>
</template>


<script>
export default {
    props: {
        userData: Object
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
}

#name-con__right {
    background-color: aqua;
    margin-right: 20px;
}

.stats {
    height: 170px;
    margin: 10px;
}
</style>