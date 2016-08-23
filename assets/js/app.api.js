angular.module('EMAPP').config(["$provide", function($provide) {

    var APICONFIG = {
        auth: ['auth', , {
            login: {},
            logout: {}
        }],
        project: ['project', , {
            info: {}
        }],
        business: ['business', , {

            //////首页//////
            //日历
            calendar: {
                cache: true
            },
            //今日费用
            dailycost: {},
            //总能耗
            monthlykgce: {},
            //水电气构成
            energyconstitute: {},
            //能耗细分
            dailysensordetail: {},
            //能效比曲线
            energyeffectiverate: {},
            //节能星级
            projectdetail: {},

            //////监控//////
            //监控数据
            monitor: {},
            //曲线数据
            channeldetail: {},

            //////分析//////
            //建筑=>建筑能耗收入
            buildingstatistic: {},
            //建筑=>能耗收入比
            energyincomerate: {},
            //建筑=>能耗实时曲线图
            energytimeline: {},
            //社会属性=>社会属性能耗收入
            socitystatistic: {},
            //社会属性=>能耗收入比
            socitydetail: {},
            //社会属性=>能耗实时曲线图
            socitytimeline: {},
            //集团分析
            groupanalysis: {},

            //////统计//////
            //结算报表
            settlereport: {},
            //月能耗报表
            monthlyreport: {},
            //日能耗报表
            dailyreport: {},
            //集团统计报表
            projectreport: {},

            //////财务//////
            //最近充值
            recentchargelog: {},
            //商户信息
            departments: {},
            //消费清单
            departmentusage: {}

        }],
        //能耗分类
        energy: ['energy', , {
            info: {
                cache: true
            }
        }],
        //传感器
        control: ['control', , {
            send: {}
        }],
        //设备接口
        device: ['device', , {
            type: {
                cache: true
            }
        }],
        //消息推送
        message: ['message', , {
            //催缴欠费
            arreargereminder: {}
        }],
        //社会属性
        customer: ['customer', , {
            //查询
            info: {}
        }]
    };

    /* api service
     * $resource(url, [paramDefaults], [actions], options);
     * usage:
     *      $api.name1.action([parameters], [success], [error])
     *      $api.name2.action([parameters], postData, [success], [error])
     */
    $provide.service('$api', ["$rootScope", "$resource", "$location", "$state", function($rootScope, $resource, $location, $state) {

        // 自动补全URL
        function fullUrl(url, bool) {
            return /(^http:\/\/)|(^https:\/\/)/.test(url) && url || [
                // location.protocol, '//',
                // location.host,
                localStorage.testapi && '/testapi/' || '/api/',
                url,
                bool && '/:_api_action' || ''
            ].join('');
        }
        // 获取参数
        function requestData(data) {
            return angular.isArray(this) && {
                parameters: !angular.isFunction(arguments[0]) && arguments[0] || undefined,
                postData: !angular.isFunction(arguments[1]) && arguments[1] || undefined
            } || {
                parameters: !angular.isFunction(data.parameters) && data.parameters || undefined,
                postData: !angular.isFunction(data.postData) && data.postData || undefined
            };
        }
        // 取消请求
        function cancelRequest(key) {
            angular.forEach($rootScope._api_request[key], function(item, key) {
                item.request.$cancelRequest();
            });
            delete $rootScope._api_request[key];
        }

        // 设置API请求缓存参数
        $rootScope._api_request = {};

        // 监听路由变动，即时取消上一次路由中的API请求
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            toState.name !== fromState.name && cancelRequest(fromState._URL);
        });
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            $location.url() !== fromState._URL && cancelRequest(fromState._URL);
        });

        angular.forEach(APICONFIG, function(config, name) {
            if (angular.isArray(config) && config[0]) {
                config[0] = fullUrl(config[0], !!config[2]);
                config[3] = angular.extend({}, {
                    // 默认可取消
                    cancellable: true
                }, config[3]);
                angular.forEach(config[2], function(action, name) {
                    angular.extend(action, {
                        url: action.url && fullUrl(action.url) || undefined,
                        method: action.method || 'POST',
                        params: angular.extend(action.url && {} || {
                            _api_action: name
                        }, action.params)
                    });
                });
                angular.forEach(this[name] = $resource.apply($resource, config), function(fn, action, request, cancellable) {
                    this[action] = function() {
                        if (cancellable = angular.isObject(arguments[0]) && arguments[0].cancellable) {
                            delete arguments[0].cancellable;
                        }
                        request = fn.apply(this, arguments);
                        // 若改请求已设置取消请求的参数，则将该请求缓存到变量中，
                        // 便于下一次路由触发后取消该次未完成的API请求
                        if (request.$cancelRequest) {
                            $state.current._URL = $location.url();
                            $rootScope._api_request[$state.current._URL] = $rootScope._api_request[$state.current._URL] || {};
                            (function(origin, current) {
                                if (origin) {
                                    if (cancellable || angular.equals(current, requestData.call({}, origin))) {
                                        if (!origin.request.$resolved) {
                                            origin.request.$cancelRequest();
                                            !cancellable && console.warn('duplicate request:', localStorage.testapi && 'testapi' || 'api', '/', name, '/', action);
                                        }
                                    } else {
                                        $rootScope._api_request[$state.current._URL][name + '_' + action + '_' + Date.now()] = origin;
                                        // console.info('multiple request:', localStorage.testapi && 'testapi' || 'api', '/', name, '/', action);
                                    }
                                }
                            }($rootScope._api_request[$state.current._URL][name + '_' + action + '_recently'], requestData.apply([], arguments)));
                            $rootScope._api_request[$state.current._URL][name + '_' + action + '_recently'] = angular.extend({
                                request: request
                            }, requestData.apply([], arguments));
                        }
                        return request;
                    };
                }, this[name]);
            }
        }, this);

    }]);

}]);