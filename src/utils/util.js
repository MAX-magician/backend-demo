/**
 * 后台通用的工具函数
 */

// 导入之前封装好的日志对象
const myLog = require("./myLog");

// 定义错误码, 大写通常表示常量
const CODE = {
  SUCCESS: 0, // 没有错误
  PARAM_ERROR: 1001, //参数不正确
  USER_ACCOUNT_ERROR: 2001, //用户账号密码错误
  USER_LOGIN_ERROR: 3001, //用户未登录
  BUSINESS_ERROR: 4001, //业务请求失败
  AUTH_ERROR: 5001, //认证失败或TOKEN过期
};

/**
 * 分页结构
 * @param {object} pageNum 第几页, pageSize, 每页多少条
 */
function pager({ pageNum = 1, pageSize = 10 }) {
  // pageNum, pageSize 参数转数字
  pageNum *= 1;
  pageSize *= 1;
  // 因为数据库查询数据, 需要起始索引(skipIndex)和查询条数,
  // 比如第一页的数据, 应该是起始索引0, 查10条(索引0~9)
  // 第二页的数据, 起始索引10, 查10条(索引10~19)
  // 第三页的数据, 起始索引20, 查10条(索引20~29)
  // 根据pageNum和pageSize, 可以计算起始索引
  const skipIndex = (pageNum - 1) * pageSize;
  // 返回数据
  return {
    page: {
      pageNum, // 第几页, 页码
      pageSize, // 每页几条
    },
    skipIndex, // 数据库查询的时候, 起始索引
  };
}

/**
 * 成功请求的封装, data是第一个参数, 方便调用的时候传参, code默认成功, 可以不传
 * @param {object} data 数据
 * @param {string} msg 信息
 * @param {number} code 错误码
 * @returns {object} 包含数据, 信息, 错误码的对象
 */
function success(data = "", msg = "", code = CODE.SUCCESS) {
  // 利用我们封装好的日志方法, 进行打印日志
  myLog.debug(JSON.stringify(data));
  // 返回包含code,data,msg的对象
  return {
    code,
    data,
    msg,
  };
}
/**
 * 失败请求的封装, msg为第一个参数, 方便调用的时候传参, 默认错误码为业务请求失败, 错误状态下, data默认为空
 * @param {string} msg 信息
 * @param {number} code 错误码
 * @param {object} data 数据
 * @returns {object} 包含数据, 信息, 错误码的对象
 */
function fail(msg = "", code = CODE.BUSINESS_ERROR, data = "") {
  // 利用我们封装好的日志方法, 进行打印日志
  myLog.error(JSON.stringify(data));
  // 返回包含code,data,msg的对象
  return {
    code,
    data,
    msg,
  };
}

// 导出定义好的方法
module.exports = {
  pager,
  success,
  fail,
};
