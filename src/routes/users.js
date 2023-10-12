const router = require("koa-router")();
const util = require("../utils/util");
const { register, login } = require("../controller/user");
const jwt = require("jsonwebtoken");

router.prefix("/users");

router.post("/register", async (ctx, next) => {
  try {
    let params = {};
    const regData = ctx.request.body; // { userName, userPassword, userEmail, mobile, sex， birthday }
    if (
      !regData.hasOwnProperty("userName") ||
      !regData.hasOwnProperty("userPassword")
    ) {
      ctx.body = util.fail("请填写必填信息");
      return;
    }

    params.userName = regData.userName;
    params.userPassword = regData.userPassword;
    if (regData.hasOwnProperty("nickName")) {
      params.nickName = regData.nickName;
    }
    if (regData.hasOwnProperty("userEmail")) {
      params.userEmail = regData.userEmail;
    }
    if (regData.hasOwnProperty("mobile")) {
      params.mobile = regData.mobile;
    }
    if (regData.hasOwnProperty("sex")) {
      params.sex = regData.sex;
    }
    if (regData.hasOwnProperty("birthday")) {
      params.birthday = regData.birthday;
    }

    let userInfo = await register(params);

    if (userInfo) {
      userInfo = userInfo.toObject();
      delete userInfo.userPassword;
      delete userInfo.lastLoginTime;
      delete userInfo.createdAt;
      delete userInfo.updatedAt;
      ctx.body = util.success(userInfo);
    } else {
      ctx.body = util.fail("注册失败");
    }
  } catch (error) {
    ctx.body = util.fail(error);
  }
});

router.post("/login", async (ctx, next) => {
  try {
    const logData = ctx.request.body;
    if (
      !logData.hasOwnProperty("userName") ||
      !logData.hasOwnProperty("userPassword")
    ) {
      ctx.body = util.fail("请填写必填信息");
      return;
    }
    let result = await login(logData.userName, logData.userPassword);
    // 生成token 参数 ( 数据，密钥，过期时间 )
    const token = jwt.sign(
      {
        data: result,
      },
      "magicMiNiServer",
      {
        expiresIn: "24h",
      }
    );
    if (result) {
      result = result.toObject();
      delete result.userPassword;
      result.token = token;
      ctx.body = util.success(result);
    } else {
      ctx.body = util.fail("账号或者密码不正确");
    }
  } catch (error) {
    ctx.body = util.fail(error);
  }
});

module.exports = router;
