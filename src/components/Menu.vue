<template lang="">
   <div class="container">
       <div class="github-log-con">
           <img src="@sicons/ionicons5/LogoGithub.svg" class="github-logo"/>
           <div>Github issues collector</div>
       </div>
       <div class="menu-item">
           Repositories
       </div>
       <div class="menu-item">
           Issues
       </div>
       <div class="menu-item">
           Settings
       </div>
       <div class="menu-item">
           Set Token
       </div>
   </div>
</template>

<script>
export default {

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
</style>

