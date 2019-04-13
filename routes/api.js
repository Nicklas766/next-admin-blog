var express = require('express');
var router = express.Router();
const session = require('express-session')

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
// db = require('mongodb').connect("mongodb://localhost:27017/blog", {useNewUrlParser : true})

// Retrieve
const dsn = "mongodb://localhost:27017/blog3"
const articleCollection  = require('mongo-connecter').init(dsn, 'articles')

const articles = {
    data: [
      {
        id: 1,
        slug: "my-amazing-summer",
        title: "the amazing summer | find out more",
        metaDescription: "it was an amazing day",
        img: "",
        name: "My amazing summer outdoors",
        text: '## I love the outdoors, it simply is awesome!' + '\n ### My start' + '\n It was a great start, i started with chilling with a couple friends! '
      },
      {
        id: 2,
        slug: "hellllooo",
        title: "helloo",
        metaDescription: "hellooooo",
        img: "",
        name: "hello2",
        text: "hello2"
      }
    ]
  };

  // Get word stuff
  router.get('/articles', async (req, res) => {
    try {
        const data = await articleCollection.fetch()
        console.log(data)
        res.json(data)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
  })

  // Get word stuff
  router.get('/article/:slug', async (req, res) => {
    try {
        const data = await articleCollection.fetch({slug: req.params.slug}) 
        console.log(data)
        res.json(data)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
  })

  module.exports = router;