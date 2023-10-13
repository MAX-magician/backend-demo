const router = require("koa-router")();
const util = require("../utils/util");
const upload = require("../utils/upload");
const { addFile } = require("../controller/upload");

router.prefix("/upload");
// upload.single()中的名字要与前端formdata或postman中的key一致！
router.post("/photo", upload.single("file"), async (ctx, next) => {
  try {
    let fileGetData = {
      userId: "",
      fileURL: "",
      label: [],
      fileType: 0,
    };
    fileGetData = { ...ctx.query };
    fileGetData.fileType = Number(fileGetData.fileType);
    // 在路由的时候注入，之后只要这个路由一走，就会自动的将我们的图片上传到服务器，并且保存到我们 upload 中间键配置的保存文件目录下
    if (ctx.req.file.filename) {
      fileGetData.fileURL = ctx.req.file.destination + ctx.req.file.filename;
      const fileback = await addFile(fileGetData);
      ctx.body = util.success(fileback);
    }else{
      ctx.body = util.fail("上传成功，但保存失败！");
    }
  } catch (error) {
    ctx.body = util.fail(error);
  }
});

module.exports = router;
