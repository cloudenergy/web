EMAPP.register.directive("monitorSwitch",["$timeout",function(t){return{restrict:"A",link:function(i,n,e,o){t(function(){n.bootstrapSwitch()}),i.$watch(e.monitorSwitchChange,function(t){t&&n.on("switchChange.bootstrapSwitch",function(){t.apply(this,arguments)})})}}}]),EMAPP.register.directive("monitorSelect",function(){return{restrict:"A",link:function(t,i,n,e){i.select2({dropdownCssClass:"monitor-select2-dropdown-inverse"}).change(function(){t.self.level=this.value,t.self.list()})}}});