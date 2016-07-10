angular.module('EMAPP').directive('controlSlider', ["$api", "$timeout", function($api, $timeout) {
    return {
        restrict: 'A',
        scope: {},
        template: function() {
            return [
                '<div class="ui-slider"></div>',
                '<div class="text-left" style="min-width:200px;line-height:24px;">',
                '<span class="text-muted">范围：16 ~ 30<i class="emweb web-degree"></i></span>&nbsp;&nbsp;',
                '<span class="text-primary">当前：{{value+15}}<i class="emweb web-degree"></i></span>',
                '</div>'
            ].join('')
        },
        link: function(scope, element, attrs, ctrl) {
            if (!angular.isUndefined(attrs.command)) {
                scope.$watch(attrs.command, function() {
                    var timer = null,
                        options = angular.extend({
                            min: 1,
                            max: 10,
                            value: 5,
                            orientation: 'horizontal',
                            range: 'min',
                            slide: function(event, ui) {
                                if (scope.value !== ui.value) {
                                    timer && $timeout.cancel(timer);
                                    timer = $timeout(function() {
                                        $api.control.send({
                                            id: attrs.sensorid,
                                            command: attrs.command,
                                            param: {
                                                value: ui.value + 15
                                            }
                                        });
                                    }, 500);
                                    $timeout(function() {
                                        scope.value = ui.value
                                    });
                                }
                            }
                        }, element.data());
                    if (options.value > options.max) {
                        options.value = Math.ceil(options.value % options.max)
                    }
                    scope.value = options.value;
                    element.children('.ui-slider').slider(options);
                });
            }
        }
    }
}]);

angular.module('EMAPP').directive('controlMode', ["$api", function($api) {
    /*
    EMC_MODE: 设置制冷制热模式
    mode:
        EMC_COOLING: 设置制冷
        EMC_HEATING: 设置制热
        EMC_DEHUMIDIFYING: 设置除湿
        EMC_VERTILATING: 设置通风
        EMC_FETCH: 获取冷热模式
    */
    return {
        restrict: 'A',
        scope: {},
        template: function() {
            return [
                '<a href="javascript:void(0)" class="btn btn-sm btn-primary" ng-class="{active:current===1}" ng-click="mode(1)"><i class="emweb web-snow"></i>制冷</a>',
                '<a href="javascript:void(0)" class="btn btn-sm btn-primary" ng-class="{active:current===2}" ng-click="mode(2)"><i class="emweb web-sun"></i>制热</a>',
                '<a href="javascript:void(0)" class="btn btn-sm btn-primary" ng-class="{active:current===3}" ng-click="mode(3)"><i class="emweb web-clear-wet"></i>除湿</a>',
                '<a href="javascript:void(0)" class="btn btn-sm btn-primary" ng-class="{active:current===4}" ng-click="mode(4)"><i class="emweb web-ventilation"></i>通风</a>'
            ].join('')
        },
        link: function(scope, element, attrs, ctrl) {
            if (!angular.isUndefined(attrs.command)) {
                scope.$watch(attrs.command, function() {
                    scope.current = {
                        'EMC_COOLING': 1,
                        'EMC_HEATING': 2,
                        'EMC_DEHUMIDIFYING': 3,
                        'EMC_VERTILATING': 4
                    }[attrs.status] || 0;
                    scope.mode = function(number) {
                        scope.current = number;
                        $api.control.send({
                            id: attrs.sensorid,
                            command: attrs.command,
                            param: {
                                mode: {
                                    1: 'EMC_COOLING',
                                    2: 'EMC_HEATING',
                                    3: 'EMC_DEHUMIDIFYING',
                                    4: 'EMC_VERTILATING'
                                }[number]
                            }
                        });
                    }
                });
            }
        }
    }
}]);

