'use strict';

const GithubClient = require('libs/GithubClient.js').GithubClient;

let githubDotCom = new GithubClient({
    baseUri: "https://api.github.com",
    token: process.env.ACCESS_TOKEN_GITHUB
}, users);

githubDotCom.fetchUser({handle: 'sambhav2612'})
    .then(user => {
        console.log(user);
    })