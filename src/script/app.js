// 公共函数
'use strict';
angular.module('app', ['ui.router', 'ngCookies', 'validation', 'ngAnimate'])
    //调用服务、公共函数
    .run(['$rootScope', 'validRegex', 'common', 'MyServer', function($rootScope, validRegex, common, MyServer) {
        // 全局$rootscope 和 函数 调用测试
        // $rootScope.test();
        // common.test();
        /****************************************************************************************************/
        //调用获取token 服务 // getToken() 2017.6.20---单独文件封装的调用/暂停
        // MyServer.getToken();
        // 验证正则全局调用
        $rootScope.validRegex = validRegex;
    }])
