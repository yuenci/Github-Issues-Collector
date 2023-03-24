import { Octokit, App } from "https://cdn.skypack.dev/octokit";
import { ElMessage } from "element-plus";
import token from "./config";

// valid github repo link, like https://github.com/yuenci/Java-Car-Rental-System
export function validLink(link) {
    const reg = /https:\/\/github.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+/;
    //console.log(reg.test(link));
    return reg.test(link);
}

export function initGithub() {
    const token = getToken();
    const octokit = new Octokit({ auth: token });

    return new Promise(async (resolve, reject) => {
        try {
            const {
                data: { login },
            } = await octokit.rest.users.getAuthenticated();
            resolve(login);
        }
        catch (e) {
            console.log("init github error");
            ElMessage.error("init github error");
            reject(e);
        }
    });
}

export function tokenTest(tokenInput) {
    const octokit = new Octokit({ auth: tokenInput });
    return new Promise(async (resolve, reject) => {
        try {
            const {
                data: { login },
            } = await octokit.rest.users.getAuthenticated();
            resolve(login);
        }
        catch (e) {
            reject(e);
        }
    });
}




export function getAllRepos() {
    const projects = localStorage.getItem("repos");
    if (projects) {
        //console.log(projects);
        return JSON.parse(projects);
    } else {
        localStorage.setItem("projects", JSON.stringify([]));
        return [];
    }
}

export function addRepo(repolIink) {
    let repoName = repolIink.split("/")[4];
    const projects = getAllRepos();
    // if already exist, return
    if (projects.includes(repoName)) {
        return;
    }

    projects.push(repoName);
    localStorage.setItem("repos", JSON.stringify(projects));
}

export function ifGithubRepoURL(url) {
    const reg = /https:\/\/github.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+/;
    return reg.test(url);
}

export async function getIssuesFromGithub(repo) {
    if (!repo) return;
    //console.log(repo);
    const token = getToken();
    const octokit = new Octokit({ auth: token });
    let res = await octokit.paginate(octokit.rest.issues.listForRepo, {
        owner: getUserNameFromLocalStorage().userName,
        repo: repo,
        per_page: 100,
    });
    return res;
}

export async function getRepoInfoFromGithub(repo) {
    const token = getToken();
    const octokit = new Octokit({ auth: token });
    let res = await octokit.rest.repos.get({
        owner: getUserNameFromLocalStorage().userName,
        repo: repo,
    });
    return res;
}

export function formatDate(isoString) {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const seconds = `0${date.getSeconds()}`.slice(-2);
    const res = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return res;
};

export function ISOToDate(isoString) {
    const isoDate = isoString;
    const date = new Date(isoDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = date.toLocaleDateString('en-US', options);
    return dateString;
};


export function writeToken(token) {
    localStorage.setItem("token", token);
}

export function getToken() {
    // let tokenKey = token
    // return tokenKey;
    let token = localStorage.getItem("github_token");
    if (token) {
        return token;
    } else {
        return null;
    }
}


export async function getUserInfo(userName) {
    let response = await fetch(`https://api.github.com/users/${userName}`);
    let data = await response.json();
    return data;

}

export function writeUserNameToLinkLocalStorage(url, fixed) {
    if (!ifGithubRepoURL(url)) return;

    let userName = url.split("/")[3];
    let data = {
        userName: userName,
        fixed: fixed
    }
    localStorage.setItem("userName", JSON.stringify(data));
}

export function writeUserNameToLocalStorage(userName, fixed) {
    let data = {
        userName: userName,
        fixed: fixed
    }
    localStorage.setItem("userName", JSON.stringify(data));
}

export function getUserNameFromLocalStorage() {
    let userName = localStorage.getItem("userName");
    if (userName) {
        return JSON.parse(userName);
    } else {
        return null;
    }
}

export function isWriteUserNameFromUrl() {
    let data = getUserNameFromLocalStorage();
    if (data === null) return true;
    if (data.fixed === true) return false;
    return true;
}


export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}