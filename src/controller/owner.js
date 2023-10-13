/**
 * 用户集合, 控制器
 */

// 引入数据库模型
const Owner = require("../model/Owner");
const util = require("../utils/util");
// 添加
// const add = async (params) => {
//   const user = new Owner(params);
//   // 用户保存, 就是新增的效果
//   const userInfo = await user.save();
//   if (userInfo != null) {
//     return userInfo;
//   } else {
//     return false;
//   }
// };

// 查询
// obj => {name, phone, build, class, floor, number}
const search = async (obj) => {
  // 从数据库中查找
  let oobj = obj;
  // pageNum = 1, pageSize = 10
  const pageNum = oobj.pageNum;
  const pageSize = oobj.pageSize;
  const pageIndexN = util.pager({ pageNum, pageSize });
  let arr = [];
  Object.keys(oobj).forEach((v) => {
    let o = {};
    o[v] = oobj[v];
    arr.push(o);
  });
  let user = await Owner.find({ $or: arr })
    .skip(pageIndexN.skipIndex)
    .limit(pageIndexN.page.pageSize);
  // 是否找到
  if (user != null) {
    return user;
  } else {
    return false;
  }
};
// 导出
module.exports = {
  //   add,
  search,
};
