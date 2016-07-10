angular.module('EMAPP').directive('flatuiSwitch', ["$timeout", function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, ctrl) {
            // scope.$watch(attrs.flatuiSwitch, function(options) {
            $timeout(function() {
                element.bootstrapSwitch()
            });
            // });
            scope.$watch(attrs.flatuiSwitchChange, function(change) {
                change && element.on('switchChange.bootstrapSwitch', function() {
                    $timeout($.proxy(function() {
                        change.apply(change, this)
                    }, arguments))
                })
            });
        }
    }
}]);