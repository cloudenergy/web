angular.module('EMAPP').factory('User', ["$q", "$api", "$state", "SweetAlert", function ($q, $api, $state, SweetAlert) {
    return function () {
        var deferred = $q.defer();
        $api.auth.login(function (data) {
            EMAPP.User = data && data.result || EMAPP.User || {};
            EMAPP.User.groupmode = EMAPP.User.groupuser && !sessionStorage.projectid;
            deferred.resolve();
        }, function () {
            SweetAlert.warning('请重新登录');
            deferred.reject();
        });
        return deferred.promise;
    };
}]);