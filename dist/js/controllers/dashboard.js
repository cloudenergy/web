EMAPP.templateCache.put("dist/html/dashboard.html?rev=76232c2d6a",'<div class="app-view-dashboard"><nav class="navbar navbar-default"><div class="pull-left" ng-bind="::self.projectName"></div><div class="pull-right"><div class="btn-group"><span><i class="em em-clock"></i> <span ng-bind="self.timeStr"></span></span></div><div class="btn-group" ng-if="self.projectData.length && self.groupmode"><a href="javascript:void(0)" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">集团项目<span class="caret"></span></a><ul class="dropdown-menu"><li ng-repeat="item in self.projectData"><a target="_blank" ng-href="/dashboard{{item._id}}/main" ng-bind="item.title"></a></li></ul></div><div class="btn-group"><a class="btn btn-primary" target="_blank" href="http://sighttp.qq.com/authd?IDKEY=c7520bcf5154b71353e5f9bbcc742e8f37dab53dc23d63c5"><i class="em em-QQ"></i> <small>QQ客服</small></a></div><div class="btn-group"><a class="btn btn-primary" ng-href="{{::self.adminLink}}"><i class="em em-user"></i> <span ng-bind="::self.userName"></span></a></div><div class="btn-group"><a class="btn btn-primary" href="/dashboard/auth/logout"><i class="em em-exit"></i> <small>退出</small></a></div></div></nav><div class="view-sidebar"><ul class="nav"><li ng-repeat="item in self.menuData" ng-class="{active:self.menuData.active===item.state}"><a ui-sref="{{::item.state}}" title="{{::item.name}}"><i ng-class="::item.icon"></i></a></li></ul></div><div class="view-content" ui-view="dashboard"></div></div>'),EMAPP.register.controller("EMAPP.dashboard",["$scope","$state","$stateParams","$location","$timeout","$filter","$api","$q",function(e,a,t,r,o,n,i,m){var s=this,c=t.projectid,d=o(function P(){s.timeStr=n("date")(new Date,"H:mm:ss"),d=o(P,1e3)});return s.userName=EMAPP.User.user,s.adminLink=/cloudenergy\.me/.test(location.hostname)?"http://admin.cloudenergy.me":"/admin",m.all([angular.isUndefined(EMAPP.User.groupuser)&&i.auth.login(function(e){EMAPP.User=e&&e.result||EMAPP.User||{}}).$promise,i.project.info({id:c||void 0},function(e){e=e&&e.result||[],angular.isArray(e)||(e=[e]),angular.forEach(EMAPP.Project=s.projectData=e,function(e){this.push(e._id),EMAPP.Project[e._id]=e},EMAPP.Project.ids=[])}).$promise]).then(function(){EMAPP.User.groupmode=s.groupmode=a.prev.params&&a.prev.params.projectid?!1:EMAPP.User.groupuser,EMAPP.User.groupmode?(document.title=EMAPP.title=s.projectName="集团平台",s.menuData=[{state:"dashboard.main",name:"首页",icon:"em em-home"},{state:"dashboard.monitor",name:"监控",icon:"em em-camera"},{state:"dashboard.analyze",name:"分析",icon:"em em-analyze"},{state:"dashboard.statistic",name:"统计",icon:"em em-pie-chart"}]):(EMAPP.Project.current=EMAPP.Project[0]||{},document.title=EMAPP.title=s.projectName=EMAPP.Project.current.title||s.projectName,s.menuData=[{state:"dashboard.main",name:"首页",icon:"em em-home"},{state:"dashboard.monitor",name:"监控",icon:"em em-camera"},{state:"dashboard.control",name:"控制",icon:"em em-control"},{state:"dashboard.analyze",name:"分析",icon:"em em-analyze"},{state:"dashboard.statistic",name:"统计",icon:"em em-pie-chart"},{state:"dashboard.financial",name:"财务",icon:"em em-financial"}]),e.$on("$stateChangeSuccess",function(e,a,t,r,o){s.menuData.active=a.name}),e.$on("$destroy",function(){delete EMAPP.Project,o.cancel(d)}),EMAPP.User.token?(a.prev.exist=!1,angular.forEach(s.menuData,function(e){a.prev.state===e.state&&(a.prev.exist=!0)}),a.go(a.prev.exist&&a.prev.state||"dashboard.main",a.prev.params)):a.go("auth",{action:"login"})}),s}]);