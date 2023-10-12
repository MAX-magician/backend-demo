/**
 * 用户集合, 控制器
 */

// 引入数据库模型
const User = require("../model/User");
// 注册
const register = async (params) => {
  const user = new User(params);
  // 用户保存, 就是新增的效果
  const userInfo = await user.save();
  if (userInfo != null) {
    return userInfo;
  } else {
    return false;
  }
};
// 登录
const login = async (userName, userPassword) => {
  // 从数据库中查找
  let user = await User.findOne({ userName, userPassword });
  // 是否找到
  if (user != null) {
    return user;
  } else {
    return false;
  }
};
// 导出
module.exports = {
  register,
  login,
};
