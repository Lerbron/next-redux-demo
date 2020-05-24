const express = require("express");
const {
  createProxyMiddleware
} = require("http-proxy-middleware");
const cookieParser = require("cookie-parser");
const next = require("next");
const {
  createUuid
} = require('./utils/createUuid')

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev
});
const handle = app.getRequestHandler();

const devProxy = {
  "/api": {
    target: "https://cnodejs.org",
    changeOrigin: true
  }
};

app.prepare().then(() => {
  const server = express();
  server.use(cookieParser());

  Object.keys(devProxy).forEach(function (context) {
    server.use(createProxyMiddleware(context, devProxy[context]));
  })

  server.use((req, res, next) => {
    const cookies = req.cookies
    if(!cookies.uuid) {
      const uuid= createUuid()
      res.cookie('uuid', uuid)
    }
    next()
  })


  server.get('/detail/:id', (req, res, next) => {
    const params = { id: req.params.id }
    return app.render(req, res, '/detail', params)
  })



  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });

});