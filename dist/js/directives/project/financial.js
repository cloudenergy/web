angular.module("EMAPP").directive("financialModal",function(){return{restrict:"A",scope:!1,controller:"project.financial.modal",controllerAs:"self",link:function(l,e,n,t){l.self.autoHeight=175,l.self.modal=l.$parent.self.modalForm,l.self.tabActive=l.self.modal.tab,e.on("shown.bs.modal",function(e){l.self.tabList()}).on("hidden.bs.modal",function(e){delete l.self.modal,delete l.$parent.self.modalForm})}}}),angular.module("EMAPP").directive("financialMain",function(){return{restrict:"A",templateUrl:"dist/html/project/financial/main.html?rev=85932d4ce4",controller:"project.financial",controllerAs:"self"}});