angular.module("EMAPP").directive("monitorSelect",function(){return{restrict:"A",link:function(e,n,t,o){n.select2({dropdownCssClass:"monitor-select2-dropdown-inverse"}).change(function(){e.self.level=this.value})}}});