const router = require("koa-router")();
const util = require("../utils/util");
const upload = require("../controller/upload");

router.prefix("/upload");

router.post("/photo", upload.single("file"), async (ctx, next) => {  // upload.single()中的名字要与前端formdata或postman中的key一致！
  try {
    // 在路由的时候注入，之后只要这个路由一走，就会自动的将我们的图片上传到服务器，并且保存到我们 upload 中间键配置的保存文件目录下
    ctx.body = util.success(ctx.req.file.filename);
  } catch (error) {
    ctx.body = util.fail(error);
  }
});

module.exports = router;
