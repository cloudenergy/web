angular.module('EMAPP').directive('customer', ["$timeout", function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.mouseenter(function() {
                if (element.timer) {
                    $timeout.cancel(element.timer);
                    element.stop();
                    delete element.timer;
                }
                element.animate({
                    right: 0
                }, 100, 'linear');
            }).mouseleave(function() {
                element.timer = $timeout(function() {
                    element.animate({
                        right: -300
                    }, 200, 'linear');
                }, 500);
            });
        }
    };
}]);