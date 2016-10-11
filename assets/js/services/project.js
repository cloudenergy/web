angular.module('EMAPP').factory('Project', ["$q", "$api", function ($q, $api) {
    return function () {
        var deferred = $q.defer();
        $api.project.info({
            id: sessionStorage.projectid || undefined
        }, function (data) {

            data.result = angular.isArray(data.result) && data.result || data.result && [data.result] || [];

            angular.forEach(EMAPP.Project = data.result, function (item) {
                this.push(item._id);
                EMAPP.Project[item._id] = item;
            }, EMAPP.Project.ids = []);

            if (EMAPP.Project.length) {
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