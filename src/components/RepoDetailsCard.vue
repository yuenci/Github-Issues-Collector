<template lang="">
    <div id="details-con">
         <IssueCard  v-for="issue in repoInfo" :key="issue.id" :issue="issue" />
    </div>
</template>
<script>
import IssueCard from './IssueCard.vue'
export default {
    components: {
        IssueCard
    },
    props: {
        repoInfo: {
            type: Object,
            required: true
        }
    },
}
</script>
<style scoped>
#details-con {
    height: 100%;
    width: 350px;
    background-color: rgba(241, 243, 245, 0.6);
    color: white;
    border-radius: 10px;
    overflow-y: auto;
}


#details-con::-webkit-scrollbar {
    width: 4px;
}

#details-con::-webkit-scrollbar-track {
    background: rgb(239, 239, 239);
    border-radius: 2px;
}

#details-con::-webkit-scrollbar-thumb {
    background: #583FAE;
    border-radius: 10px;
}

#details-con::-webkit-scrollbar-thumb:hover {
    background: #987CF7;
}
</style>