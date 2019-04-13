var express = require('express');
var router = express.Router();
const session = require('express-session')

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
// db = require('mongodb').connect("mongodb://localhost:27017/blog", {useNewUrlParser : true})

// Retrieve
const dsn = "mongodb://localhost:27017/blog"
const articleCollection  = require('mongo-connecter').init(dsn, 'articles')

// db.createCollection("articles", {autoIndexId: true} );

router.use(session({
    secret: 'my-badly-placed-token',
    resave: false,
    saveUninitialized: true
  }));

// Redirect to login if not logged in
router.use(function(req, res, next) {


    if (req._parsedUrl.pathname == "/") {
        return next();
    }

    if (req._parsedUrl.pathname == "/login") {
        return next();
    }

    if (req.session.user) {
 
        return next();
    }
    res.status(403).redirect('/admin');
});


router.post('/publish', jsonParser, async (req, res) => {

    // All inputs need to exist
    for (x of ["slug", "title", "meta_description", "visible", "name", "text", "img"])
        if (!req.body.hasOwnProperty(x))
            return res.status(400).send('Invalid details');

    try {
        const found = await articleCollection.fetch({slug: req.body.slug})

        if (found == null) {
            await articleCollection.collectionDo(col => col.count())
            req.body._id = count + 1;
            await articleCollection.insert(req.body)
            return res.status(200).send('Success: added');
        } 
            
        await articleCollection.collectionDo(col => col.update({slug: req.body.slug}, req.body))
        return res.status(200).send('Success: updated');
    } 
    catch (err) {
        return res.status(500).send('Internal error occured!');
    }
});



router.post('/login', jsonParser, (req, res) => {
    const name = req.body.username;
    const pass = req.body.password;

    if (name == "username" && pass == "password") {
        req.session.user = name;
        return res.status(200).send('Success!');
    } else {
        return res.status(401).send('Invalid details!');
    }
});




module.exports = router;