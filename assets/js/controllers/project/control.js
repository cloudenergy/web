EMAPP.templateCache.put('assets/html/project/control.html?rev=6024eb0b83', '<div class="app-view-project-control text-center ng-cloak"><div class="nav nav-tabs"><div class="btn-group"><a href="javascript:void(0)" class="btn btn-sm btn-primary" ng-class="{active:self.deviceType.selected.id===item.id}" ng-repeat="item in self.deviceType" ng-click="self.deviceType.select(item)" ng-bind="item.name"></a></div></div><div class="tab-content row"><div class="tab-pane active col-xs-12"><div class="relative nowrap overflow-hidden" auto-height="25" perfect-scrollbar="self.monitorData.length" perfect-scrollbar-event="{\'ps-scroll-down\':self.paging.flow}"><table class="table table-hover table-bordered" ng-if="self.deviceType.selected.id===\'ENERGYMETER\'"><tr><th class="text-center" style="width:50px">序号</th><th style="width:15%">传感器</th><th style="width:100px">开关</th><th style="width:87px">供水温度</th><th style="width:87px">回水温度</th><th style="width:87px">温差</th><th>流量</th><th>流速</th><th>总冷量</th><th>总热量</th></tr><tr ng-repeat="item in self.monitorData"><td style="text-align:center" ng-bind="$index+1"></td><td ng-bind="item.title"></td><td class="bootstrap-switch-square"><input type="checkbox" control-switch data-on-color="info" data-on-text="制冷" data-on-value="EMC_COOLING" data-off-color="danger" data-off-text="制热" data-off-value="EMC_HEATING" data-command="{{(item.command|filter:\'EMC_MODE\').join()}}" data-sensorid="{{item.id}}" ng-checked="item.status.mode===\'EMC_COOLING\'"></td><td><div class="form-group form-group-sm has-feedback focus"><span class="form-control text-right" ng-bind="item.channels[\'05\'].lasttotal"></span> <span class="form-control-feedback"><i class="emweb web-degree"></i></span></div></td><td><div class="form-group form-group-sm has-feedback focus"><span class="form-control text-right" ng-bind="item.channels[\'06\'].lasttotal"></span> <span class="form-control-feedback"><i class="emweb web-degree"></i></span></div></td><td><div class="form-group form-group-sm has-feedback focus"><span class="form-control text-right" ng-bind="(item.channels[\'05\'].lasttotal>item.channels[\'06\'].lasttotal?item.channels[\'05\'].lasttotal-item.channels[\'06\'].lasttotal:item.channels[\'06\'].lasttotal-item.channels[\'05\'].lasttotal).toFixed(2)"></span> <span class="form-control-feedback"><i class="emweb web-degree"></i></span></div></td><td><div class="form-group form-group-sm has-feedback"><span class="form-control text-right" ng-bind="item.channels[\'04\'].lasttotal"></span> <span class="form-control-feedback">KWh</span></div></td><td><div class="form-group form-group-sm has-feedback"><span class="form-control text-right" ng-bind="item.channels[\'09\'].lasttotal"></span> <span class="form-control-feedback">KWh</span></div></td><td><div class="form-group form-group-sm has-feedback"><span class="form-control text-right" ng-bind="item.channels[\'07\'].lasttotal"></span> <span class="form-control-feedback">KWh</span></div></td><td><div class="form-group form-group-sm has-feedback"><span class="form-control text-right" ng-bind="item.channels[\'08\'].lasttotal"></span> <span class="form-control-feedback">KWh</span></div></td></tr></table><table class="table table-hover table-bordered" ng-if="self.deviceType.selected.id===\'COLDWATERMETER\'"><tr><th class="text-center" style="width:50px">序号</th><th style="width:25%">传感器</th><th style="width:100px">开关</th><th style="text-align:left">刻度</th></tr><tr ng-repeat="item in self.monitorData"><td style="text-align:center" ng-bind="$index+1"></td><td ng-bind="item.title"></td><td class="bootstrap-switch-square"><input type="checkbox" control-switch data-on-color="primary" data-on-text="开" data-on-value="EMC_ON" data-off-text="关" data-off-value="EMC_OFF" data-command="{{(item.command|filter:\'EMC_SWITCH\').join()}}" data-sensorid="{{item.id}}" ng-checked="item.status.switch===\'EMC_ON\'"></td><td style="text-align:left"><div class="form-group form-group-sm has-feedback focus"><span class="form-control text-right" ng-bind="item.channels[\'01\'].lasttotal"></span> <span class="form-control-feedback">KWh</span></div></td></tr></table><table class="table table-hover table-bordered" ng-if="self.deviceType.selected.id===\'HOTWATERMETER\'"><tr><th class="text-center" style="width:50px">序号</th><th style="width:25%">传感器</th><th style="width:100px">开关</th><th style="text-align:left">刻度</th></tr><tr ng-repeat="item in self.monitorData"><td style="text-align:center" ng-bind="$index+1"></td><td ng-bind="item.title"></td><td class="bootstrap-switch-square"><input type="checkbox" control-switch data-on-color="primary" data-on-text="开" data-on-value="EMC_ON" data-off-text="关" data-off-value="EMC_OFF" data-command="{{(item.command|filter:\'EMC_SWITCH\').join()}}" data-sensorid="{{item.id}}" ng-checked="item.status.switch===\'EMC_ON\'"></td><td style="text-align:left"><div class="form-group form-group-sm has-feedback focus"><span class="form-control text-right" ng-bind="item.channels[\'03\'].lasttotal"></span> <span class="form-control-feedback">KWh</span></div></td></tr></table><table class="table table-hover table-bordered" ng-if="self.deviceType.selected.id===\'ELECTRICITYMETER\'"><tr><th class="text-center" style="width:50px">序号</th><th style="width:25%">传感器</th><th style="width:100px">开关</th><th style="text-align:left">功率</th></tr><tr ng-repeat="item in self.monitorData"><td style="text-align:center" ng-bind="$index+1"></td><td ng-bind="item.title"></td><td class="bootstrap-switch-square"><input type="checkbox" control-switch data-on-color="primary" data-on-text="开" data-on-value="EMC_ON" data-off-text="关" data-off-value="EMC_OFF" data-command="{{(item.command|filter:\'EMC_SWITCH\').join()}}" data-sensorid="{{item.id}}" ng-checked="item.status.switch===\'EMC_ON\'"></td><td style="text-align:left"><div class="form-group form-group-sm has-feedback focus"><span class="form-control text-right" ng-bind="item.channels[\'11\'].lasttotal"></span> <span class="form-control-feedback">KWh</span></div></td></tr></table><table class="table table-hover table-bordered" ng-if="self.deviceType.selected.id===\'TEMPERATURECONTROL\'"><tr><th class="text-center" style="width:50px">序号</th><th style="width:15%">温控器名</th><th style="width:100px">开关</th><th>设置温度</th><th style="width:87px">室内温度</th><th>能量值(度)</th><th style="min-width:130px">风速</th><th style="min-width:300px">模式</th></tr><tr ng-repeat="item in self.monitorData"><td style="text-align:center" ng-bind="$index+1"></td><td ng-bind="item.title"></td><td class="bootstrap-switch-square"><input type="checkbox" control-switch data-on-color="primary" data-on-text="开" data-on-value="EMC_ON" data-off-text="关" data-off-value="EMC_OFF" data-command="{{(item.command|filter:\'EMC_SWITCH\').join()}}" data-sensorid="{{item.id}}" ng-checked="item.status.switch===\'EMC_ON\'"></td><td><div control-slider data-max="15" data-command="{{(item.command|filter:\'EMC_TEMPRATURE\').join()}}" data-sensorid="{{item.id}}" data-value="{{item.channels[\'37\'].lasttotal}}"></div></td><td><div class="form-group form-group-sm has-feedback focus"><span class="form-control text-right" ng-bind="item.channels[\'40\'].lasttotal"></span> <span class="form-control-feedback"><i class="emweb web-degree"></i></span></div></td><td><div class="input-group input-group-sm focus"><span class="input-group-addon"><i class="emweb web-charging"></i></span> <span class="form-control" ng-bind="item.channels[\'33\'].lasttotal"></span></div></td><td><div control-speed data-command="{{(item.command|filter:\'EMC_WINDSPEED\').join()}}" data-sensorid="{{item.id}}" data-status="{{item.status.mode}}"></div></td><td><div class="btn-group" control-mode data-command="{{(item.command|filter:\'EMC_MODE\').join()}}" data-sensorid="{{item.id}}" data-status="{{item.status.mode}}"></div></td></tr></table></div></div><div class="right-side text-left" customer><button class="btn btn-primary">社会属性</button> <input type="text" class="form-control input-sm" placeholder="🔍关键字搜索" ng-model="self.customer.search"><div auto-height="30" jstree="self.customer" jstree-search="self.customer.search" style="overflow:auto"></div></div></div></div>');

