window.EMAPP = angular.module('EMAPP', ['ngCookies', 'ngResource', 'ui.router', 'oc.lazyLoad'])

.run(["$templateCache", function($templateCache) {
    /*  public $templateCache  */
    EMAPP.templateCache = $templateCache;
}]);

/*  angular rendering  */
angular.element(document).ready(function() {
    angular.element(document.body).html('<div preloader class="preloader" ng-show="preloader"></div><div ui-view></div>');
    angular.bootstrap(document, ['EMAPP']);
});