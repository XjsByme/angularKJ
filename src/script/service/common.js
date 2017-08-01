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
