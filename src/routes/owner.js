const router = require("koa-router")();
const util = require("../utils/util");
const { search } = require("../controller/owner");

router.prefix("/owner");

router.get("/get", async (ctx, next) => {
  try {
    const ownerData = ctx.query; // {name, phone, build, class, floor, number}
    let userInfo = await search({...ownerData});

    if (userInfo) {
      ctx.body = util.success(userInfo);
    } else {
      ctx.body = util.fail("查询失败");
    }
  } catch (error) {
    ctx.body = util.fail(error);
  }
});

module.exports = router;
