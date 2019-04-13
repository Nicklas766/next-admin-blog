var express = require('express');
var router = express.Router();
const session = require('express-session')

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
// db = require('mongodb').connect("mongodb://localhost:27017/blog", {useNewUrlParser : true})

// Retrieve
const dsn = "mongodb://localhost:27017/blog"
const articleCollection  = require('mongo-connecter').init(dsn, 'articles')


  // Get word stuff
  router.get('/articles', async (req, res) => {
    try {
        const data = await articleCollection.fetch()
        res.json(data)
    } catch (err) {
        return res.status(500).send('Internal error occured!');
    }
  })

  // Get word stuff
  router.get('/article/:slug', async (req, res) => {
    try {
        const data = await articleCollection.fetchOne({slug: req.params.slug}) 

        if (data == null) {
          return res.status(404).send('Article not found!');
        }
        
        res.json(data)

    } catch (err) {
        return res.status(500).send('Internal error occured!');
    }
  })

  module.exports = router;