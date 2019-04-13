var express = require('express');
var router = express.Router();
const session = require('express-session')

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
const MongoStore = require('connect-mongo')(session);


const dsn = "mongodb://localhost:27017/blog"
const articleCollection  = require('mongo-connecter').init(dsn, 'articles')

router.use(session({
    secret: 'my-badly-placed-token',
    store: new MongoStore({url: "mongodb://localhost:27017/blog"}),
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
    for (x of ["slug", "title", "meta_description", "visible", "name", "text", "img"]) {
        if (!req.body.hasOwnProperty(x))
            return res.status(400).send('Invalid details');

        if (req.body[x].length == 0)
            return res.status(400).send('Invalid details');
    }
        
    try {
        const found = await articleCollection.fetch({slug: req.body.slug})

        if (found === undefined || found.length == 0) {
            const count = await articleCollection.collectionDo(col => col.count())
            req.body._id = count + 1;
            await articleCollection.insert(req.body)
            return res.status(200).send('Success: added');
        } 

        return res.status(409).send('Already exists!');
        
    } 
    catch (err) {
        return res.status(400).send('Internal error occured!');
    }
});

router.post('/update', jsonParser, async (req, res) => {

    // All inputs need to exist
    for (x of ["_id", "slug", "title", "meta_description", "visible", "name", "text", "img"])
        if (!req.body.hasOwnProperty(x))
            return res.status(400).send('Invalid details');

        if (req.body[x].length == 0)
            return res.status(400).send('Invalid details');

    try {
        const found = await articleCollection.fetch({_id: req.body._id})

        if (found === undefined || found.length == 0) {
            return res.status(404).send('Internal error occured!');
        }

        // DIFFERENT ID BUT SAME SLUG NOT ALLOWED!
        const foundSlug = await articleCollection.fetch({slug: req.body.slug})

        if (foundSlug !== undefined && foundSlug.length !== 0 && foundSlug[0]._id !== req.body._id)
            return res.status(409).send('Already exists!');

        const id = req.body._id;
        delete req.body._id
        await articleCollection.collectionDo(col => col.update({_id: id}, req.body));
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