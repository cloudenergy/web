EMAPP.register.directive("financialModal",function(){return{restrict:"A",scope:!1,controller:"project.financial.modal",controllerAs:"self",link:function(e,l,t,n){e.self.autoHeight=175,e.self.modal=e.$parent.self.modalForm,e.self.tabActive=e.self.modal.tab,l.on("shown.bs.modal",function(l){e.self.tabList()}).on("hidden.bs.modal",function(l){delete e.self.modal,delete e.$parent.self.modalForm})}}}),EMAPP.register.directive("financialMain",function(){return{restrict:"A",templateUrl:"dist/html/project/financial/main.html?rev=a0a696550d",controller:"project.financial",controllerAs:"self"}});