EMAPP.register.directive("autoHeight",["$timeout",function(t){return{restrict:"A",scope:{height:"=*autoHeight"},link:function(e,i,n,o){var r=function(){i.height($(window).innerHeight()-i.offset().top-(e.height?parseInt(e.height):15))};e.$watch(function(){return e.height},r),r(),t(r),$(window).on("resize",r),e.$on("$destroy",function(){$(window).off("resize",r)})}}}]);