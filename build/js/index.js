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

'use strict';
/**
 *  Module 配置页面路由
 *
 * Description
 */
'use strict';

angular.module('app').config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $stateProvider.state('index', { //首页路由 包括中间内容和头部底部
        url: "/index",
        views: {
            '': {
                templateUrl: "view/common/main.html",
            },
            '@index': {
                templateUrl: 'view/index/index.html'
            },
            'header@index': {
                templateUrl: 'view/common/header.html'
            },
            'footer@index': {
                templateUrl: 'view/common/footer.html'
            },
            'login@index': {
                templateUrl: 'view/login/login.html'
            }
            
        }
    });
    $urlRouterProvider.otherwise("index");//默认url
}])

'use strict';
angular.module('app').controller('HeaderCtrl', ['$scope', '$http','urls','common', function($scope, $http,urls,common) {
    // console.log('HeaderCtrl', '成功！');
    
}]);

;
(function() {
    'use strict'
    angular.module('app')
        .controller('loginCtr', ['$scope', '$rootScope', '$state', 'MyServer', function($scope, $rootScope, $state, MyServer) {
            // console.log('loginCtr', '成功！');
            //登录弹框
            var popMask = $('.login-po-mask');
            var loginBox = $('#login-box');
            var regetBox = $('#reget-box');
            var forgetBox = $('#forget-box');
            $rootScope.login = function() {
                    $(popMask).show();
                    $(loginBox).show();
                    $(regetBox).hide();
                    $(forgetBox).hide();
                }
                //注册弹框
            $rootScope.reget = function() {
                    $(popMask).show();
                    $(regetBox).show();
                    $(loginBox).hide();
                    $(forgetBox).hide();
                }
                //忘记密码弹框
            $rootScope.forget = function() {
                    $(forgetBox).show();
                    $(regetBox).hide();
                    $(loginBox).hide();

                }
                //关闭弹框
            $rootScope.closeLogin = function() {
                    $(popMask).hide();
                    $(loginBox).hide();
                    $(regetBox).hide();
                    $(forgetBox).hide();

                }
                //回车关闭弹框
            $(document).keyup(function(event) {
                if (event.which == '27') {
                    $rootScope.closeLogin();
                }
            });

            //登录提交
            //登录验证
            $rootScope.errorMsg = '';
            $rootScope.errorBox = false;
            $scope.loginPhone;
            $scope.loginPassword;
            //输入监听
            $rootScope.hideerrorBox = function() {
                $rootScope.errorBox = false;
            };
            //登录提交验证
            $rootScope.loginSubmit = function() {
                if (!$scope.loginPhone) {
                    $rootScope.errorBox = true;
                    $rootScope.errorMsg = '请输入手机号码！';
                    return false;
                }
                if (!$rootScope.validRegex.Regex_Mobile.test($scope.loginPhone)) {
                    $rootScope.errorBox = true;
                    $rootScope.errorMsg = '请输入正确的手机号码！';
                    return false;
                }
                if (!$scope.loginPassword) {
                    $rootScope.errorBox = true;
                    $rootScope.errorMsg = '请输入登录密码！';
                    return false;
                }
                if (!$rootScope.validRegex.Regex_EnghlishNum.test($scope.loginPassword)) {
                    $rootScope.errorBox = true;
                    $rootScope.errorMsg = '请输入6至20位英文和数字组合密码！';
                    return false;
                }
                //调用登录接口
                var formData = {
                    account: $scope.loginPhone,
                    password: $scope.loginPassword
                }

                MyServer.login(formData, function(data) {
                    if (data.data.code == 'SUCCESS') {
                        console.log(data)
                    } else {
                        console.log('error',data.data.code)
                    }
                }, function(err) {
                    console.log('error')
                })
            }
        }])
})();

// 公共方法
(function() {
    'use strict';

    angular.module('app')
        .factory('common', ['$state', '$rootScope', 'lan',
            function($state, $rootScope, lan) {
                //全局$rootscope 方法
                //提示信息框
                //测试
                $rootScope.test = function() {
                    console.log('test$rootscope');
                };
                //公共函数
                return {
                    //测试
                    test: function() {
                        console.log('testFunction')
                    }
                };
            }
        ]);
})();

