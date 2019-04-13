const assert = require('assert');
const supertest = require('supertest');
const mocha = require('mocha');
const express = require('express');

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
            slug: "my-amazing-slug",
            title: "title",
            meta_description: "my description",
            visible: "my visible",
            name: "my name",
            text: "my text",
            img: "my img"
        })

        await articleCollection.insert({
            slug: "my-cool-slug",
            title: "title",
            meta_description: "my description",
            visible: "my visible",
            name: "my name",
            text: "my text",
            img: "my img"
        })
    });

    it('test get all', (done) => {
        agent.get("/api/articles")
        .set('Accept', 'application/json')
        .expect(function(res) {
           assert.equal(res.body[0].slug, 'my-amazing-slug');
           assert.equal(res.body[1].slug, 'my-cool-slug');
       })
        .expect(200, done);
    });

    it('test get all', (done) => {
        agent.get("/api/article/my-amazing-slug")
        .set('Accept', 'application/json')
        .expect(function(res) {
           assert.equal(res.body.slug, 'my-amazing-slug');
       })
        .expect(200, done);
    });

    it('test get all', (done) => {
        agent.get("/api/article/doesNotExist")
        .expect(404, done);
    });
});

