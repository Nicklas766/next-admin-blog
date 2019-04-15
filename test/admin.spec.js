const assert = require('assert');
const supertest = require('supertest');
const mocha = require('mocha');
const express = require('express');
require('dotenv').config()
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

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
describe('This will test admin routes', () => {
    before(async () => {
        await articleCollection.reset();

        await articleCollection.insert({
            _id: 1,
            slug: "my-amazing-slug",
            title: "title",
            meta_description: "my description",
            img_url: "img_url",
            img_alt: "img_alt",
            img_title: "img_title",
            name: "my name",
            introduction: "introduction",
            text: "my text",
            date: new Date()
        })

        await articleCollection.insert({
            _id: 2,
            slug: "my-second-slug",
            title: "title",
            meta_description: "my description",
            img_url: "img_url",
            img_alt: "img_alt",
            img_title: "img_title",
            name: "my name",
            introduction: "introduction",
            text: "my text",
            date: new Date()
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
                img_url: "img_url",
                img_alt: "img_alt",
                img_title: "img_title",
                name: "my name",
                introduction: "introduction",
                text: "my text",
            })
            .expect(200, 'Success: added', done);
    });

    it('should fail to publish article with existing slug', (done) => {
        
        agent.post("/admin/publish")
            .set('Accept', 'application/json')
            .send({
                slug: "my-amazing-slug",
                title: "my title",
                meta_description: "my description",
                img_url: "img_url",
                img_alt: "img_alt",
                img_title: "img_title",
                name: "my name",
                introduction: "introduction",
                text: "my text",
            })
            .expect(409, done);
    });

    it('should update article', (done) => {
        
        agent.post("/admin/update")
            .set('Accept', 'application/json')
            .send({
                _id: 1,
                slug: "my-amazing-slugve",
                title: "my title",
                meta_description: "my description",
                img_url: "img_url",
                img_alt: "img_alt",
                img_title: "img_title",
                name: "my name",
                introduction: "introduction",
                text: "n text",
            })
            .expect(200, done);
    });

    it('should fail to update article', (done) => {
        
        agent.post("/admin/update")
            .set('Accept', 'application/json')
            .send({
                _id: 100,
                slug: "my-amazing-slugddd",
                title: "my title",
                meta_description: "my description",
                img_url: "img_url",
                img_alt: "img_alt",
                img_title: "img_title",
                name: "my name",
                introduction: "introduction",
                text: "n texteeeeeeeeeeeeeeeeeeeeeeeee",
                img: "my img",
            })
            .expect(404, done);
    });


    it('should now be able to to publish article with previous existing slug', (done) => {
        
        agent.post("/admin/publish")
            .set('Accept', 'application/json')
            .send({
                slug: "my-amazing-slug",
                title: "my title",
                meta_description: "my description",
                img_url: "img_url",
                img_alt: "img_alt",
                img_title: "img_title",
                name: "my name",
                introduction: "introduction",
                text: "my text",
            })
            .expect(200, done);
    });

    it('should fail to publish since empty', (done) => {
        
        agent.post("/admin/publish")
            .set('Accept', 'application/json')
            .send({
                slug: "",
                title: "",
                meta_description: "",
                img_url: "img_url",
                img_alt: "img_url",
                img_title: "img_url",
                introduction: "r",
                name: "",
                text: "",
            })
            .expect(400, done);
    });

    it('should fail to update since empty', (done) => {
        
        agent.post("/admin/update")
            .set('Accept', 'application/json')
            .send({
                _id: 1,
                slug: "",
                title: "",
                meta_description: "",
                img_url: "img_url",
                img_alt: "img_url",
                img_title: "img_url",
                name: "",
                text: "",
            })
            .expect(400, done);
    });

    it('should fail since we cannot update our article with _id = 1 to the same slug as _id = 2', (done) => {
        
        agent.post("/admin/publish")
            .set('Accept', 'application/json')
            .send({
                _id: 1,
                slug: "my-second-slug",
                title: "title",
                meta_description: "my description",
                img_url: "img_url",
                img_alt: "img_alt",
                img_title: "img_title",
                name: "my name",
                introduction: "introduction",
                text: "my text",
            })
            .expect(409, done);
    });


    it('PUBLISH: should fail because slugs cannot contain slashes / ', (done) => {
        
        agent.post("/admin/publish")
            .set('Accept', 'application/json')
            .send({
                slug: "/e",
                title: "title",
                meta_description: "my description",
                img_url: "img_url",
                img_alt: "img_alt",
                img_title: "img_title",
                name: "my name",
                introduction: "introduction",
                text: "my text",
            })
            .expect(400, done);
    });

    it('UPDATE: should fail because slugs cannot contain slashes / ', (done) => {
        
        agent.post("/admin/update")
            .set('Accept', 'application/json')
            .send({
                _id: 1,
                slug: "my-amazi/ng-slugve",
                title: "my title",
                meta_description: "my description",
                img_url: "img_url",
                img_alt: "img_alt",
                img_title: "img_title",
                name: "my name",
                introduction: "introduction",
                text: "n text",
            })
            .expect(400, done);
    });


});

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
describe('these tests will see if wrong input gets 400 code', () => {
    before(async () => {
        await articleCollection.reset();
    });


    it('should fail to publish article', (done) => {
        agent.post("/admin/publish")
            .set('Accept', 'application/json')
            .send({
                slug: "cool-slug",
                title: "my title"
            })
            .expect(400, done);
    });

    it('should fail to update article', (done) => {
        agent.post("/admin/update")
            .set('Accept', 'application/json')
            .send({
                slug: "cool-slug"
            })
            .expect(400, done);
    });
});