const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const handle = app.getRequestHandler()
// personally added
var favicon = require('serve-favicon')
var path = require('path')


const dsn = "mongodb://localhost:27017/blog"
const articleCollection  = require('mongo-connecter').init(dsn, 'articles')



const port = parseInt(process.env.PORT, 10) || 3000;





// options for static files
const staticSendOptions = (type) => ({
      root: __dirname + '/static/',
      headers: {'Content-Type': type}
});

var adminRoutes = require('./routes/admin');
var apiRoutes = require('./routes/api');

app.prepare()
.then(() => {

  const server = express();

  
  // Favicon
  server.use(favicon(path.join(__dirname, 'static', 'favicon.ico')))

  server.use('/admin', adminRoutes);
  server.use('/api', apiRoutes);

  // --------------------------BEGIN SEO AND GOOGLE STUFF --------------------------
  server.get('/robots.txt', (req, res) => {
    res.status(200).sendFile('robots.txt', staticSendOptions("text/plain;charset=UTF-8"))
  });

  server.get('/sitemap.xml', (req, res) => {
    res.status(200).sendFile('sitemap.xml', staticSendOptions("text/xml;charset=UTF-8"))
  });

  // google search console
  server.get('/googleVerificationHashCode.html', (req, res) => {
    res.status(200).sendFile('googleVerificationHashCode.html', staticSendOptions("text/plain;charset=UTF-8"))
  });

// -------------------------- END SEO AND GOOGLE STUFF --------------------------

server.get('/article/:slug', function(req, res) { 
  const actualPage = '/article'
  const queryParams = { slug: req.params.slug }
  app.render(req, res, actualPage, queryParams)
});

  

  //
  server.get('*', (req, res) => {
    return handle(req, res)
  })



  server.listen(port, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:' + port)
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
