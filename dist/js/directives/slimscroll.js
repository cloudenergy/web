angular.module("EMAPP").directive("slimscroll",["$q","$ocLazyLoad",function(l,r){var o=[r.load("/vendor/slimScroll/jquery.slimscroll.min.js?rev=b35cf0acb6")];return{restrict:"A",link:function(r,c,i,n){var e=l.defer(),s={};r.$watch(i.slimscroll,function(l){e.resolve(s=l||{})}),l.all(o.concat([e.promise])).then(function(){c.slimScroll(s)})}}}]);