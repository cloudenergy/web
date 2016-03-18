EMAPP.templateCache.put("dist/html/project/control.html?rev=fcb110ed4c",'<div class="app-view-project-control text-center ng-cloak"><div class="nav nav-tabs"><div class="btn-group"><a href="javascript:void(0)" class="btn btn-sm btn-primary" ng-class="{active:self.deviceType.selected.id===item.id}" ng-repeat="item in self.deviceType" ng-click="self.deviceType.select(item)" ng-bind="item.name"></a></div></div><div class="tab-content row"><div class="tab-pane active" ng-class="{true:\'col-xs-10\',false:\'col-xs-12\'}[!!self.showCustomer]"><div slimscroll><table class="table table-hover table-bordered" ng-repeat="(key,list) in self.monitorData"><tr ng-if="key===\'ENERGYMETER\'"><th style="width:15%">传感器</th><th style="width:100px">开关</th><th style="width:87px">供水温度</th><th style="width:87px">回水温度</th><th style="width:87px">温差</th><th>流量</th><th>流速</th><th>总冷量</th><th>总热量</th></tr><tr ng-if="key===\'ENERGYMETER\'" ng-repeat="item in list"><td ng-bind="item.title"></td><td class="bootstrap-switch-square"><input type="checkbox" control-switch data-on-color="info" data-on-text="制冷" data-on-value="EMC_COOLING" data-off-color="danger" data-off-text="制热" data-off-value="EMC_HEATING" data-command="{{(item.command|filter:\'EMC_MODE\').join()}}" data-sensorid="{{item.id}}" ng-checked="item.status.mode===\'EMC_COOLING\'"></td><td><div class="form-group form-group-sm has-feedback focus"><span class="form-control text-right" ng-bind="item.channels[\'05\'].lasttotal"></span> <span class="form-control-feedback"><i class="em em-degree"></i></span></div></td><td><div class="form-group form-group-sm has-feedback focus"><span class="form-control text-right" ng-bind="item.channels[\'06\'].lasttotal"></span> <span class="form-control-feedback"><i class="em em-degree"></i></span></div></td><td><div class="form-group form-group-sm has-feedback focus"><span class="form-control text-right" ng-bind="(item.channels[\'05\'].lasttotal>item.channels[\'06\'].lasttotal?item.channels[\'05\'].lasttotal-item.channels[\'06\'].lasttotal:item.channels[\'06\'].lasttotal-item.channels[\'05\'].lasttotal).toFixed(2)"></span> <span class="form-control-feedback"><i class="em em-degree"></i></span></div></td><td><div class="form-group form-group-sm has-feedback"><span class="form-control text-right" ng-bind="item.channels[\'04\'].lasttotal"></span> <span class="form-control-feedback">KWh</span></div></td><td><div class="form-group form-group-sm has-feedback"><span class="form-control text-right" ng-bind="item.channels[\'09\'].lasttotal"></span> <span class="form-control-feedback">KWh</span></div></td><td><div class="form-group form-group-sm has-feedback"><span class="form-control text-right" ng-bind="item.channels[\'07\'].lasttotal"></span> <span class="form-control-feedback">KWh</span></div></td><td><div class="form-group form-group-sm has-feedback"><span class="form-control text-right" ng-bind="item.channels[\'08\'].lasttotal"></span> <span class="form-control-feedback">KWh</span></div></td></tr><tr ng-if="key===\'COLDWATERMETER\'"><th style="width:25%">传感器</th><th style="width:100px">开关</th><th style="text-align:left">刻度</th></tr><tr ng-if="key===\'COLDWATERMETER\'" ng-repeat="item in list"><td ng-bind="item.title"></td><td class="bootstrap-switch-square"><input type="checkbox" control-switch data-on-color="primary" data-on-text="开" data-on-value="EMC_ON" data-off-text="关" data-off-value="EMC_OFF" data-command="{{(item.command|filter:\'EMC_SWITCH\').join()}}" data-sensorid="{{item.id}}" ng-checked="item.status.switch===\'EMC_ON\'"></td><td style="text-align:left"><div class="form-group form-group-sm has-feedback focus"><span class="form-control text-right" ng-bind="item.channels[\'01\'].lasttotal"></span> <span class="form-control-feedback">KWh</span></div></td></tr><tr ng-if="key===\'HOTWATERMETER\'"><th style="width:25%">传感器</th><th style="width:100px">开关</th><th style="text-align:left">刻度</th></tr><tr ng-if="key===\'HOTWATERMETER\'" ng-repeat="item in list"><td ng-bind="item.title"></td><td class="bootstrap-switch-square"><input type="checkbox" control-switch data-on-color="primary" data-on-text="开" data-on-value="EMC_ON" data-off-text="关" data-off-value="EMC_OFF" data-command="{{(item.command|filter:\'EMC_SWITCH\').join()}}" data-sensorid="{{item.id}}" ng-checked="item.status.switch===\'EMC_ON\'"></td><td style="text-align:left"><div class="form-group form-group-sm has-feedback focus"><span class="form-control text-right" ng-bind="item.channels[\'03\'].lasttotal"></span> <span class="form-control-feedback">KWh</span></div></td></tr><tr ng-if="key===\'ELECTRICITYMETER\'"><th style="width:25%">传感器</th><th style="width:100px">开关</th><th style="text-align:left">功率</th></tr><tr ng-if="key===\'ELECTRICITYMETER\'" ng-repeat="item in list"><td ng-bind="item.title"></td><td class="bootstrap-switch-square"><input type="checkbox" control-switch data-on-color="primary" data-on-text="开" data-on-value="EMC_ON" data-off-text="关" data-off-value="EMC_OFF" data-command="{{(item.command|filter:\'EMC_SWITCH\').join()}}" data-sensorid="{{item.id}}" ng-checked="item.status.switch===\'EMC_ON\'"></td><td style="text-align:left"><div class="form-group form-group-sm has-feedback focus"><span class="form-control text-right" ng-bind="item.channels[\'11\'].lasttotal"></span> <span class="form-control-feedback">KWh</span></div></td></tr><tr ng-if="key===\'TEMPRATURECONTROL\'"><th style="width:15%">温控器名</th><th style="width:100px">开关</th><th>设置温度</th><th style="width:87px">当前温度</th><th>能量值(度)</th><th style="min-width:130px">风速</th><th style="min-width:270px">模式</th></tr><tr ng-if="key===\'TEMPRATURECONTROL\'" ng-repeat="item in list"><td ng-bind="item.title"></td><td class="bootstrap-switch-square"><input type="checkbox" control-switch data-on-color="primary" data-on-text="开" data-on-value="EMC_ON" data-off-text="关" data-off-value="EMC_OFF" data-command="{{(item.command|filter:\'EMC_SWITCH\').join()}}" data-sensorid="{{item.id}}" ng-checked="item.status.switch===\'EMC_ON\'"></td><td><div control-slider data-max="15" data-command="{{(item.command|filter:\'EMC_TEMPRATURE\').join()}}" data-sensorid="{{item.id}}" data-value="{{item.channels[\'37\'].lasttotal}}"></div></td><td><div class="form-group form-group-sm has-feedback focus"><span class="form-control text-right" ng-bind="item.channels[\'40\'].lasttotal"></span> <span class="form-control-feedback"><i class="em em-degree"></i></span></div></td><td><div class="input-group input-group-sm focus"><span class="input-group-addon"><i class="em em-charging"></i></span> <span class="form-control" ng-bind="item.channels[\'33\'].lasttotal"></span></div></td><td><div control-speed data-command="{{(item.command|filter:\'EMC_WINDSPEED\').join()}}" data-sensorid="{{item.id}}" data-status="{{item.status.mode}}"></div></td><td><div class="btn-group" control-mode data-command="{{(item.command|filter:\'EMC_MODE\').join()}}" data-sensorid="{{item.id}}" data-status="{{item.status.mode}}"></div></td></tr></table></div></div><div class="tab-pane col-xs-2 text-left" ng-class="{active:self.showCustomer}" style="padding-left:0"><input type="text" class="form-control input-sm" placeholder="🔍关键字搜索" ng-model="self.jstreeSearch"><div auto-height jstree="self.jstree" jstree-search="self.jstreeSearch" style="overflow:auto"></div></div></div></div>'),EMAPP.register.controller("project.control",["$api","$timeout","$stateParams",function(e,t,i){var l=this,c=EMAPP.Project.current&&EMAPP.Project.current._id,o=function(){$(".slimScrollDiv,div[slimscroll]").height($(window).height()-$("div[slimscroll]").offset().top-15)};return $(window).resize(o),o(),c&&e.device.type({project:c},function(e){l.deviceType=e.result,l.deviceType.length&&(l.deviceType.select=function(e){l.deviceType.selected=e,l.monitorData=[],$("div[slimscroll]").slimScroll&&$("div[slimscroll]").slimScroll({scrollBy:0,scrollTo:0}),$("div.slimScrollBar").css({top:0}),l.list()})(l.deviceType[0])}),l.list=function(i){l.monitorData.loading=!0,e.business.monitor(angular.extend({devicetype:l.deviceType.selected.id,project:c,ext:{enableMask:1},groupby:"SENSOR",pageindex:1,pagesize:1e4},angular.isObject(i)?i:angular.isNumber(i)?{pageindex:i}:{}),function(e){e=e.result[c]||{},angular.forEach(e.detail,function(e){e.devicetype&&(this[e.devicetype]=this[e.devicetype]||[],this[e.devicetype].push(e))},l.monitorData={}),t(o)})},l}]);