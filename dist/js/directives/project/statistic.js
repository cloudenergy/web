EMAPP.register.directive("statisticAutoHeight",function(){return{restrict:"A",link:function(i,t,n,e){var o=function(){t.height($(window).height()-t.offset().top-20)};o(),$(window).bind("resize",o),i.$on("$destroy",function(){$(window).unbind("resize",o)})}}});