const assert = require('assert');
const supertest = require('supertest');
const mocha = require('mocha');
const express = require('express');
require('dotenv').config()
const dsn = "mongodb://localhost:27017/blog"
const articleCollection  = require('mongo-connecter').init(dsn, 'articles')



// routes we are testing
const routes = require("../routes/api.js");

// setup app
const app = express();
app.use('/api', routes);
const agent = supertest.agent(app);

describe('This will test all api routes', () => {

    before(async () => {
        await articleCollection.reset();

        await articleCollection.insert({
            _id: 1,
            slug: "my-amazing-slug",
            title: "title",
            meta_description: "my description",
            img_url: "img_url",
            img_alt: "img_url",
            img_title: "img_url",
            name: "my name",
            introduction: "my introduction",
            text: "my text",
            date: new Date()
        })

        await articleCollection.insert({
            _id: 2,
            slug: "my-cool-slug",
            title: "title",
            meta_description: "my description",
            img_url: "img_url",
            img_alt: "img_url",
            img_title: "img_url",
            name: "my name",
            introduction: "my introduction",
            text: "my text",
            date: new Date()
        })
    });

    it('should succeed to get all articles', (done) => {
        agent.get("/api/articles")
        .set('Accept', 'application/json')
        .expect(function(res) {
           assert.equal(res.body[0].slug, 'my-amazing-slug');
           assert.equal(res.body[1].slug, 'my-cool-slug');
       })
        .expect(200, done);
    });

    it('should succeed to get one article', (done) => {
        agent.get("/api/article/my-amazing-slug")
        .set('Accept', 'application/json')
        .expect(function(res) {
           assert.equal(res.body.slug, 'my-amazing-slug');
       })
        .expect(200, done);
    });

    it('should fail to test get non existing article', (done) => {
        agent.get("/api/article/doesNotExist")
        .expect(404, done);
    });
});

