var express = require('express');
var router = express.Router();
const session = require('express-session')

// options for static files
const staticSendOptions = (type) => ({
  root: __dirname.replace('\\routes', '/static'),
  headers: {'Content-Type': type}
});

// --------------------------BEGIN SEO AND GOOGLE STUFF --------------------------
router.get('/robots.txt', (req, res) => {
  res.status(200).sendFile('robots.txt', staticSendOptions("text/plain;charset=UTF-8"))
});

router.get('/sitemap.xml', (req, res) => {
  res.status(200).sendFile('sitemap.xml', staticSendOptions("text/xml;charset=UTF-8"))
});

// google search console
router.get('/googleVerificationHashCode.html', (req, res) => {
  res.status(200).sendFile('googleVerificationHashCode.html', staticSendOptions("text/plain;charset=UTF-8"))
});

module.exports = router;