const assert = require('assert');
const supertest = require('supertest');
const mocha = require('mocha');
const express = require('express');

// routes we are testing
const routes = require("../routes/admin.js");

const dsn = "mongodb://localhost:27017/blog"
const articleCollection  = require('mongo-connecter').init(dsn, 'articles')

// setup app
const app = express();
app.use('/admin', routes);
const agent = supertest.agent(app);

describe('This will test all failures on admin routes', () => {
    

    it('should return a 302 response and redirect to /admin', (done) => {
        agent.get("/admin/dashboard")
            .expect('Location', '/admin')
            .expect(302, done);
    });

    it('should fail login admin', (done) => {
        agent.post("/admin/login")
            .set('Accept', 'application/json')
            .send({
                username: "usernameWRONG",
                password: "password"
            })
            .expect(401, done);
    });
});

describe('This will test admin routes', () => {
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

    });

    it('should login admin', (done) => {
        agent.post("/admin/login")
            .set('Accept', 'application/json')
            .send({
                username: "username",
                password: "password"
            })
            .expect(200, done);
    });

    it('should return a 404 code since we should be able to access the route but not nextjs stuff', (done) => {
        agent.get("/admin/dashboard")
            .expect(404, done);
    });

    it('should publish new article', (done) => {
        
        agent.post("/admin/publish")
            .set('Accept', 'application/json')
            .send({
                slug: "my-new-article",
                title: "my title",
                meta_description: "my description",
                visible: "my visible",
                name: "my name",
                text: "my text",
                img: "my img",
            })
            .expect(200, 'Success: added', done);
    });

    it('should update article', (done) => {
        
        agent.post("/admin/publish")
            .set('Accept', 'application/json')
            .send({
                slug: "my-amazing-slug",
                title: "my title",
                meta_description: "my description",
                visible: "my visible",
                name: "my name",
                text: "my text",
                img: "my img",
            })
            .expect(200, 'Success: updated', done);
    });

    it('should fail to publish or update article due to lack of sent attributes', (done) => {
        agent.post("/admin/publish")
            .set('Accept', 'application/json')
            .send({
                slug: "cool-slug",
                title: "my title",
                meta_description: "my description",
                visible: "my visible",
                name: "my name"
            })
            .expect(400, done);
    });
});



