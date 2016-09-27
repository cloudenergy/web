EMAPP.templateCache.put('assets/html/dashboard.html?rev=af526a1898', '<div class="app-view-dashboard"><nav class="navbar navbar-default"><div class="pull-left" ng-bind="::self.projectName"></div><div class="pull-right"><div class="btn-group"><span><i class="emweb web-clock"></i> <span ng-bind="self.timeStr"></span></span></div><div class="btn-group" ng-if="self.projectData.length && self.groupmode"><a href="javascript:void(0)" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">集团项目<span class="caret"></span></a><ul class="dropdown-menu"><li ng-repeat="item in self.projectData"><a target="_blank" ui-sref="dashboard.main({projectid:item._id})" ng-bind="item.title"></a></li></ul></div><div class="btn-group"><a class="btn btn-primary" target="_blank" href="http://sighttp.qq.com/authd?IDKEY=c7520bcf5154b71353e5f9bbcc742e8f37dab53dc23d63c5"><i class="emweb web-QQ"></i> <small>QQ客服</small></a></div><div class="btn-group"><a class="btn btn-primary" ng-href="{{::self.adminLink}}"><i class="emweb web-user"></i> <span ng-bind="::self.userName"></span></a></div><div class="btn-group"><a class="btn btn-primary" ui-sref="auth({action:\'logout\'})"><i class="emweb web-exit"></i> <small>退出</small></a></div></div></nav><div class="view-sidebar"><ul class="nav"><li ng-repeat="item in self.menuData" ng-class="{active:self.menuData.active===item.state}"><a ui-sref="{{::item.state}}" title="{{::item.name}}"><i ng-class="::item.icon"></i></a></li></ul></div><div class="view-content" ui-view></div></div>');

angular.module('EMAPP').controller('EMAPP.dashboard', ["$rootScope", "$scope", "$state", "$stateParams", "$location", "$timeout", function ($rootScope, $scope, $state, $stateParams, $location, $timeout) {

    var self = this,
        timeout = $timeout(function nowtime() {
            self.timeStr = moment().format('H:mm:ss');
            timeout = $timeout(nowtime, 1000);
        });

    self.menuData = $rootScope.menuData;
    self.projectData = EMAPP.Project;
    self.userName = EMAPP.User.user;
    self.groupmode = EMAPP.User.groupmode;
    self.adminLink = /cloudenergy\.me/.test(location.hostname) ? location.origin.replace('pre.', 'preadmin.').replace('www.', 'admin.').replace('basic.', 'admin.') : '/admin';

    if (self.groupmode) {

        document.title = EMAPP.title = self.projectName = '集团平台';

    } else {

        EMAPP.Project.current = EMAPP.Project[0] || {};

        document.title = EMAPP.title = self.projectName = EMAPP.Project.current.title || self.projectName;

    }

    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        self.menuData.active = toState.name;
    });

    // cleanup
    $scope.$on('$destroy', function () {
        $timeout.cancel(timeout);
        delete EMAPP.Project;
    });

}]);