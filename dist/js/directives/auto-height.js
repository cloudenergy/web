angular.module("EMAPP").directive("autoHeight",["$timeout",function(t){return{restrict:"A",scope:{height:"=*autoHeight"},link:function(e,i,n,o){var h=function(){i.height($(window).innerHeight()-i.offset().top-(e.height?parseInt(e.height):15))};e.$watch(function(){return e.height},h),h(),t(h),$(window).on("resize",h),e.$on("$destroy",function(){$(window).off("resize",h)})}}}]);