angular.module('EMAPP').controller('project.control', ["$scope", "$api", "$timeout", function($scope, $api, $timeout) {

    var self = this,
        projectId = EMAPP.Project.current && EMAPP.Project.current._id;

    //设备接口
    projectId && $api.device.type({
        project: projectId
    }, function(data) {

        self.deviceType = data.result;

        self.deviceType.length && (self.deviceType.select = function(item) {
            self.deviceType.selected = item;
            self.list();
        })(self.deviceType[0]);

    });

    //查询社会属性
    projectId && $api.customer.info({
        project: projectId,
        onlynode: 1
    }, function(data) {
        self.customer = {
            core: {
                data: [{
                    id: 'ROOT',
                    parent: '#',
                    text: '全部',
                    state: {
                        selected: true,
                        opened: true
                    },
                    icon: 'glyphicon glyphicon-th-list'
                }]
            },
            conditionalselect: function(node, event) {
                if (node.id === 'ROOT') {
                    self.customer.selected = undefined;
                } else {
                    self.customer.selected = node.id;
                }
                self.list();
                return true;
            },
            plugins: [
                'search', 'conditionalselect'
            ]
        };
        (function forEach(list, parent) {
            angular.forEach(list, function(item, index) {
                item.parent = parent;
                item.text = item.title;
                // if (parent === '#' && index === 0) {
                //     item.state = {
                //         selected: true,
                //         opened: true
                //     };
                // }
                if (Object.keys(item.child).length) {
                    item.icon = 'glyphicon glyphicon-th-list';
                } else {
                    item.icon = 'glyphicon glyphicon-file';
                }
                forEach(item.child, item.id);
                self.customer.core.data.push(item);
            });
        }(data.result, 'ROOT'));
    });

    // 分页信息
    self.paging = {
        index: 1,
        size: 50,
        total: 0,
        // 瀑布流加载判断
        flow: function(event) {
            if ((50 + event.target.offsetHeight + event.target.scrollTop) > event.target.scrollHeight) {
                if (self.monitorData && !self.monitorData.loading && (self.paging.total > self.paging.index * self.paging.size)) {
                    self.paging.index += 1;
                    self.list(true);
                }
            }
        }
    };

    //获取能耗列表信息
    self.monitorData = [];
    self.list = function(loadMore) {

        if (self.deviceType.selected && !self.monitorData.loading) {

            !loadMore && angular.extend(self.paging, {
                index: 1,
                total: 0
            });

            self.monitorData.loading = true;

            $api.business.monitor({
                devicetype: self.deviceType.selected.id,
                project: projectId,
                ext: {
                    enableMask: 1
                },
                mode: 'SENSOR',
                usesocity: self.customer && self.customer.selected ? 1 : undefined,
                socitynode: self.customer && self.customer.selected,
                pageindex: self.paging.index,
                pagesize: self.paging.size
            }, function(data) {

                data = data.result[projectId] || {};

                self.monitorData = loadMore ? self.monitorData.concat(data.detail) : data.detail;
                self.paging.total = data.paging.count;

            });

        }

    };

    return self;

}]);