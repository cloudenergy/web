EMAPP.templateCache.put('assets/html/dashboard.html?rev=f648c8840e', '<div class="app-view-dashboard"><nav class="navbar navbar-default"><div class="pull-left" ng-bind="::self.projectName"></div><div class="pull-right"><div class="btn-group"><span><i class="emweb web-clock"></i> <span ng-bind="self.timeStr"></span></span></div><div class="btn-group" ng-if="self.projectData.length && self.groupmode"><a href="javascript:void(0)" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">集团项目<span class="caret"></span></a><ul class="dropdown-menu"><li ng-repeat="item in self.projectData"><a target="_blank" ng-href="/dashboard{{item._id}}/main" ng-bind="item.title"></a></li></ul></div><div class="btn-group"><a class="btn btn-primary" target="_blank" href="http://sighttp.qq.com/authd?IDKEY=c7520bcf5154b71353e5f9bbcc742e8f37dab53dc23d63c5"><i class="emweb web-QQ"></i> <small>QQ客服</small></a></div><div class="btn-group"><a class="btn btn-primary" ng-href="{{::self.adminLink}}"><i class="emweb web-user"></i> <span ng-bind="::self.userName"></span></a></div><div class="btn-group"><a class="btn btn-primary" href="/dashboard/auth/logout"><i class="emweb web-exit"></i> <small>退出</small></a></div></div></nav><div class="view-sidebar"><ul class="nav"><li ng-repeat="item in self.menuData" ng-class="{active:self.menuData.active===item.state}"><a ui-sref="{{::item.state}}" title="{{::item.name}}"><i ng-class="::item.icon"></i></a></li></ul></div><div class="view-content" ui-view="dashboard"></div></div>');

angular.module('EMAPP').controller('EMAPP.dashboard', ["$scope", "$state", "$stateParams", "$location", "$timeout", "$api", "$q", function($scope, $state, $stateParams, $location, $timeout, $api, $q) {

    var self = this,
        projectid = sessionStorage.projectid,
        timeout = $timeout(function nowtime() {
            self.timeStr = moment().format('H:mm:ss');
            timeout = $timeout(nowtime, 1000);
        });

    //EMAPP.Project for cleanup
    $scope.$on('$destroy', function() {
        delete EMAPP.Project;
        $timeout.cancel(timeout);
    });

    self.userName = EMAPP.User.user;
    self.adminLink = /cloudenergy\.me/.test(location.hostname) ? location.origin.replace('pre.', 'preadmin.').replace('www.', 'admin.') : '/admin';

    $q.all([

        //检查权限
        $api.auth.login(function(data) {
            EMAPP.User = data && data.result || EMAPP.User || {};
        }).$promise,

        //获取项目
        $api.project.info({
            id: projectid || undefined
        }, function(data) {
            data.result = angular.isArray(data.result) && data.result || data.result && [data.result] || [];
            angular.forEach(EMAPP.Project = self.projectData = data.result, function(item) {
                this.push(item._id);
                EMAPP.Project[item._id] = item;
            }, EMAPP.Project.ids = []);
        }).$promise

    ]).then(function() {

        if (!EMAPP.Project.length) {
            delete sessionStorage.projectid;
            return;
        }

        if (EMAPP.User.groupmode = self.groupmode = EMAPP.User.groupuser && !projectid) {

            document.title = EMAPP.title = self.projectName = '集团平台';

            self.menuData = [{
                state: 'dashboard.main',
                name: '首页',
                icon: 'emweb web-home'
            }, {
                state: 'dashboard.monitor',
                name: '监控',
                icon: 'emweb web-camera'
            }, {
                state: 'dashboard.analyze',
                name: '分析',
                icon: 'emweb web-analyze'
            }, {
                state: 'dashboard.statistic',
                name: '统计',
                icon: 'emweb web-pie-chart'
            }];

        } else {

            EMAPP.Project.current = EMAPP.Project[0] || {};
            document.title = EMAPP.title = self.projectName = EMAPP.Project.current.title || self.projectName;

            self.menuData = [{
                state: 'dashboard.main',
                name: '首页',
                icon: 'emweb web-home'
            }, {
                state: 'dashboard.monitor',
                name: '监控',
                icon: 'emweb web-camera'
            }, {
                state: 'dashboard.control',
                name: '控制',
                icon: 'emweb web-control'
            }, {
                state: 'dashboard.analyze',
                name: '分析',
                icon: 'emweb web-analyze'
            }, {
                state: 'dashboard.statistic',
                name: '统计',
                icon: 'emweb web-pie-chart'
            }, {
                state: 'dashboard.financial',
                name: '财务',
                icon: 'emweb web-financial'
            }];

        }

        //State Change Events
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            self.menuData.active = toState.name;
        });

        if (EMAPP.User.token) {
            $state.prev.exist = false;
            angular.forEach(self.menuData, function(item) {
                if ($state.prev.state && ~$state.prev.state.indexOf(item.state)) {
                    $state.prev.exist = true;
                }
            });
            $state.go($state.prev.exist && $state.prev.state || 'dashboard.main', $state.prev.params);
        } else {
            $state.go('auth', {
                action: 'login'
            });
        }

    });

}]);