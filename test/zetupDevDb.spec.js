const assert = require('assert');
const supertest = require('supertest');
const mocha = require('mocha');
const express = require('express');
require('dotenv').config()
const dsn = "mongodb://localhost:27017/blog"
const articleCollection  = require('mongo-connecter').init(dsn, 'articles')


describe('This will just setup a dev db', () => {

    before(async () => {
        await articleCollection.reset();

        await articleCollection.insert({
            _id: 1,
            slug: "my-amazing-slug",
            title: "title",
            meta_description: "my description",
            img_url: "/static/r.png",
            img_alt: "img_url",
            img_title: "img_url",
            name: "My amazing name",
            introduction: "my introduction",
            text: "This article will show you how you can setup tests for your routes in your next application with ease. This approach will also work for a normal express server. \n\nDisclaimer: you will not be able to test your next js routes directly\nDisclaimer: this work pretty much the exact same way as a normal express server.\n\nWe will use mocha, and supertest, nyc when testing our routes.\n\n```\nnpm install mocha --save-dev\nnpm install supertest--save-dev\nnpm install nyc --save-dev\n```\n\nThe idea is to separate the testing of the components and the actual routes for fetching. This article will focus on the fetching part.\n\n\n## Step 1: Put routes in a specific folder\n\nThe first step is to put the routes you want to test into a specific folder. Firstly create a folder called “/routes”.\n\nNow create a file called “users.js” and put it inside `“/routes”`. The path should be “routes/users.js”.\n\nNow inside “users.js” we will create our routes:\n\n## step two image\n\nthe code is:\n```\nfunction hello() {\n    console.log(\"hello world!\");\n}\n```\n\n\n![ee](/static/unicorn-wallpaper.jpg)",
            date: new Date()
        })

        await articleCollection.insert({
            _id: 2,
            slug: "my-cool-slug",
            title: "title",
            meta_description: "my description",
            img_url: "/static/ye.png",
            img_alt: "img_url",
            img_title: "img_url",
            name: "My cool name",
            introduction: "my introduction",
            text: "my text",
            date: new Date()
        })

        await articleCollection.insert({
            _id: 3,
            slug: "my-great-slug",
            title: "title",
            meta_description: "my description",
            img_url: "/static/apple.jpg",
            img_alt: "img_url",
            img_title: "img_url",
            name: "My great name",
            introduction: "my introduction",
            text: "my text",
            date: new Date()
        })

        await articleCollection.insert({
            _id: 4,
            slug: "my-funny-slug",
            title: "title",
            meta_description: "my description",
            img_url: "/static/lap.jpg",
            img_alt: "img_url",
            img_title: "img_url",
            name: "My funny name",
            introduction: "my introduction",
            text: "my text",
            date: new Date()
        })


    });

    it('should be true..', () => {
        assert(true, true)
    });
});

