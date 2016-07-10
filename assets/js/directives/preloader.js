'use strict';
/*
 * preloader - loading indicator directive
 */
(function(count, timeout) {
    angular.module('EMAPP').config(["$httpProvider", function($httpProvider) {
        /*  register the interceptor via an anonymous factory  */
        $httpProvider.interceptors.push(["$q", "$location", "SweetAlert", function($q, $location, SweetAlert) {
            var response = function(result) {
                count--;
                if (result.data) {
                    if (result.data.code === 90000005) {
                        $location.url('/dashboard/auth/logout').replace();
                    } else {
                        result.data.message && SweetAlert[result.status === 200 ? 'success' : 'error'](result.data.message);
                    }
                }
                return result.status === 200 ? result : $q.reject(result);
            };
            return {
                request: function(request) {
                    if (request.url && /\/api\//i.test(request.url) && request.method) {
                        delete(request.data || request.params || {})._api_action;
                        request.url = decodeURIComponent(request.url);
                    }
                    count++;
                    return request;
                },
                requestError: function(request) {
                    return $q.reject(request);
                },
                response: response,
                responseError: response
            };
        }]);
    }]).directive('preloader', ["$timeout", function($timeout) {
        return {
            restrict: 'A',
            scope: true,
            link: function(scope) {
                scope.$watch(function() {
                    return count
                }, function(val) {
                    timeout && $timeout.cancel(timeout);
                    if (val === 0) {
                        timeout = $timeout(function() {
                            scope.preloader = val
                        }, 10);
                    } else {
                        scope.preloader = val
                    }
                })
            }
        };
    }])
}(0));