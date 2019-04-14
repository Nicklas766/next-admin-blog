const assert = require('assert');
const supertest = require('supertest');
const mocha = require('mocha');
const express = require('express');



// routes we are testing
const routes = require("../routes/seo.js");

// setup app
const app = express();
app.use('/', routes);
const agent = supertest.agent(app);

describe('This will test all seo routes except google verification', () => {

    it('test get robots.txt', (done) => {
        agent.get("/robots.txt")
        .expect(200, done);
    });

    it('test get sitemap.xml', (done) => {
        agent.get("/sitemap.xml")
        .expect(200, done);
    });
});

