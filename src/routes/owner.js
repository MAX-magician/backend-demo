const router = require("koa-router")();
const util = require("../utils/util");
const { search } = require("../controller/owner");

router.prefix("/owner");

router.post("/search", async (ctx, next) => {
  try {
    const ownerData = ctx.request.body; // {name, phone, build, class, floor, number}
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
