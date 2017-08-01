'use strict';
/**
 *  Module
 *
 * Description 正则表达式验证
 */
angular.module('app').constant('validRegex', {
    Regex_Name: /^[a-zA-Z][a-zA-Z0-9_@]{0,30}$/, // 用户名
    Regex_NickName: /^[\u4E00-\u9FA5A-Za-z0-9_\-]+$/, // 中文/英文/数字， (昵称、组名、朋友备注名、内容名称、书名、页名) 
    Regex_Mobile: /^0?(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/, // 手机号
    Regex_PsaaWord:/^[a-zA-Z0-9]{6,20}$/, //密码6-20位不能有特殊字符
    Regex_Card: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/, // 身份证号 
    Regex_Passport: /^1[45][0-9]{7}$|G[0-9]{8}$|P\.[0-9]{7}$|S[0-9]{7,8}$|D[0-9]{7,8}$/, // 护照
    Regex_BizLience: /^(\d{18}$|\d{15}$)/, // 营业执照,三证合一的是18位
    Regex_Email: /^[a-zA-Z0-9]+([._\\-]*[a-zA-Z0-9])*@([a-zA-Z0-9]+[-a-zA-Z0-9]*[a-zA-Z0-9]+.){1,63}[a-zA-Z0-9]+$/, // 邮箱
    Regex_RealName: /^[a-zA-Z\u4e00-\u9fa5]{0,}$/, // 真实姓名、朋友昵称、朋友全称、组名称、组标签
    Regex_text: /^[\u4e00-\u9fa5]{0,}$/, // 地区 、省份、城市
    Regex_isExitZh: /[\u4E00-\u9FA5\uF900-\uFA2D]/, // 验证是否存在中文
    Regex_num: /^\-?\d*$/,
    Regex_price: /^\d+(\.\d{1,2})?$/, // 数字 . 最多两位有效数字
    Regex_EnghlishNum:/^(?=.*\d)(?=.*[a-z])[a-zA-Z\d]{6,20}$/ //6至20位英文和数字组合

})
