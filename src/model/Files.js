/**
 * 用户集合的数据模型, 包含数据规范
 */
// 导入
const mongoose = require("../db/db");
// 配置字段的格式
const FilesSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    }, // 用户ID 归属
    fileType: Number, //文件类型  1.图片  2.视频  3.文档  4.压缩包  5.可执行文件
    fileURL: String, // 已保存的文件路径
    label: Array, // 文件的标签
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
