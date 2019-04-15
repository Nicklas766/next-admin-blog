const express = require('express')
const next = require('next')
const favicon = require('serve-favicon')
const path = require('path')

require('dotenv').config()

// routes
var adminRoutes = require('./routes/admin');
var apiRoutes = require('./routes/api');
var seoRoutes = require('./routes/seo');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = parseInt(process.env.PORT, 10) || 3000;

app.prepare().then(() => {

  const server = express();

  // Favicon
  server.use(favicon(path.join(__dirname, 'static', 'favicon.ico')))

  // specific routes
  server.use('/admin', adminRoutes);
  server.use('/api', apiRoutes);
  server.use('/', seoRoutes);

  // next routes
  server.get('/article/:slug', function(req, res) { 
    const actualPage = '/article'
    const queryParams = { slug: req.params.slug }
    app.render(req, res, actualPage, queryParams)
  });

  // next routes
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
