angular.module("EMAPP").directive("jstree",["$ocLazyLoad",function(e){var t=e.load([{serie:!0,files:["/vendor/jstree/dist/themes/default/style.min.css?rev=410da5c644","/vendor/jstree/dist/jstree.min.js?rev=8505b45e8c"]}]);return{restrict:"A",link:function(e,r,a,s){t.then(function(){e.$watch(a.jstree,function(t){r.data("jstree")&&r.data("jstree").destroy(),r.jstree(t||{}),r.watchSearch&&r.watchSearch(),delete r.watchSearch,a.jstreeSearch&&r.jstree(!0).search&&(r.watchSearch=e.$watch(a.jstreeSearch,function(e){r.jstree(!0).search(e||"")}))})})}}}]);