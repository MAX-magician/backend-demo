/**
 * 上传文件, 控制器
 */

// 引入数据库模型
const Files = require("../model/Files");

// 新建
/**
 * 文件上传的控制器
 * @param {Object} params 用户ID 文件类型 标签 文件的路径
 * @returns {String} 文件的路径
 */
const addFile = async (params) => {
  const file = new Files(params);
  // 用户保存, 就是新增的效果
  userInfo = await file.save();
  if (userInfo != null) {
    return userInfo;
  } else {
    return false;
  }
};
// 导出
module.exports = {
  addFile,
};
