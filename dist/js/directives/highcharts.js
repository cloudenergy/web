EMAPP.register.directive("highcharts",[function(){return{restrict:"EA",link:function(t,e,i,r){var n=t.$watch(i.highcharts||i.config,function(t){Highcharts.setOptions({global:{useUTC:!1},lang:{shortMonths:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],weekdays:["周日","周一","周二","周三","周四","周五","周六"],resetZoom:"重置范围",resetZoomTitle:"重围显示范围1:1大小"},credits:{enabled:!1}}),t&&e.highcharts(t)});t.$on("$destroy",function(){n()})}}}]);