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
