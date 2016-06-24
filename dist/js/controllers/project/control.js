EMAPP.templateCache.put("dist/html/project/control.html?rev=c222212151",'<div class="app-view-project-control text-center ng-cloak"><div class="nav nav-tabs"><div class="btn-group"><a href="javascript:void(0)" class="btn btn-sm btn-primary" ng-class="{active:self.deviceType.selected.id===item.id}" ng-repeat="item in self.deviceType" ng-click="self.deviceType.select(item)" ng-bind="item.name"></a></div><div class="pull-right form-line"><div class="btn-group"><b style="vertical-align:middle">树形列表：</b> <input type="checkbox" flatui-switch flatui-switch-change="self.customerChange" ng-checked="self.showCustomer" data-toggle="switch" data-on-color="info" data-off-color="primary" data-on-text="显示" data-off-text="隐藏"></div></div></div><div class="tab-content row"><div class="tab-pane active" ng-class="{true:\'col-xs-10\',false:\'col-xs-12\'}[!!self.showCustomer]"><div class="relative nowrap overflow-hidden" auto-height perfect-scrollbar="self.monitorData.length" perfect-scrollbar-event="{\'ps-y-reach-end\':self.paging.flow}"><table class="table table-hover table-bordered" ng-if="self.deviceType.selected.id===\'ENERGYMETER\'"><tr><th class="text-center" style="width:50px">序号</th><th style="width:15%">传感器</th><th style="width:100px">开关</th><th style="width:87px">供水温度</th><th style="width:87px">回水温度</th><th style="width:87px">温差</th><th>流量</th><th>流速</th><th>总冷量</th><th>总热量</th></tr><tr ng-repeat="item in self.monitorData"><td style="text-align:center" ng-bind="$index+1"></td><td ng-bind="item.title"></td><td class="bootstrap-switch-square"><input type="checkbox" control-switch data-on-color="info" data-on-text="制冷" data-on-value="EMC_COOLING" data-off-color="danger" data-off-text="制热" data-off-value="EMC_HEATING" data-command="{{(item.command|filter:\'EMC_MODE\').join()}}" data-sensorid="{{item.id}}" ng-checked="item.status.mode===\'EMC_COOLING\'"></td><td><div class="form-group form-group-sm has-feedback focus"><span class="form-control text-right" ng-bind="item.channels[\'05\'].lasttotal"></span> <span class="form-control-feedback"><i class="emweb web-degree"></i></span></div></td><td><div class="form-group form-group-sm has-feedback focus"><span class="form-control text-right" ng-bind="item.channels[\'06\'].lasttotal"></span> <span class="form-control-feedback"><i class="emweb web-degree"></i></span></div></td><td><div class="form-group form-group-sm has-feedback focus"><span class="form-control text-right" ng-bind="(item.channels[\'05\'].lasttotal>item.channels[\'06\'].lasttotal?item.channels[\'05\'].lasttotal-item.channels[\'06\'].lasttotal:item.channels[\'06\'].lasttotal-item.channels[\'05\'].lasttotal).toFixed(2)"></span> <span class="form-control-feedback"><i class="emweb web-degree"></i></span></div></td><td><div class="form-group form-group-sm has-feedback"><span class="form-control text-right" ng-bind="item.channels[\'04\'].lasttotal"></span> <span class="form-control-feedback">KWh</span></div></td><td><div class="form-group form-group-sm has-feedback"><span class="form-control text-right" ng-bind="item.channels[\'09\'].lasttotal"></span> <span class="form-control-feedback">KWh</span></div></td><td><div class="form-group form-group-sm has-feedback"><span class="form-control text-right" ng-bind="item.channels[\'07\'].lasttotal"></span> <span class="form-control-feedback">KWh</span></div></td><td><div class="form-group form-group-sm has-feedback"><span class="form-control text-right" ng-bind="item.channels[\'08\'].lasttotal"></span> <span class="form-control-feedback">KWh</span></div></td></tr></table><table class="table table-hover table-bordered" ng-if="self.deviceType.selected.id===\'COLDWATERMETER\'"><tr><th class="text-center" style="width:50px">序号</th><th style="width:25%">传感器</th><th style="width:100px">开关</th><th style="text-align:left">刻度</th></tr><tr ng-repeat="item in self.monitorData"><td style="text-align:center" ng-bind="$index+1"></td><td ng-bind="item.title"></td><td class="bootstrap-switch-square"><input type="checkbox" control-switch data-on-color="primary" data-on-text="开" data-on-value="EMC_ON" data-off-text="关" data-off-value="EMC_OFF" data-command="{{(item.command|filter:\'EMC_SWITCH\').join()}}" data-sensorid="{{item.id}}" ng-checked="item.status.switch===\'EMC_ON\'"></td><td style="text-align:left"><div class="form-group form-group-sm has-feedback focus"><span class="form-control text-right" ng-bind="item.channels[\'01\'].lasttotal"></span> <span class="form-control-feedback">KWh</span></div></td></tr></table><table class="table table-hover table-bordered" ng-if="self.deviceType.selected.id===\'HOTWATERMETER\'"><tr><th class="text-center" style="width:50px">序号</th><th style="width:25%">传感器</th><th style="width:100px">开关</th><th style="text-align:left">刻度</th></tr><tr ng-repeat="item in self.monitorData"><td style="text-align:center" ng-bind="$index+1"></td><td ng-bind="item.title"></td><td class="bootstrap-switch-square"><input type="checkbox" control-switch data-on-color="primary" data-on-text="开" data-on-value="EMC_ON" data-off-text="关" data-off-value="EMC_OFF" data-command="{{(item.command|filter:\'EMC_SWITCH\').join()}}" data-sensorid="{{item.id}}" ng-checked="item.status.switch===\'EMC_ON\'"></td><td style="text-align:left"><div class="form-group form-group-sm has-feedback focus"><span class="form-control text-right" ng-bind="item.channels[\'03\'].lasttotal"></span> <span class="form-control-feedback">KWh</span></div></td></tr></table><table class="table table-hover table-bordered" ng-if="self.deviceType.selected.id===\'ELECTRICITYMETER\'"><tr><th class="text-center" style="width:50px">序号</th><th style="width:25%">传感器</th><th style="width:100px">开关</th><th style="text-align:left">功率</th></tr><tr ng-repeat="item in self.monitorData"><td style="text-align:center" ng-bind="$index+1"></td><td ng-bind="item.title"></td><td class="bootstrap-switch-square"><input type="checkbox" control-switch data-on-color="primary" data-on-text="开" data-on-value="EMC_ON" data-off-text="关" data-off-value="EMC_OFF" data-command="{{(item.command|filter:\'EMC_SWITCH\').join()}}" data-sensorid="{{item.id}}" ng-checked="item.status.switch===\'EMC_ON\'"></td><td style="text-align:left"><div class="form-group form-group-sm has-feedback focus"><span class="form-control text-right" ng-bind="item.channels[\'11\'].lasttotal"></span> <span class="form-control-feedback">KWh</span></div></td></tr></table><table class="table table-hover table-bordered" ng-if="self.deviceType.selected.id===\'TEMPERATURECONTROL\'"><tr><th class="text-center" style="width:50px">序号</th><th style="width:15%">温控器名</th><th style="width:100px">开关</th><th>设置温度</th><th style="width:87px">当前温度</th><th>能量值(度)</th><th style="min-width:130px">风速</th><th style="min-width:300px">模式</th></tr><tr ng-repeat="item in self.monitorData"><td style="text-align:center" ng-bind="$index+1"></td><td ng-bind="item.title"></td><td class="bootstrap-switch-square"><input type="checkbox" control-switch data-on-color="primary" data-on-text="开" data-on-value="EMC_ON" data-off-text="关" data-off-value="EMC_OFF" data-command="{{(item.command|filter:\'EMC_SWITCH\').join()}}" data-sensorid="{{item.id}}" ng-checked="item.status.switch===\'EMC_ON\'"></td><td><div control-slider data-max="15" data-command="{{(item.command|filter:\'EMC_TEMPRATURE\').join()}}" data-sensorid="{{item.id}}" data-value="{{item.channels[\'37\'].lasttotal}}"></div></td><td><div class="form-group form-group-sm has-feedback focus"><span class="form-control text-right" ng-bind="item.channels[\'40\'].lasttotal"></span> <span class="form-control-feedback"><i class="emweb web-degree"></i></span></div></td><td><div class="input-group input-group-sm focus"><span class="input-group-addon"><i class="emweb web-charging"></i></span> <span class="form-control" ng-bind="item.channels[\'33\'].lasttotal"></span></div></td><td><div control-speed data-command="{{(item.command|filter:\'EMC_WINDSPEED\').join()}}" data-sensorid="{{item.id}}" data-status="{{item.status.mode}}"></div></td><td><div class="btn-group" control-mode data-command="{{(item.command|filter:\'EMC_MODE\').join()}}" data-sensorid="{{item.id}}" data-status="{{item.status.mode}}"></div></td></tr></table></div></div><div class="tab-pane col-xs-2 text-left" ng-class="{active:self.showCustomer}" style="padding-left:0"><input type="text" class="form-control input-sm" placeholder="🔍关键字搜索" ng-model="self.customer.search"><div auto-height jstree="self.customer" jstree-search="self.customer.search" style="overflow:auto"></div></div></div></div>'),angular.module("EMAPP").controller("project.control",["$scope","$api","$timeout",function(e,t,o){var i=this,n=EMAPP.Project.current&&EMAPP.Project.current._id,c=EMAPP.User.user+"_project_control_showcustomer";return i.showCustomer=parseInt(localStorage.getItem(c)||1),i.customerChange=function(e,t){i.showCustomer=t&&1||0,i.monitorData=[],i.list(),localStorage.setItem(c,i.showCustomer)},n&&t.device.type({project:n},function(e){i.deviceType=e.result,i.deviceType.length&&(i.deviceType.select=function(e){angular.extend(i.paging,{index:1,total:0}),i.deviceType.selected=e,i.monitorData=[],i.list()})(i.deviceType[0])}),n&&t.customer.info({project:n,onlynode:1},function(e){i.customer={core:{data:[]},conditionalselect:function(e,t){return"root"===e.id?i.customer.selected=void 0:i.customer.selected=e.id,i.list(),!0},plugins:["search","conditionalselect"]},function t(e,o){angular.forEach(e,function(e,n){e.parent=o,e.text=e.title,"#"===o&&0===n&&(e.state={selected:!0,opened:!0}),Object.keys(e.child).length?e.icon="glyphicon glyphicon-th-list":e.icon="glyphicon glyphicon-file",t(e.child,e.id),i.customer.core.data.push(e)})}(e.result,"#")}),i.paging={index:1,size:50,total:0,flow:function(){i.monitorData&&!i.monitorData.loading&&i.paging.total>i.paging.index*i.paging.size&&(i.paging.index+=1,i.list())}},i.list=function(){i.deviceType.selected&&!i.monitorData.loading&&(i.monitorData.loading=!0,t.business.monitor({devicetype:i.deviceType.selected.id,project:n,ext:{enableMask:1},mode:"SENSOR",usesocity:i.showCustomer||void 0,socitynode:i.showCustomer&&i.customer&&i.customer.selected||void 0,pageindex:i.paging.index,pagesize:i.paging.size},function(e){e=e.result[n]||{},i.monitorData=i.monitorData.concat(e.detail),i.paging.total=e.paging.count}))},i}]);