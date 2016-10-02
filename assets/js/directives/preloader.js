/*
 * preloader - loading indicator directive
 */
angular.module('EMAPP').directive('preloader', ["$rootScope", "$timeout", function ($rootScope, $timeout) {
    return {
        restrict: 'A',
        scope: true,
        link: function (scope) {
            scope.$watch(function () {
                return $rootScope._request_count;
            }, function (val) {
                scope._timeout && $timeout.cancel(scope._timeout);
                delete scope._timeout;
                if (val === 0) {
                    scope._timeout = $timeout(function () {
                        scope.preloader = val;
                    }, 10);
                } else {
                    scope.preloader = val;
                }
            });
        }
    };
}]);