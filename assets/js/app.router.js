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
        templateUrl: 'assets/html/login.html?rev=b288df85ce',
        controller: 'EMAPP.login',
        controllerAs: 'self',
        data: {
            title: '用户登录'
        },
        resolve: {
            deps: ["$ocLazyLoad", function($ocLazyLoad) {
                return $ocLazyLoad.load([
                    static + 'libs/angular-md5-0.1.10/angular-md5.min.js',
                    'assets/js/controllers/login.min.js?rev=facfc0ecc0',
                    'assets/js/app.error.min.js?rev=a582bc0375'
                ]);
            }]
        }
    }).state('dashboard', {
        url: '/dashboard{projectid}',
        templateUrl: 'assets/html/dashboard.html?rev=af526a1898',
        controller: 'EMAPP.dashboard',
        controllerAs: 'self',
        resolve: {
            deps: ["$ocLazyLoad", function($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'assets/css/dashboard.min.css?rev=b1c237a8e3',
                    static + 'libs/angular-sanitize-1.5.8/angular-sanitize.min.js',
                    'assets/js/controllers/dashboard.min.js?rev=d09379fbb0',
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
        data: {
            title: '首页'
        },
        resolve: {
            deps: ["$ocLazyLoad", function($ocLazyLoad) {
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
        templateUrl: 'assets/html/project/monitor.html?rev=7a409d1cb9',
        controller: 'project.monitor',
        controllerAs: 'self',
        data: {
            title: '设备监控'
        },
        resolve: {
            deps: ["$ocLazyLoad", function($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'assets/css/project/monitor.min.css?rev=30c90b49da',
                    static + 'libs/angular-ui-grid-3.2.1/ui-grid.min.css',
                    static + 'libs/angular-ui-grid-3.2.1/ui-grid.min.js',
                    static + 'libs/highcharts-4.2.5/highcharts.js',
                    'assets/js/controllers/project/monitor.min.js?rev=b190dcf012',
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
        templateUrl: 'assets/html/project/control.html?rev=6024eb0b83',
        controller: 'project.control',
        controllerAs: 'self',
        data: {
            title: '设备控制'
        },
        resolve: {
            deps: ["$ocLazyLoad", function($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'assets/css/project/control.min.css?rev=808070724c',
                    static + 'libs/jshashes-1.0.5/hashes.min.js',
                    'assets/js/controllers/project/control.min.js?rev=b26c47d76f',
                    'assets/js/directives/project/control.min.js?rev=5484d64530',
                    'assets/js/directives/jstree.min.js?rev=47846372b7',
                    'assets/js/directives/flatui-switch.min.js?rev=b153aafd1f',
                    'assets/js/directives/customer.min.js?rev=ab552a2840'

                ]);
            }]
        }
    }).state('dashboard.analyze', {
        url: '/analyze',
        templateUrl: 'assets/html/project/analyze/view.html?rev=634a03a343',
        controller: 'project.analyze',
        controllerAs: 'self',
        data: {
            title: '能耗分析'
        },
        resolve: {
            deps: ["$ocLazyLoad", function($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'assets/css/project/analyze.min.css?rev=84d5ca7ea3',
                    static + 'libs/highcharts-4.2.5/highcharts.js',
                    'assets/js/controllers/project/analyze.min.js?rev=945ecbbc5c',
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
        data: {
            title: '能耗统计'
        },
        resolve: {
            deps: ["$ocLazyLoad", function($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'assets/css/project/statistic.min.css?rev=8f0bb83eec',
                    static + 'libs/angular-ui-grid-3.2.1/ui-grid.min.css',
                    static + 'libs/angular-ui-grid-3.2.1/ui-grid.min.js',
                    'assets/js/controllers/project/statistic.min.js?rev=30cd74c8ef',
                    'assets/js/directives/datetimepicker.min.js?rev=cb7d06c81e'
                ]);
            }]
        }
    }).state('dashboard.financial', {
        url: '/financial/:tab',
        templateUrl: 'assets/html/project/financial/view.html?rev=54c02b78aa',
        data: {
            title: '财务'
        },
        resolve: {
            deps: ["$ocLazyLoad", function($ocLazyLoad) {
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