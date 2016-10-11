angular.module('EMAPP').config(["$locationProvider", "$urlRouterProvider", "$stateProvider", function ($locationProvider, $urlRouterProvider, $stateProvider) {

    // setup router
    var static = 'https://static.cloudenergy.me/';
    $stateProvider.state('auth', {
        url: '/dashboard/auth/:action',
        templateUrl: 'assets/html/login.html?rev=b288df85ce',
        controller: 'EMAPP.login',
        controllerAs: 'self',
        resolve: {
            deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                document.title = '用户登录';
                return $ocLazyLoad.load([
                    static + 'libs/angular-cookies-1.5.8/angular-cookies.min.js',
                    static + 'libs/angular-md5-0.1.10/angular-md5.min.js',
                    'assets/js/controllers/login.min.js?rev=246c3479b0'
                ]);
            }]
        }
    }).state('dashboard', {
        abstract: true,
        url: '/dashboard{projectid}',
        templateUrl: 'assets/html/dashboard.html?rev=af526a1898',
        controller: 'EMAPP.dashboard',
        controllerAs: 'self',
        resolve: {
            deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                document.title = '';
                return $ocLazyLoad.load([
                    'assets/css/dashboard.min.css?rev=b1c237a8e3',
                    static + 'libs/angular-sanitize-1.5.8/angular-sanitize.min.js',
                    'assets/js/controllers/dashboard.min.js?rev=83fe7e3414',
                    'assets/js/services/menu.min.js?rev=d8399f3de8',
                    'assets/js/services/project.min.js?rev=9d5d2754f4',
                    'assets/js/directives/auto-height.min.js?rev=b4be32fd66',
                    'assets/js/directives/perfect-scrollbar.min.js?rev=13e10e101e'
                ]);
            }],
            services: ["$rootScope", "$q", "$state", "deps", "SweetAlert", "MENUCONFIG", "Project", function ($rootScope, $q, $state, deps, SweetAlert, MENUCONFIG, Project) {

                var deferred = $q.defer();

                angular.forEach(MENUCONFIG, function (item) {
                    if (EMAPP.User.groupmode) {
                        item.groupmode && this.push(item);
                    } else {
                        this.push(item);
                    }
                }, $rootScope.menuData = []);

                $state.notfound = true;
                angular.forEach($rootScope.menuData, function (item) {
                    if ($state.prev.state && ~$state.prev.state.indexOf(item.state)) {
                        delete $state.notfound;
                    }
                });

                if ($state.notfound) {
                    delete $state.notfound;
                    deferred.reject();
                    $state.transitionTo('dashboard.main', $state.prev.params);
                } else {
                    Project().then(deferred.resolve, function () {
                        deferred.reject();
                        SweetAlert.warning('没有可用项目');
                    });
                }

                return deferred.promise;

            }]
        }
    }).state('dashboard.main', {
        url: '/main',
        templateUrl: 'assets/html/project/main/view.html?rev=4f6956cb6f',
        controller: 'project.main',
        controllerAs: 'self',
        resolve: {
            deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'assets/css/project/main.min.css?rev=03987690d7',
                    static + 'libs/highcharts-4.2.5/highcharts.js',
                    'assets/js/controllers/project/main.min.js?rev=aef9797e1e',
                    'assets/js/directives/datetimepicker.min.js?rev=cb7d06c81e',
                    'assets/js/directives/highcharts.min.js?rev=b80f880c1a'
                ]);
            }]
        }
    }).state('dashboard.monitor', {
        url: '/monitor',
        templateUrl: 'assets/html/project/monitor.html?rev=20a1c73e13',
        controller: 'project.monitor',
        controllerAs: 'self',
        resolve: {
            deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'assets/css/project/monitor.min.css?rev=30c90b49da',
                    static + 'libs/angular-ui-grid-3.2.1/ui-grid.min.css',
                    static + 'libs/angular-ui-grid-3.2.1/ui-grid.min.js',
                    static + 'libs/highcharts-4.2.5/highcharts.js',
                    'assets/js/controllers/project/monitor.min.js?rev=2a3cd9c3f4',
                    'assets/js/directives/project/monitor.min.js?rev=672ec59014',
                    'assets/js/directives/datetimepicker.min.js?rev=cb7d06c81e',
                    'assets/js/directives/highcharts.min.js?rev=b80f880c1a',
                    'assets/js/directives/jstree.min.js?rev=47846372b7',
                    'assets/js/directives/flatui-switch.min.js?rev=b153aafd1f',
                    'assets/js/directives/customer.min.js?rev=ab552a2840'

                ]);
            }]
        }
    }).state('dashboard.control', {
        url: '/control',
        templateUrl: 'assets/html/project/control.html?rev=58bd1dd1b9',
        controller: 'project.control',
        controllerAs: 'self',
        resolve: {
            deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'assets/css/project/control.min.css?rev=6f54248211',
                    static + 'libs/jshashes-1.0.5/hashes.min.js',
                    'assets/js/controllers/project/control.min.js?rev=e1788b91a5',
                    'assets/js/directives/project/control.min.js?rev=f16fce996e',
                    'assets/js/directives/jstree.min.js?rev=47846372b7',
                    'assets/js/directives/flatui-switch.min.js?rev=b153aafd1f',
                    'assets/js/directives/customer.min.js?rev=ab552a2840'

                ]);
            }]
        }
    }).state('dashboard.analyze', {
        url: '/analyze',
        templateUrl: 'assets/html/project/analyze/view.html?rev=ccfb46bdb6',
        controller: 'project.analyze',
        controllerAs: 'self',
        resolve: {
            deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'assets/css/project/analyze.min.css?rev=84d5ca7ea3',
                    static + 'libs/highcharts-4.2.5/highcharts.js',
                    'assets/js/controllers/project/analyze.min.js?rev=d14c5a2249',
                    'assets/js/directives/project/analyze.min.js?rev=22a74f73f7',
                    'assets/js/directives/highcharts.min.js?rev=b80f880c1a',
                    'assets/js/factories/project/analyze.min.js?rev=fcbf668590'
                ]);
            }]
        }
    }).state('dashboard.statistic', {
        url: '/statistic/:tab',
        templateUrl: 'assets/html/project/statistic.html?rev=74ee267abe',
        controller: 'project.statistic',
        controllerAs: 'self',
        resolve: {
            deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'assets/css/project/statistic.min.css?rev=8f0bb83eec',
                    static + 'libs/angular-ui-grid-3.2.1/ui-grid.min.css',
                    static + 'libs/angular-ui-grid-3.2.1/ui-grid.min.js',
                    'assets/js/controllers/project/statistic.min.js?rev=ff5c870140',
                    'assets/js/directives/datetimepicker.min.js?rev=cb7d06c81e'
                ]);
            }]
        }
    }).state('dashboard.financial', {
        url: '/financial/:tab',
        templateUrl: 'assets/html/project/financial/view.html?rev=54c02b78aa',
        resolve: {
            deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'assets/css/project/statistic.min.css?rev=8f0bb83eec',
                    static + 'libs/angular-ui-grid-3.2.1/ui-grid.min.css',
                    static + 'libs/angular-ui-grid-3.2.1/ui-grid.min.js',
                    'assets/js/controllers/project/financial.min.js?rev=0aa99f34ac',
                    'assets/js/directives/project/financial.min.js?rev=613580cbd1',
                    'assets/js/directives/datetimepicker.min.js?rev=cb7d06c81e',
                    'assets/js/factories/uuid.min.js?rev=cb2874826a'
                ]);
            }]
        }
    });

    // HTML5 mode
    $locationProvider.html5Mode(true);

    // invalid router
    $urlRouterProvider.otherwise(function ($injector, $location) {
        $location.otherwise = true;
    });

}]).run(["$rootScope", "$location", "$state", "User", function ($rootScope, $location, $state, User) {

    //remember prev state
    $state.prev = {};

    $rootScope.$on('$locationChangeSuccess', function (event) {
        if ($location.otherwise) {
            delete $location.otherwise;
            event.preventDefault();
            $state.transitionTo('dashboard.main');
        }
    });

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if (toParams.projectid) {
            sessionStorage.projectid = toParams.projectid;
            delete toParams.projectid;
        }
        if (toState.name === 'auth') {
            delete sessionStorage.projectid;
            delete EMAPP.Project;
            delete EMAPP.User;
        } else {
            $state.prev.state = toState.name;
            $state.prev.params = toParams;
            if (!EMAPP.User) {
                event.preventDefault();
                User().then(function () {
                    $state.transitionTo($state.prev.state, $state.prev.params);
                }, function () {
                    $state.go('auth', {
                        action: 'login'
                    });
                });
            }
        }
    });

}]);