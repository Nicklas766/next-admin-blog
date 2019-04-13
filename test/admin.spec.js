const assert = require('assert');
const supertest = require('supertest');
const mocha = require('mocha');
const express = require('express');

// routes we are testing
const routes = require("../routes/admin.js");

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


    it('should publish or update article', (done) => {
        agent.post("/admin/publish")
            .set('Accept', 'application/json')
            .send({
                slug: "cool-slug",
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
