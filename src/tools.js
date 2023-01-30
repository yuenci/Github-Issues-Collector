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