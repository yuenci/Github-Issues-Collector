import { Octokit, App } from "https://cdn.skypack.dev/octokit";
import token from "./config.js";

// valid github repo link, like https://github.com/yuenci/Java-Car-Rental-System
export function validLink(link) {
    const reg = /https:\/\/github.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+/;
    //console.log(reg.test(link));
    return reg.test(link);
}

export function initGithub() {
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
            reject(e);
        }
    });
}


export function getAllRepos() {
    const projects = localStorage.getItem("projects");
    if (projects) {
        return JSON.parse(projects);
    } else {
        return [];
    }
}

export async function getIssuesFromGithub(repo) {
    const octokit = new Octokit({ auth: token });
    let res = await octokit.paginate(octokit.rest.issues.listForRepo, {
        owner: "yuenci",
        repo: repo,
        per_page: 100,
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