window.EMAPP = angular.module('EMAPP', ['ngCookies', 'ngResource', 'ui.router', 'oc.lazyLoad']).run(["$templateCache", function ($templateCache) {
    /*  public $templateCache  */
    EMAPP.templateCache = $templateCache;
    /*  bind focus class to .form-control  */
    $(document.body).on('focus', '.form-group > input.form-control, .input-group > input.form-control', function () {
        $(this).closest('.input-group, .form-group').addClass('focus');
    }).on('blur', '.form-group > input.form-control, .input-group > input.form-control', function () {
        $(this).closest('.input-group, .form-group').removeClass('focus');
    });
}]);

/*  angular rendering  */
angular.element(document).ready(function () {
    angular.element(document.body).html('<div preloader class="preloader" ng-show="preloader"></div><div ui-view></div>');
    angular.bootstrap(document, ['EMAPP']);
});