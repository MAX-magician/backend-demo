const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const myLog = require("./utils/myLog");
// const log4js = require("log4js");
// const logger = log4js.getLogger();
const koajwt = require("koa-jwt");
const cors = require("koa2-cors");

const index = require("./routes/index");
const users = require("./routes/users");
const owner = require("./routes/owner");
const upload = require("./routes/upload");

// error handler
onerror(app);

// 跨域
app.use(
  cors({
    origin: "*",
  })
);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());
// app.use(logger())
app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "pug",
  })
);

// logger
app.use(async (ctx, next) => {
  switch (ctx.method.toLowerCase()) {
    case "post":
      myLog.info(`POST请求 Params:${JSON.stringify(ctx.request.body)}`);
      break;
    case "delete":
      myLog.info(`DELETE请求 Params:${JSON.stringify(ctx.request.body)}`);
      break;
    case "put":
      myLog.info(`PUT请求 Params:${JSON.stringify(ctx.request.query)}`);
      break;
    case "get":
      myLog.info(`GET请求 Params:${JSON.stringify(ctx.request.query)}`);
      break;
  }
  await next();
});

// 验证token
app.use(
  koajwt({ secret: "magicMiNiServer" }).unless({
    // 不校验的url
    path: [/^\/users\/login/, /^\/users\/register/, /^\/owner\/search/, /^\/upload\/photo/],
  })
);
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(owner.routes(), owner.allowedMethods());
app.use(upload.routes(), upload.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
