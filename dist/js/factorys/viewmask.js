EMAPP.factory("viewMask",["$timeout",function(n){var s=0,i=angular.element(document.body).append('<div class="view-mask"><div class="progress"><div class="progress-bar progress-bar-striped active" style="width:100%"></div></div></div>').children(".view-mask"),e=function(e,a,o){a?(s++,i.css({display:"block"})):(o?s=0:s--,0>=s&&i.css({display:"none"})),n(e||angular.noop)};return{open:function(){e(arguments[0],!0)},close:function(){var s,i;arguments[0]instanceof Function?(s=arguments[0],i=arguments[1]):(s=null,i=arguments[0]),n(function(){e(s,!1,i)},200)}}}]);