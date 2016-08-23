angular.module('EMAPP').config(["$locationProvider", "$urlRouterProvider", "$stateProvider", function($locationProvider, $urlRouterProvider, $stateProvider) {
    /*  HTML5 mode  */
    $locationProvider.html5Mode(true);
    /*  ui-router otherwise  */
    $urlRouterProvider.otherwise(function($injector, $location) {
        $location.url(EMAPP.User.token ? '/dashboard' : '/dashboard/auth/login').replace();
    });
    var static = 'https://static.cloudenergy.me/';
    /*  ui-router setup  */
    $stateProvider.state('auth', {
        url: '/dashboard/auth/:action',
        templateUrl: 'assets/html/login.html?rev=f86da396e5',
        controller: 'EMAPP.login',
        controllerAs: 'self',
        data: {
            title: '用户登录'
        },
        resolve: {
            deps: ["$ocLazyLoad", function($ocLazyLoad) {
                return $ocLazyLoad.load([
                    static + 'libs/angular-md5-0.1.10/angular-md5.min.js',
                    'assets/js/controllers/login.min.js',
                    'assets/js/app.error.min.js'
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
                return $ocLazyLoad.load([
                    'assets/css/dashboard.min.css',
                    static + 'libs/angular-sanitize-1.5.8/angular-sanitize.min.js',
                    'assets/js/controllers/dashboard.min.js',
                    'assets/js/directives/auto-height.min.js',
                    'assets/js/directives/perfect-scrollbar.min.js'
                ]);
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
                    'assets/css/project/main.min.css',
                    static + 'libs/highcharts-4.2.5/highcharts.js',
                    'assets/js/controllers/project/main.min.js',
                    'assets/js/directives/datetimepicker.min.js',
                    'assets/js/directives/highcharts.min.js'
                ]);
            }]
        }
    }).state('dashboard.monitor', {
        url: '/monitor',
        views: {
            'dashboard@dashboard': {
                templateUrl: 'assets/html/project/monitor.html?rev=1536699ad7',
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
                    'assets/css/project/monitor.min.css',
                    static + 'libs/angular-ui-grid-3.2.1/ui-grid.min.css',
                    static + 'libs/angular-ui-grid-3.2.1/ui-grid.min.js',
                    static + 'libs/highcharts-4.2.5/highcharts.js',
                    'assets/js/controllers/project/monitor.min.js',
                    'assets/js/directives/project/monitor.min.js',
                    'assets/js/directives/datetimepicker.min.js',
                    'assets/js/directives/highcharts.min.js',
                    'assets/js/directives/jstree.min.js',
                    'assets/js/directives/flatui-switch.min.js'
                ]);
            }]
        }
    }).state('dashboard.control', {
        url: '/control',
        views: {
            'dashboard@dashboard': {
                templateUrl: 'assets/html/project/control.html?rev=4a3b03534b',
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
                    'assets/css/project/control.min.css',
                    static + 'libs/jshashes-1.0.5/hashes.min.js',
                    'assets/js/controllers/project/control.min.js',
                    'assets/js/directives/project/control.min.js',
                    'assets/js/directives/jstree.min.js',
                    'assets/js/directives/flatui-switch.min.js'
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
                    'assets/css/project/analyze.min.css',
                    static + 'libs/highcharts-4.2.5/highcharts.js',
                    'assets/js/controllers/project/analyze.min.js',
                    'assets/js/directives/project/analyze.min.js',
                    'assets/js/directives/highcharts.min.js',
                    'assets/js/factorys/project/analyze.min.js'
                ]);
            }]
        }
    }).state('dashboard.statistic', {
        url: '/statistic/:tab',
        views: {
            'dashboard@dashboard': {
                templateUrl: 'assets/html/project/statistic.html?rev=74ee267abe',
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
                    'assets/css/project/statistic.min.css',
                    static + 'libs/angular-ui-grid-3.2.1/ui-grid.min.css',
                    static + 'libs/angular-ui-grid-3.2.1/ui-grid.min.js',
                    'assets/js/controllers/project/statistic.min.js',
                    'assets/js/directives/datetimepicker.min.js'
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
                    'assets/css/project/statistic.min.css',
                    static + 'libs/angular-ui-grid-3.2.1/ui-grid.min.css',
                    static + 'libs/angular-ui-grid-3.2.1/ui-grid.min.js',
                    'assets/js/controllers/project/financial.min.js',
                    'assets/js/directives/project/financial.min.js',
                    'assets/js/directives/datetimepicker.min.js',
                    'assets/js/factorys/uuid.min.js'
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