angular.module('EMAPP').directive('monitorSelect', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, ctrl) {
            element.select2({
                dropdownCssClass: 'monitor-select2-dropdown-inverse'
            }).change(function() {
                scope.self.level = this.value;
                // scope.self.list();
            });
        }
    }
});