angular.module('EMAPP').directive('controlSpeed', ["$api", function($api) {
    //<i class="emweb web-speed-auto"></i>
    /*
    EMC_WINDSPEED: 风速
    mode:
        EMC_LOW: 低档风速
        EMC_MEDIUM: 中档风速
        EMC_HIGH: 高档风速
        EM_FETCH: 获取风速
    */
    return {
        restrict: 'A',
        scope: {},
        template: function() {
            return [
                '<i class="emweb web-speed-three" ng-class="{active:current===3}" ng-click="speed(3)"></i>',
                '<i class="emweb web-speed-four" ng-class="{active:current===4}" ng-click="speed(4)"></i>',
                '<i class="emweb web-speed-five" ng-class="{active:current===5}" ng-click="speed(5)"></i>'
            ].join('')
        },
        link: function(scope, element, attrs, ctrl) {
            if (!angular.isUndefined(attrs.command)) {
                scope.$watch(attrs.command, function() {
                    scope.current = 0;
                    scope.speed = function(number) {
                        scope.current = number;
                        $api.control.send({
                            id: attrs.sensorid,
                            command: attrs.command,
                            param: {
                                mode: {
                                    3: 'EMC_LOW',
                                    4: 'EMC_MEDIUM',
                                    5: 'EMC_HIGH'
                                }[number]
                            }
                        });
                    }
                });
            }
        }
    }
}]);

angular.module('EMAPP').directive('controlSwitch', ["$api", "$timeout", "SweetAlert", function($api, $timeout, SweetAlert) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, ctrl) {
            if (!angular.isUndefined(attrs.ngChecked)) {
                element.bootstrapSwitch('disabled', true);
                scope.$watch(attrs.ngChecked, function(enable) {
                    $timeout(function(bool) {
                        bool = true;
                        attrs.command && element
                            .bootstrapSwitch('disabled', false)
                            .bootstrapSwitch('state', enable)
                            .on('switchChange.bootstrapSwitch', function(event, state) {
                                $timeout(function() {
                                    if (attrs.command === 'EMC_SWITCH') {
                                        bool && SweetAlert.swal({
                                            title: '控制校验',
                                            text: '',
                                            type: 'input',
                                            inputPlaceholder: '控制密码',
                                            animation: 'slide-from-top',
                                            closeOnConfirm: false,
                                            showCancelButton: true,
                                            showLoaderOnConfirm: true,
                                            cancelButtonText: '取消',
                                            confirmButtonText: '确定'
                                        }, function(inputValue) {

                                            if (inputValue === false) {
                                                bool = false;
                                                element.bootstrapSwitch('toggleState');
                                                $timeout(function() {
                                                    bool = true
                                                });
                                                return false;
                                            }

                                            if (inputValue === '') {
                                                SweetAlert.swal.showInputError('请输入控制密码');
                                                return false;
                                            }

                                            $api.control.send({
                                                id: attrs.sensorid,
                                                command: attrs.command,
                                                param: {
                                                    mode: state ? attrs.onValue : attrs.offValue
                                                },
                                                ctrlcode: (new Hashes.SHA1).hex(inputValue).toUpperCase()
                                            }, function(data) {
                                                if (data.code === 0) {
                                                    SweetAlert.success('操作成功！')
                                                } else {
                                                    SweetAlert.swal({
                                                        title: '控制密码校验失败！',
                                                        text: '',
                                                        type: 'error',
                                                        confirmButtonText: '关闭'
                                                    }, function() {
                                                        bool = false;
                                                        element.bootstrapSwitch('toggleState');
                                                        $timeout(function() {
                                                            bool = true
                                                        });
                                                    })
                                                }
                                            });

                                        })
                                    } else {
                                        $api.control.send({
                                            id: attrs.sensorid,
                                            command: attrs.command,
                                            param: {
                                                mode: state ? attrs.onValue : attrs.offValue
                                            }
                                        })
                                    }
                                })
                            });
                    })
                });
            } else {
                element.bootstrapSwitch()
            }
        }
    }
}]);