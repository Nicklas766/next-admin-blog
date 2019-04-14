var express = require('express');
var router = express.Router();
const session = require('express-session')

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
const MongoStore = require('connect-mongo')(session);
var multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'static/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  const upload = multer({storage: storage})


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


/**
 * checks if request body contains required attributes and then only returns valid attributes
 */
const getContentIfValid = (body) => {
    for (x of ["_id", "slug", "title", "meta_description", "img_url", "img_alt", "img_title", "name", "introduction", "text"]) {
        if (!body.hasOwnProperty(x))
             return false
    
         if (body[x].length == 0)
            return false
    }

    if (body.slug.includes("/")) {
        return false;
    }

    return {
        _id: body._id,
        slug: body.slug,
        title: body.title,
        meta_description: body.meta_description,
        img_url: body.img_url,
        img_alt: body.img_alt,
        img_title: body.img_title,
        name: body.name,
        introduction: body.introduction,
        text: body.text,
    }
}

const slugExists = (slug) => 
    articleCollection.fetch({slug: slug})
    .then(res => (res !== undefined && res.length > 0))
    .catch(res => false)

/**
 * checks if article exists
 */
const articleExists = (id) => 
    articleCollection.fetch({_id: id})
    .then(res => (res !== undefined && res.length > 0))
    .catch(err => false)



/**
 * publishes an article
 */
router.post('/publish', jsonParser, async (req, res) => {

    try {
        req.body._id = await articleCollection.collectionDo(col => col.count()) + 1;
        const cleanedBody = getContentIfValid(req.body);

        if (cleanedBody) {

            if (await slugExists(req.body.slug)) {
                return res.status(409).send('Already exists!');
            }
            
            cleanedBody.date = new Date();
            await articleCollection.insert(cleanedBody)
            return res.status(200).send('Success: added');
        }

        return res.status(400).send('Invalid details!');
    }
    catch (err) {
         return res.status(500).send('Internal error occured!');   
    }
    
});
router.post('/upload', upload.single('file'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    const file = req.file
    if (!file) {
        return res.status(500).send('Internal error occured!')
    }
    res.status(200).send('success')
  })


/**
 * updates an article
 */
router.post('/update', jsonParser, async (req, res) => {

    const cleanedBody = getContentIfValid(req.body);

    if (cleanedBody) {
        try {
            if (!await articleExists(req.body._id)) {
                return res.status(404).send('Internal error occured!');
            }
    
            // DIFFERENT ID BUT SAME SLUG NOT ALLOWED!
            const foundSlug = await articleCollection.fetch({slug: cleanedBody.slug})
    
            if (foundSlug !== undefined && foundSlug.length !== 0 && foundSlug[0]._id !== cleanedBody._id)
                return res.status(409).send('Already exists!');
    
            const id = cleanedBody._id;
            delete cleanedBody._id;
            const original = await articleCollection.fetch({_id: id});
            cleanedBody.date = original[0].date;
            await articleCollection.collectionDo(col => col.updateOne({_id: id}, cleanedBody));
            return res.status(200).send('Success: updated');
        }
        catch (err) {
            return res.status(500).send('Internal error occured!');
        }
    }
    return res.status(400).send('Invalid details!'); 
});



router.post('/login', jsonParser, (req, res) => {
    const name = req.body.username;
    const pass = req.body.password;

    if (name == (process.env.ADMIN_USERNAME ? process.env.ADMIN_USERNAME : "username") && pass == (process.env.ADMIN_PASSWORD ? process.env.ADMIN_PASSWORD : "password")) {
        req.session.user = name;
        return res.status(200).send('Success!');
    } else {
        return res.status(401).send('Invalid details!');
    }
});




module.exports = router;
