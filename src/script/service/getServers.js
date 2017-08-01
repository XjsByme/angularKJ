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
