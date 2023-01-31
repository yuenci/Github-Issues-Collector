```js
import { Octokit, App } from "octokit";
// nodojs

import { Octokit, App } from "https://cdn.skypack.dev/octokit";
// frontend

```

https://github.com/octokit/octokit.js

https://octokit.github.io/rest.js/v19

Github 官方库，用来操作Github

获取令牌

https://docs.github.com/zh/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token

https://github.com/settings/tokens

![1675049979743](image/README/1675049979743.png)

fine-grained personal access token

只能访问特定储存库，而且可以设置权限，而且有到期日比较安全，但权限低

### api

https://docs.github.com/zh/rest/guides/getting-started-with-the-rest-api?apiVersion=2022-11-28

### token

```
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
```

### demo

```js
async function loginToGithub() {
  // Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
  const octokit = new Octokit({ auth: token });

  // Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
  const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated();
  console.log("Hello, %s", login);
}

async function loopAllQS() {
  const octokit = new Octokit({ auth: token });

  const iterator = octokit.paginate.iterator(octokit.rest.issues.listForRepo, {
    owner: "yuenci",
    repo: "Roommate-Finder",
    per_page: 100,
  });

  // iterate through each response
  for await (const { data: issues } of iterator) {
    for (const issue of issues) {
      console.log("Issue #%d: %s", issue.number, issue.title);
    }
  }
}

//retrieve all items
const issues = await octokit.paginate(octokit.rest.issues.listForRepo, {
  owner: "octocat",
  repo: "hello-world",
  per_page: 100,
});


```

# UI

### naive ui

api 设计的有点烂

```bash
$npm i -D naive-ui
```

```bash
$npm i -D vfonts
```

```js
import naive from "naive-ui";
const app = createApp(App);
app.use(naive);
app.mount('#app');

```

https://www.naiveui.com/zh-CN/os-theme/components/button

### element

```
npm install element-plus --save

yarn add element-plus
```

```js

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')
```

### icon

```bash
# 使用 SVG
npm i -D @sicons/fluent
npm i -D @sicons/ionicons4
npm i -D @sicons/ionicons5
npm i -D @sicons/antd
npm i -D @sicons/material
npm i -D @sicons/fa # font awesome
npm i -D @sicons/tabler
npm i -D @sicons/carbon
```

https://www.xicons.org/#/

https://github.com/07akioni/xicons/blob/main/README.zh-CN.md

使用svg语法来作为图像引入是最简单的

```bash
<img src="@sicons/fluent/Money16Regular.svg" />

```

否则的话就要使用组件套组件方式才可以正常渲染

```bash
$npm i -D @sicons/ionicons5
```

# router

```bash
$npm install vue-router@4
```


* [ ] display body image
* [ ] add comment
* [X] show loading
* [X] order the issues
