angular.module("EMAPP").directive("flatuiSwitch",["$timeout",function(t){return{restrict:"A",link:function(i,n,c,o){t(function(){n.bootstrapSwitch()}),i.$watch(c.flatuiSwitchChange,function(i){i&&n.on("switchChange.bootstrapSwitch",function(){t($.proxy(function(){i.apply(i,this)},arguments))})})}}}]);