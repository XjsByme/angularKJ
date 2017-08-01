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
