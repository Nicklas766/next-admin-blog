var express = require('express');
var router = express.Router();
const session = require('express-session')

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()


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

// Gets the user based on name and checks if correct password
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