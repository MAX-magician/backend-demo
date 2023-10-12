/**
 * 用户集合的数据模型, 包含数据规范
 */
// 导入
const mongoose = require("../db/db");
// 配置字段的格式
const FilesSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    }, // 用户名称
    phone: {
      type: String,
    },
    build: String, //楼号
    class: String, // 单元
    floor: String, // 楼层
    number: String, // 户号
    createTime: {
      type: Date,
      default: Date.now(),
    }, //创建时间
    lastLoginTime: {
      type: Date,
      default: Date.now(),
    }, //更新时间
  },
  {
    timestamps: true, // 时间戳
    versionKey: false, // 清除版本信息
  }
);
// 定义模型, 不用写复数
const Files = mongoose.model("UserFile", FilesSchema);
// 输出模型
module.exports = Files;
