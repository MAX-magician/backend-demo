/**
 * 配置文件
 */

// 是否有密码
const mima = false;

// 定义url
const url = "localhost";
// 定义端口
const port = "27017";
// 数据库用户名
const userName = "";
// 数据库密码
const userPasswd = "";
// 定义数据库的名字
const dbName = "backendDB";
// 拼接url
const URL = mima
  ? `mongodb://${userName}:${userPasswd}@${url}:${port}/${dbName}?authMechanism=DEFAULT&authSource=admin`
  : `mongodb://${url}:${port}/${dbName}`;
// 导出配置
module.exports = {
  URL,
};
