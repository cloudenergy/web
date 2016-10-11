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

    $scope.$on('$destroy', function () {
        $timeout.cancel(timeout);
    });

}]);