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
