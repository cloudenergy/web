angular.module('EMAPP').factory('User', ["$q", "$api", function ($q, $api) {
    return function () {
        var deferred = $q.defer();
        $api.auth.login(function (data) {
            EMAPP.User = data.result || EMAPP.User || {};
            EMAPP.User.groupmode = EMAPP.User.groupuser && !sessionStorage.projectid;
            if (EMAPP.User.token) {
                deferred.resolve();
            } else {
                deferred.reject();
            }
        }, function () {
            deferred.reject();
        });
        return deferred.promise;
    };
}]);