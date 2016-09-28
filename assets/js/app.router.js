angular.module('EMAPP').config(["$locationProvider", "$urlRouterProvider", "$stateProvider", function ($locationProvider, $urlRouterProvider, $stateProvider) {
    /*  HTML5 mode  */
    $locationProvider.html5Mode(true);
    // For unmatched routes
    $urlRouterProvider.otherwise('/dashboard/main');
    /*  ui-router setup  */
    var static = 'https://static.cloudenergy.me/';
    $stateProvider.state('unmatched', {
        url: '/',
        controller: ["$state", function ($state) {
            $state.go($state.prev.state || 'dashboard.main', $state.prev.params);
        }]
    }).state('auth', {
        url: '/dashboard/auth/:action',
        templateUrl: 'assets/html/login.html?rev=b288df85ce',
        controller: 'EMAPP.login',
        controllerAs: 'self',
        resolve: {
            deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                document.title = '用户登录';
                return $ocLazyLoad.load([
                    static + 'libs/angular-md5-0.1.10/angular-md5.min.js',
                    'assets/js/controllers/login.min.js?rev=edf8dd3785'
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
                    'assets/js/controllers/dashboard.min.js?rev=df12b9a0c4',
                    'assets/js/directives/auto-height.min.js?rev=b4be32fd66',
                    'assets/js/directives/perfect-scrollbar.min.js?rev=13e10e101e'
                ]);
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
                    'assets/js/controllers/project/main.min.js?rev=aa2eb44794',
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
                    'assets/js/controllers/project/monitor.min.js?rev=c21875d589',
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
        templateUrl: 'assets/html/project/control.html?rev=ed807e775d',
        controller: 'project.control',
        controllerAs: 'self',
        resolve: {
            deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'assets/css/project/control.min.css?rev=808070724c',
                    static + 'libs/jshashes-1.0.5/hashes.min.js',
                    'assets/js/controllers/project/control.min.js?rev=4bab37791e',
                    'assets/js/directives/project/control.min.js?rev=5484d64530',
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
                    'assets/js/controllers/project/analyze.min.js?rev=a08fb04069',
                    'assets/js/directives/project/analyze.min.js?rev=22a74f73f7',
                    'assets/js/directives/highcharts.min.js?rev=b80f880c1a',
                    'assets/js/factorys/project/analyze.min.js?rev=fcbf668590'
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
                    'assets/js/controllers/project/statistic.min.js?rev=6e2a2964aa',
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
                    'assets/js/controllers/project/financial.min.js?rev=e255b2038b',
                    'assets/js/directives/project/financial.min.js?rev=613580cbd1',
                    'assets/js/directives/datetimepicker.min.js?rev=cb7d06c81e',
                    'assets/js/factorys/uuid.min.js?rev=cb2874826a'
                ]);
            }]
        }
    });
}]).run(["$rootScope", "$cookies", "$q", "$state", "MENUCONFIG", "User", "Project", function ($rootScope, $cookies, $q, $state, MENUCONFIG, User, Project) {

    /*  get cookies  */
    angular.forEach($cookies.getAll(), function (value, key) {
        this[key] = value;
    }, EMAPP.User = {});

    //remember prev state
    $state.prev = {};

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if (toParams.projectid && !sessionStorage.projectid) {
            sessionStorage.projectid = toParams.projectid;
            delete toParams.projectid;
        }
        if (toState.name === 'auth') {
            delete sessionStorage.projectid;
        } else {
            $state.prev.state = toState.name;
            $state.prev.params = toParams;
            if (EMAPP.User.token) {
                if (!EMAPP.Project) {
                    event.preventDefault();
                    $q.all([angular.isDefined(EMAPP.User.groupmode) || User(), Project()]).then(function () {

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
                            $state.go('dashboard.main', $state.prev.params);
                        } else {
                            $state.go($state.prev.state || 'dashboard.main', $state.prev.params);
                        }

                    }, function () {
                        $state.go('auth', {
                            action: 'login'
                        });
                    });
                }
            } else {
                event.preventDefault();
                $state.go('auth', {
                    action: 'login'
                });
            }
        }
    });

}]);