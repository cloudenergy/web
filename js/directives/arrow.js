angular.module('EMAPP').directive('customerList', ["$timeout", function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var timer;

            function slideLeft() {
                element.animate({
                    right: 0
                }, 100, 'linear');
            }

            function slideRight() {
                element.animate({
                    right: -300
                }, 200, 'linear');
            }

            element.mouseenter(function() {
                if (timer) {
                    $timeout.cancel(timer);
                    element.stop();
                }
                slideLeft();
            });
            element.mouseleave(function() {
                timer = $timeout(slideRight, 500);
            });
        }
    };
}]);