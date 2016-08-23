angular.module('EMAPP').directive('financialModal', function() {
    return {
        restrict: 'A',
        scope: false,
        controller: 'project.financial.modal',
        controllerAs: 'self',
        link: function(scope, element, attrs, ctrl) {
            scope.self.autoHeight = 175;
            scope.self.modal = scope.$parent.self.modalForm;
            scope.self.tabActive = scope.self.modal.tab;
            element.on('shown.bs.modal', function(e) {
                scope.self.tabList()
            }).on('hidden.bs.modal', function(e) {
                delete scope.self.modal;
                delete scope.$parent.self.modalForm;
            });
        }
    }
});

angular.module('EMAPP').directive('financialMain', function() {
    return {
        restrict: 'A',
        templateUrl: 'assets/html/project/financial/main.html?rev=353ca07394',
        controller: 'project.financial',
        controllerAs: 'self'
    }
});