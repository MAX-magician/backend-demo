/**
 * 用户集合的数据模型, 包含数据规范
 */
// 导入
const mongoose = require("../db/db");
// 配置字段的格式
const UserSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true, // 唯一, 不可重复
    }, // 用户名称
    nickName: {
      type: String,
    },
    userPassword: {
      type: String,
      required: true,
    }, // 用户密码
    userEmail: String, // 用户邮箱
    mobile: String, // 手机号
    sex: Number, // 性别 0:男  1：女
    birthday: String, // 生日 "xxxx-xx-xx"
    lunarCalendar: String, // 阴历生日 "xxxx-xx-xx"
    identity: {
      type: Number,
      default: 0, // 0:普通用户 1:一般用户 2:发布者 3:管理员 1000：超级管理员
    },
    status: Number, // 0:离线 1:在线
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
const User = mongoose.model("user", UserSchema);
// 输出模型
module.exports = User;
