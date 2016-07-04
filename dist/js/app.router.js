angular.module("EMAPP").config(["$locationProvider","$urlRouterProvider","$stateProvider",function(t,s,e){t.html5Mode(!0),s.otherwise(function(t,s){s.url(EMAPP.User.token?"/dashboard":"/dashboard/auth/login").replace()}),e.state("auth",{url:"/dashboard/auth/:action",templateUrl:"dist/html/login.html?rev=e7a159f548",controller:"EMAPP.login",controllerAs:"self",data:{title:"用户登录"},resolve:{deps:["$ocLazyLoad",function(t){return t.load(["/vendor/angular-md5/angular-md5.min.js?rev=cf3572fb49","/dist/js/controllers/login.js?rev=eb29a13cf2","/dist/js/app.error.js?rev=1f1d37e098"])}]}}).state("dashboard",{url:"/dashboard{projectid}",templateUrl:"dist/html/dashboard.html?rev=f648c8840e",controller:"EMAPP.dashboard",controllerAs:"self",resolve:{deps:["$ocLazyLoad",function(t){return t.load([{files:["/dist/css/dashboard.css?rev=9d60483129","/vendor/angular-sanitize/angular-sanitize.min.js?rev=830855cd65","/vendor/flat-ui/dist/js/flat-ui.min.js?rev=5b04c4cc1b","/dist/js/directives/auto-height.js?rev=bd177006ca","/dist/js/directives/perfect-scrollbar.js?rev=dff0395355","/dist/js/controllers/dashboard.js?rev=a2037d2e33"]}])}]}}).state("dashboard.main",{url:"/main",views:{"dashboard@dashboard":{templateUrl:"dist/html/project/main/view.html?rev=82aacb45c9",controller:"project.main",controllerAs:"self"}},data:{title:"首页"},resolve:{deps:["$ocLazyLoad",function(t){return t.load(["/dist/css/project/main.css?rev=0dc793aa97","/vendor/highcharts/highcharts.min.js?rev=05794378dd","/dist/js/controllers/project/main.js?rev=11a24e9b3a","/dist/js/directives/datetimepicker.js?rev=24287da343","/dist/js/directives/highcharts.js?rev=7ae18d3fee"])}]}}).state("dashboard.monitor",{url:"/monitor",views:{"dashboard@dashboard":{templateUrl:"dist/html/project/monitor.html?rev=2678b88f6d",controller:"project.monitor",controllerAs:"self"}},data:{title:"设备监控"},resolve:{deps:["$ocLazyLoad",function(t){return t.load(["/dist/css/project/monitor.css?rev=b5d45f4c7f","/vendor/angular-ui-grid/ui-grid.min.css?rev=faba50d0a4","/vendor/angular-ui-grid/ui-grid.min.js?rev=b9e2db6009","/vendor/highcharts/highcharts.min.js?rev=05794378dd","/dist/js/controllers/project/monitor.js?rev=ef447bd20c","/dist/js/directives/project/monitor.js?rev=5b03e7276b","/dist/js/directives/datetimepicker.js?rev=24287da343","/dist/js/directives/highcharts.js?rev=7ae18d3fee","/dist/js/directives/jstree.js?rev=e1de726254","/dist/js/directives/flatui-switch.js?rev=b0e78784a8"])}]}}).state("dashboard.control",{url:"/control",views:{"dashboard@dashboard":{templateUrl:"dist/html/project/control.html?rev=2d6d1629a3",controller:"project.control",controllerAs:"self"}},data:{title:"设备控制"},resolve:{deps:["$ocLazyLoad",function(t){return t.load(["/dist/css/project/control.css?rev=d1577e0d8a","/vendor/jshashes/hashes.min.js?rev=ae639f81fe","/dist/js/controllers/project/control.js?rev=cd3b48f736","/dist/js/directives/project/control.js?rev=b049536730","/dist/js/directives/jstree.js?rev=e1de726254","/dist/js/directives/flatui-switch.js?rev=b0e78784a8"])}]}}).state("dashboard.analyze",{url:"/analyze",views:{"dashboard@dashboard":{templateUrl:"dist/html/project/analyze/view.html?rev=4e8f88f03a",controller:"project.analyze",controllerAs:"self"}},data:{title:"能耗分析"},resolve:{deps:["$ocLazyLoad",function(t){return t.load(["/dist/css/project/analyze.css?rev=129d40f9d1","/vendor/highcharts/highcharts.min.js?rev=05794378dd","/dist/js/controllers/project/analyze.js?rev=32fac8e6cc","/dist/js/directives/project/analyze.js?rev=4d95eb5887","/dist/js/directives/highcharts.js?rev=7ae18d3fee","/dist/js/factorys/project/analyze.js?rev=4ff06d3107"])}]}}).state("dashboard.statistic",{url:"/statistic/:tab",views:{"dashboard@dashboard":{templateUrl:"dist/html/project/statistic.html?rev=24d7cb99f0",controller:"project.statistic",controllerAs:"self"}},data:{title:"能耗统计"},resolve:{deps:["$ocLazyLoad",function(t){return t.load(["/dist/css/project/statistic.css?rev=049e809159","/vendor/angular-ui-grid/ui-grid.min.css?rev=faba50d0a4","/vendor/angular-ui-grid/ui-grid.min.js?rev=b9e2db6009","/dist/js/controllers/project/statistic.js?rev=49f70788d0","/dist/js/directives/datetimepicker.js?rev=24287da343"])}]}}).state("dashboard.financial",{url:"/financial/:tab",views:{"dashboard@dashboard":{templateUrl:"dist/html/project/financial/view.html?rev=f99f6c00b9"}},data:{title:"财务"},resolve:{deps:["$ocLazyLoad",function(t){return t.load(["/dist/css/project/statistic.css?rev=049e809159","/vendor/angular-ui-grid/ui-grid.min.css?rev=faba50d0a4","/vendor/angular-ui-grid/ui-grid.min.js?rev=b9e2db6009","/dist/js/controllers/project/financial.js?rev=e1d5abc53d","/dist/js/directives/project/financial.js?rev=b94472fe1e","/dist/js/directives/datetimepicker.js?rev=24287da343","/dist/js/factorys/uuid.js?rev=98b5ca1afd"])}]}})}]).run(["$rootScope","$cookies","$state",function(t,s,e){angular.forEach(s.getAll(),function(t,s){this[s]=t},EMAPP.User={}),e.prev={},t.$on("$stateChangeStart",function(t,s,r,a,i){EMAPP.User.token?"dashboard"!==s.name&&"auth"!==s.name?(e.prev.state=s.name,e.prev.params=r,EMAPP.Project||(t.preventDefault(),e.go("dashboard",r))):"auth"===s.name&&(e.prev.state=a.name,e.prev.params=i):"auth"!==s.name&&(e.prev.state=s.name,e.prev.params=r,t.preventDefault(),e.go("auth",angular.extend(r,{action:"login"})))}),t.$on("$stateChangeSuccess",function(t,s,e,r,a){!function(t){s.data&&s.data.title&&t.push(s.data.title),EMAPP.title&&t.push(EMAPP.title),document.title=t.join(" - ")}([])})}]);