// 接口封装
(function() {
    'use strict';

    angular.module('app')
        .factory('MyServer', ['$state', '$http', '$rootScope', 'urls',
            function($state, $http, $rootScope, urls) {
                //公共函数
                return {
                    //获取token
                    getToken: function(formData, succCallback, errCallback) {

                        $http({
                            method: 'get',
                            url: urls.getTokenAPI + '/token/get',
                            data: formData
                        }).then(succCallback, errCallback);
                    },
                    //错误回调
                    errorCallback: function(err) {
                        console.log('err', err);
                    },
                    //urls 获取封装简写
                    httpReq: function(meth, url, formData, succCallback, errCallback) {

                        if ($rootScope.tokenKey) {
                            $http({
                                method: meth,
                                url: url,
                                data: formData,
                                headers: {
                                    'Token-Key': $rootScope.tokenKey,
                                    'Token-Value': $rootScope.tokenValue
                                }
                            }).then(succCallback, errCallback)

                        } else {
                            this.getToken('', function() {}, function() {})
                            this.getToken('', function(resp) {
                                if (resp.data.code == 'SUCCESS') {
                                    $rootScope.tokenKey = resp.data.data.TokenKey;
                                    $rootScope.tokenValue = resp.data.data.TokenValue;
                                    $http({
                                        method: meth,
                                        url: url,
                                        data: formData,
                                        headers: {
                                            'Token-Key': $rootScope.tokenKey,
                                            'Token-Value': $rootScope.tokenValue
                                        }
                                    }).then(succCallback, errCallback)
                                } else {
                                    console.log('获取token失败')
                                    console.log('errCode: ' + resp.data.code, 'errMsg: ' + resp.data.msg)
                                }
                            }, errCallback)
                        }
                    },
                    //登录接口
                    login: function(formData, succCallback, errCallback) {
                        this.httpReq('POST', urls.USERBASE_API + '/passport/login', formData, succCallback, errCallback);
                    }
                }
            }
        ]);
})();

//已用gerServer服务替代。暂不用 2017.6.20
// 'use strict';
// angular.module('app').factory('getToken', ['$rootScope', '$http', function($rootScope, $http){
// 	return function get(){
// 		// 获取token
//         $http({
//             method: 'GET',
//             url: 'http://beta.open.api.vrseen.net/token/get'
//         }).then(function successCallback(resp) {
//             $rootScope.TokenKey = resp.data.data.TokenKey;
//             $rootScope.TokenValue = resp.data.data.TokenValue;
//             // console.log($rootScope.TokenKey, $rootScope.TokenValue);
//         }, function errorCallback(resp) {
//             console.log('错误', '错！')
//         });
// 	};
// }])

// 返回错误信息
'use strict';
/**
 *  Module
 *
 * Description 获取urls地址
 */
angular.module('app').constant('lan', {
    login: {
        ACCOUNT_NULL: '请输入帐户',
        PASSWORD_NULL: '请输入登录密码',
        USER_NOT_EXIST: '帐户不存在',
        PWD_ERR: '很遗憾，您的密码错误',
        SUCCESS: '登录成功'
    }
})

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

// 获取接口ulr
'use strict';
/**
 *  Module
 *
 * Description 获取urls地址
 */
angular.module('app').constant('urls', {
    BASE_API_V2: 'http://beta.open.api.v2.vrseen.net', 
    BASE_API: 'http://beta.open.api.v2.vrseen.net', 
    USERBASE_API: 'http://beta.passport.api.vrseen.net',
    BBSBASE_API: 'http://beta.bbs.api.vrseen.net',
    HomeWeb: 'http://www.vrseen.com',
    OpenWeb: 'http://beta.open.vrseen.com',
    BBSWeb: 'http://beta.bbs.vrseen.com',
    StoreWeb: 'http://beta.appstore2.web.vrseen.net',
    MStoreWeb: 'http://beta.m.appstore2.web.vrseen.net',
    getTokenAPI: 'http://beta.open.api.vrseen.net'
})
