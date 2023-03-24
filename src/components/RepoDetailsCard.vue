<template lang="">
    <div id="details-con"  v-loading="loading">
         <IssueCard  v-for="issue in currentRepoInfo" :key="issue.id" :issue="issue" />
    </div>
</template>
<script>
import IssueCard from './IssueCard.vue'
import { getIssuesFromGithub } from '../tools.js'

export default {
    components: {
        IssueCard
    },
    props: {
        currentRepo: {
            type: String,
            required: true
        }
    },
    watch: {
        currentRepo() {
            this.loading = true;
            //console.log("currentRepo changed");
            getIssuesFromGithub(this.currentRepo).then((data) => {
                // console.log(data);
                this.currentRepoInfo = data;
                this.loading = false;
            })
        }
    },
    data() {
        return {
            currentRepoInfo: {},
            loading: false
        }
    }, mounted() {
        getIssuesFromGithub(this.currentRepo).then((data) => {
            // console.log(data);
            this.currentRepoInfo = data;
        })
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