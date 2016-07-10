angular.module('EMAPP').directive('autoHeight', ["$timeout", function($timeout) {
    return {
        restrict: 'A',
        scope: {
            height: '=*autoHeight'
        },
        link: function(scope, element, attrs, ctrl) {
            function resize() {
                element.height($(window).innerHeight() - element.offset().top - (scope.height ? parseInt(scope.height) : 15));
            }
            scope.$watch(function() {
                return scope.height;
            }, resize);
            resize();
            $timeout(resize);
            $(window).on('resize', resize);
            scope.$on('$destroy', function() {
                $(window).off('resize', resize);
            });
        }
    };
}]);