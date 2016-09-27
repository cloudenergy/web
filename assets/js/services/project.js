angular.module('EMAPP').factory('Project', ["$q", "$api", "$state", "SweetAlert", function ($q, $api, $state, SweetAlert) {
    return function () {
        var deferred = $q.defer();
        $api.project.info({
            id: sessionStorage.projectid || undefined
        }, function (data) {

            data.result = angular.isArray(data.result) && data.result || data.result && [data.result] || [];

            angular.forEach(EMAPP.Project = self.projectData = data.result, function (item) {
                this.push(item._id);
                EMAPP.Project[item._id] = item;
            }, EMAPP.Project.ids = []);

            if (EMAPP.Project.length) {
                deferred.resolve();
            } else {
                delete sessionStorage.projectid;
                SweetAlert.warning('没有可用项目');
                $state.go('auth', {
                    action: 'login'
                });
            }

        });
        return deferred.promise;
    };
}]);