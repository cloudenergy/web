angular.module("EMAPP").directive("monitorSelect",function(){return{restrict:"A",link:function(e,n,t,l){n.select2({dropdownCssClass:"monitor-select2-dropdown-inverse"}).change(function(){e.self.level=this.value,e.self.list()})}}});