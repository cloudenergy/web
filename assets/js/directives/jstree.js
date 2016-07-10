angular.module('EMAPP').directive('jstree', ["$ocLazyLoad", function($ocLazyLoad) {

    var jstreeLoad = $ocLazyLoad.load([{
        insertBefore: '#load_styles_before',
        files: ['https://static.cloudenergy.me/libs/jstree-3.3.1/dist/themes/default/style.min.css']
    }, {
        files: ['https://static.cloudenergy.me/libs/jstree-3.3.1/dist/jstree.min.js']
    }]);

    return {
        restrict: 'A',
        link: function(scope, element, attrs, ctrl) {
            jstreeLoad.then(function() {
                scope.$watch(attrs.jstree, function(options) {
                    element.data('jstree') && element.data('jstree').destroy();
                    element.jstree(options || {});
                    element.watchSearch && element.watchSearch();
                    delete element.watchSearch;
                    if (attrs.jstreeSearch && element.jstree(true).search) {
                        element.watchSearch = scope.$watch(attrs.jstreeSearch, function(value) {
                            element.jstree(true).search(value || '')
                        });
                    }
                });
            })
        }
    }

}]);