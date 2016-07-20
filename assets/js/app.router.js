angular.module('EMAPP').config(["$locationProvider", "$urlRouterProvider", "$stateProvider", function($locationProvider, $urlRouterProvider, $stateProvider) {
    /*  HTML5 mode  */
    $locationProvider.html5Mode(true);
    /*  ui-router otherwise  */
    $urlRouterProvider.otherwise(function($injector, $location) {
        $location.url(EMAPP.User.token ? '/dashboard' : '/dashboard/auth/login').replace();
    });
    /*  ui-router setup  */
    $stateProvider.state('auth', {
        url: '/dashboard/auth/:action',
        templateUrl: 'assets/html/login.html?rev=8dd99178c6',
        controller: 'EMAPP.login',
        controllerAs: 'self',
        data: {
            title: '用户登录'
        },
        resolve: {
            deps: ["$ocLazyLoad", function($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'https://static.cloudenergy.me/libs/angular-md5-0.1.10/angular-md5.min.js',
                    'assets/js/controllers/login.min.js?rev=3e34f370d1',
                    'assets/js/app.error.min.js?rev=a582bc0375'
                ]);
            }]
        }
    }).state('dashboard', {
        url: '/dashboard{projectid}',
        templateUrl: 'assets/html/dashboard.html?rev=f648c8840e',
        controller: 'EMAPP.dashboard',
        controllerAs: 'self',
        resolve: {
            deps: ["$ocLazyLoad", function($ocLazyLoad) {
                return $ocLazyLoad.load([{
                    files: ['assets/css/dashboard.min.css?rev=e7afc668f7']
                }, {
                    serie: true,
                    files: [
                        'https://static.cloudenergy.me/libs/moment-2.14.1/min/moment.min.js',
                        'https://static.cloudenergy.me/libs/moment-2.14.1/locale/zh-cn.js'
                    ]
                }, {
                    files: [
                        'https://static.cloudenergy.me/libs/angular-sanitize-1.5.7/angular-sanitize.min.js',
                        'https://static.cloudenergy.me/libs/flat-ui-2.3.0/dist/js/flat-ui.min.js',
                        'assets/js/controllers/dashboard.min.js?rev=a0f6e609e8',
                        'assets/js/directives/auto-height.min.js?rev=b4be32fd66',
                        'assets/js/directives/perfect-scrollbar.min.js?rev=13e10e101e'
                    ]
                }]);
            }]
        }
    }).state('dashboard.main', {
        url: '/main',
        views: {
            'dashboard@dashboard': {
                templateUrl: 'assets/html/project/main/view.html?rev=4f6956cb6f',
                controller: 'project.main',
                controllerAs: 'self'
            }
        },
        data: {
            title: '首页'
        },
        resolve: {
            deps: ["$ocLazyLoad", function($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'assets/css/project/main.min.css?rev=03987690d7',
                    'https://static.cloudenergy.me/libs/highcharts-4.2.5/highcharts.js',
                    'assets/js/controllers/project/main.min.js?rev=aa2eb44794',
                    'assets/js/directives/datetimepicker.min.js?rev=47a49ab0e8',
                    'assets/js/directives/highcharts.min.js?rev=b80f880c1a'
                ]);
            }]
        }
    }).state('dashboard.monitor', {
        url: '/monitor',
        views: {
            'dashboard@dashboard': {
                templateUrl: 'assets/html/project/monitor.html?rev=2678b88f6d',
                controller: 'project.monitor',
                controllerAs: 'self'
            }
        },
        data: {
            title: '设备监控'
        },
        resolve: {
            deps: ["$ocLazyLoad", function($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'assets/css/project/monitor.min.css?rev=30c90b49da',
                    'https://static.cloudenergy.me/libs/angular-ui-grid-3.2.1/ui-grid.min.css',
                    'https://static.cloudenergy.me/libs/angular-ui-grid-3.2.1/ui-grid.min.js',
                    'https://static.cloudenergy.me/libs/highcharts-4.2.5/highcharts.js',
                    'assets/js/controllers/project/monitor.min.js?rev=7a7128e2c1',
                    'assets/js/directives/project/monitor.min.js?rev=672ec59014',
                    'assets/js/directives/datetimepicker.min.js?rev=47a49ab0e8',
                    'assets/js/directives/highcharts.min.js?rev=b80f880c1a',
                    'assets/js/directives/jstree.min.js?rev=47846372b7',
                    'assets/js/directives/flatui-switch.min.js?rev=b153aafd1f'
                ]);
            }]
        }
    }).state('dashboard.control', {
        url: '/control',
        views: {
            'dashboard@dashboard': {
                templateUrl: 'assets/html/project/control.html?rev=736a97f69c',
                controller: 'project.control',
                controllerAs: 'self'
            }
        },
        data: {
            title: '设备控制'
        },
        resolve: {
            deps: ["$ocLazyLoad", function($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'assets/css/project/control.min.css?rev=808070724c',
                    'https://static.cloudenergy.me/libs/jshashes-1.0.5/hashes.min.js',
                    'assets/js/controllers/project/control.min.js?rev=f1c764dd3a',
                    'assets/js/directives/project/control.min.js?rev=5484d64530',
                    'assets/js/directives/jstree.min.js?rev=47846372b7',
                    'assets/js/directives/flatui-switch.min.js?rev=b153aafd1f'
                ]);
            }]
        }
    }).state('dashboard.analyze', {
        url: '/analyze',
        views: {
            'dashboard@dashboard': {
                templateUrl: 'assets/html/project/analyze/view.html?rev=634a03a343',
                controller: 'project.analyze',
                controllerAs: 'self'
            }
        },
        data: {
            title: '能耗分析'
        },
        resolve: {
            deps: ["$ocLazyLoad", function($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'assets/css/project/analyze.min.css?rev=84d5ca7ea3',
                    'https://static.cloudenergy.me/libs/highcharts-4.2.5/highcharts.js',
                    'assets/js/controllers/project/analyze.min.js?rev=945ecbbc5c',
                    'assets/js/directives/project/analyze.min.js?rev=22a74f73f7',
                    'assets/js/directives/highcharts.min.js?rev=b80f880c1a',
                    'assets/js/factorys/project/analyze.min.js?rev=fcbf668590'
                ]);
            }]
        }
    }).state('dashboard.statistic', {
        url: '/statistic/:tab',
        views: {
            'dashboard@dashboard': {
                templateUrl: 'assets/html/project/statistic.html?rev=f406556ea4',
                controller: 'project.statistic',
                controllerAs: 'self'
            }
        },
        data: {
            title: '能耗统计'
        },
        resolve: {
            deps: ["$ocLazyLoad", function($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'assets/css/project/statistic.min.css?rev=8f0bb83eec',
                    'https://static.cloudenergy.me/libs/angular-ui-grid-3.2.1/ui-grid.min.css',
                    'https://static.cloudenergy.me/libs/angular-ui-grid-3.2.1/ui-grid.min.js',
                    'assets/js/controllers/project/statistic.min.js?rev=f78f4ef53f',
                    'assets/js/directives/datetimepicker.min.js?rev=47a49ab0e8'
                ]);
            }]
        }
    }).state('dashboard.financial', {
        url: '/financial/:tab',
        views: {
            'dashboard@dashboard': {
                templateUrl: 'assets/html/project/financial/view.html?rev=54c02b78aa'
            }
        },
        data: {
            title: '财务'
        },
        resolve: {
            deps: ["$ocLazyLoad", function($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'assets/css/project/statistic.min.css?rev=8f0bb83eec',
                    'https://static.cloudenergy.me/libs/angular-ui-grid-3.2.1/ui-grid.min.css',
                    'https://static.cloudenergy.me/libs/angular-ui-grid-3.2.1/ui-grid.min.js',
                    'assets/js/controllers/project/financial.min.js?rev=359d368852',
                    'assets/js/directives/project/financial.min.js?rev=1cb3ad2efd',
                    'assets/js/directives/datetimepicker.min.js?rev=47a49ab0e8',
                    'assets/js/factorys/uuid.min.js?rev=85528f3b0b'
                ]);
            }]
        }
    });
}]).run(["$rootScope", "$cookies", "$state", function($rootScope, $cookies, $state) {

    /*  get cookies  */
    angular.forEach($cookies.getAll(), function(value, key) {
        this[key] = value;
    }, EMAPP.User = {});

    //remember prev state
    $state.prev = {};

    //State Change Events
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

        if (toParams.projectid && !sessionStorage.projectid) {
            sessionStorage.projectid = toParams.projectid;
            delete toParams.projectid;
        }

        if (!EMAPP.User.token) {
            if (toState.name !== 'auth') {
                $state.prev.state = toState.name;
                $state.prev.params = toParams;
                event.preventDefault();
                $state.go('auth', angular.extend(toParams, {
                    action: 'login'
                }));
            }
        } else {

            if (toState.name !== 'dashboard' && toState.name !== 'auth') {
                $state.prev.state = toState.name;
                $state.prev.params = toParams;
                if (!EMAPP.Project) {
                    event.preventDefault();
                    $state.go('dashboard', toParams);
                }
            } else if (toState.name === 'auth') {
                $state.prev.state = fromState.name;
                $state.prev.params = fromParams;
            }

        }

    });
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        (function(title) {
            toState.data && toState.data.title && title.push(toState.data.title);
            EMAPP.title && title.push(EMAPP.title);
            document.title = title.join(' - ');
        }([]));
    });

}]);