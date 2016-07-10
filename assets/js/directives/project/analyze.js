angular.module('EMAPP').directive('analyzeGroup', function() {
    return {
        restrict: 'A',
        scope: false,
        controller: 'project.analyze.group',
        controllerAs: 'self'
    }
});

angular.module('EMAPP').directive('analyzeBuilding', function() {
    return {
        restrict: 'A',
        scope: false,
        controller: 'project.analyze.building',
        controllerAs: 'self'
    }
});

angular.module('EMAPP').directive('analyzeSocities', function() {
    return {
        restrict: 'A',
        scope: false,
        controller: 'project.analyze.socities',
        controllerAs: 'self'
    }
});