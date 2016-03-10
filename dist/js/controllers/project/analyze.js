EMAPP.templateCache.put("dist/html/project/analyze/view.html?rev=f416af2230",'<div class="app-view-project-analyze ng-cloak"><ul class="nav nav-tabs" ng-if="!self.groupmode"><li class="active"><a data-toggle="tab" href="#building">建筑</a></li><li><a data-toggle="tab" href="#socities">社会属性</a></li></ul><div class="tab-content"><div analyze-group ng-if="self.groupmode" id="group" class="tab-pane clearfix active" ng-include="\'dist/html/project/analyze/group.html?rev=b919ca4e71\'"></div><div analyze-building ng-if="!self.groupmode" id="building" class="tab-pane clearfix active" ng-include="\'dist/html/project/analyze/building.html?rev=97f843d76c\'"></div><div analyze-socities ng-if="!self.groupmode" id="socities" class="tab-pane clearfix" ng-include="\'dist/html/project/analyze/socities.html?rev=e021e0894c\'"></div></div></div>'),EMAPP.templateCache.put("dist/html/project/analyze/group.html?rev=b919ca4e71",'<div class="row"><div class="col-sm-4"><div class="row"><div class="panel-heading"><span class="subTitle">建筑能耗收入</span></div><div class="panel-body"><div class="subContent text-center"><div class="panel-body btn-group"><a class="btn btn-primary" href="javascript:void(0)" ng-repeat="(key,val) in self.timetype" ng-class="{active:self.timetype_current===key}" ng-click="self.timetypeChange(key)" ng-bind="val"></a></div><div class="panel-body"><div class="first-list" slimscroll="self.slimscrollOptionsFirst"><div class="media" ng-click="self.check(\'consumption\')"><div class="media-left badge" ng-class="{\'badge-primary\':self.current===\'consumption\'}">总用能</div><div class="media-body"><div></div></div><div class="media-right media-middle" ng-bind="self.data.consumption"></div></div><div class="media" ng-click="self.check(\'electric\')"><div class="media-left badge" ng-class="{\'badge-primary\':self.current===\'electric\'}">总电能</div><div class="media-body"><div></div></div><div class="media-right media-middle" ng-bind="self.data.electric"></div></div><div class="media" ng-click="self.check(\'eer\')"><div class="media-left badge" ng-class="{\'badge-primary\':self.current===\'eer\'}">能效比</div><div class="media-body"><div></div></div><div class="media-right media-middle" ng-bind="self.data.eer"></div></div></div></div></div></div></div></div><div class="col-sm-8 content-right"><div class="row"><div class="panel-heading"><span class="subTitle">能耗收入比</span></div><div class="panel-body"><div class="subContent clearfix"><div class="col-sm-12"><div class="row text-center"><div class="panel-heading second-list-top"><table class="table second-list-head"><thead><tr><th style="width:20%">项目名称</th><th style="width:16%">总用量</th><th style="width:16%" ng-if="self.current===\'consumption\'">总用量比</th><th style="width:16%" ng-if="self.current===\'consumption\'">同期用量</th><th style="width:16%" ng-if="self.current===\'consumption\'">同期用量比</th><th style="width:16%" ng-if="self.current!==\'consumption\'">总电能</th><th style="width:16%" ng-if="self.current!==\'consumption\'">总收入</th><th style="width:16%" ng-if="self.current!==\'consumption\'">能效比</th><th style="width:16%">建筑面积</th></tr></thead></table></div><div class="panel-body"><div class="second-list" slimscroll="self.slimscrollOptionsSecond"><table class="table table-condensed"><tbody><tr ng-repeat="item in self.sheet"><td style="width:20%" class="text-left" ng-bind="item.name"></td><td style="width:16%" ng-bind="item.now.consumption"></td><td style="width:16%" ng-if="self.current===\'consumption\'" ng-bind="item.now.rate"></td><td style="width:16%" ng-if="self.current===\'consumption\'" ng-bind="item.yoy.consumption"></td><td style="width:16%" ng-if="self.current===\'consumption\'" ng-bind="item.yoy.rate"></td><td style="width:16%" ng-if="self.current!==\'consumption\'" ng-bind="item.now.electric"></td><td style="width:16%" ng-if="self.current!==\'consumption\'" ng-bind="item.now.earning"></td><td style="width:16%" ng-if="self.current!==\'consumption\'" ng-bind="item.now.eer"></td><td style="width:16%" ng-bind="item.area"></td></tr></tbody></table></div></div></div></div></div></div></div></div></div><div class="col-sm-12"><div class="row subContent"><div class="panel-heading"><span class="subTitle">项目能耗曲线图</span></div><div class="panel-body"><highcharts class="highcharts-panel text-center" config="self.chart.timeline"></highcharts></div></div></div>'),EMAPP.templateCache.put("dist/html/project/analyze/building.html?rev=97f843d76c",'<div class="row"><div class="col-sm-4"><div class="row"><div class="panel-heading"><span class="subTitle">建筑能耗收入</span></div><div class="panel-body"><div class="subContent text-center"><div class="panel-body btn-group"><a class="btn btn-primary" href="javascript:void(0)" ng-repeat="(key,val) in self.timetype" ng-class="{active:self.timetype_current===key}" ng-click="self.timetypeChange(key)" ng-bind="val"></a></div><div class="panel-body"><div class="first-list" slimscroll="self.slimscrollOptionsFirst"><div class="media" ng-repeat="(key,item) in self.buildingData" ng-click="self.building(item.buildingid)"><div class="media-left badge" ng-class="{\'badge-primary\':self.building_current===item.buildingid||self.building_current===\'\'}" ng-bind="item.consumption.toFixed(0)+\'kWh\'"></div><div class="media-body"><div ng-bind="item.name"></div></div><div class="media-right media-middle" ng-bind="\'¥\'+item.cost.toFixed(0)"></div></div></div></div></div></div></div></div><div class="col-sm-8 content-right"><div class="row"><div class="panel-heading"><span class="subTitle">能耗收入比</span></div><div class="panel-body"><div class="subContent clearfix"><div class="row second-chart"><div class="col-sm-4"><div class="col-sm-6"><highcharts class="highcharts-panel text-center" config="self.chart.nowyoy"></highcharts></div><div class="col-sm-6" ng-if="self.pie.nowyoy"><div class="consumptionPerAreaPrime" ng-bind="self.pie.nowyoy.now.toFixed(0)+\' KWh\'"></div><div class="consumptionPerAreaSub">总能耗</div><div class="seprator"></div><div class="incomeTargetPeriodPrime" ng-bind="self.pie.nowyoy.yoy.toFixed(0)+\' kWh\'"></div><div class="incomeTargetPeriodSub">同期能耗</div></div></div><div class="col-sm-4"><div class="col-sm-6"><highcharts class="highcharts-panel text-center" config="self.chart.nowbudget"></highcharts></div><div class="col-sm-6" ng-if="self.pie.nowbudget"><div class="consumptionPerAreaPrime" ng-bind="self.pie.nowbudget.now.toFixed(0)+\' KWh\'"></div><div class="consumptionPerAreaSub">总能耗</div><div class="seprator"></div><div class="incomeTargetPeriodPrime" ng-bind="self.pie.nowbudget.budget.toFixed(0)+\' kWh\'"></div><div class="incomeTargetPeriodSub">预算指标</div></div></div><div class="col-sm-4"><div class="col-sm-6"><highcharts class="highcharts-panel text-center" config="self.chart.nowincome"></highcharts></div><div class="col-sm-6" ng-if="self.pie.nowincome"><div class="consumptionPerAreaPrime" ng-bind="self.pie.nowincome.now.toFixed(0)+\' KWh\'"></div><div class="consumptionPerAreaSub">总能耗</div><div class="seprator"></div><div class="incomeTargetPeriodPrime" ng-bind="self.pie.nowincome.income.toFixed(0)+\' 元\'"></div><div class="incomeTargetPeriodSub">收入</div></div></div></div><div class="col-sm-12"><div class="row text-center"><div class="panel-heading" ng-if="self.sheet"><table class="table second-list-head"><thead><tr><th style="width:20%">能耗名称</th><th style="width:20%">总用量(kWh)</th><th style="width:20%">总用量比(%)</th><th style="width:20%">同期用量(kWh)</th><th style="width:20%">同期比(%)</th></tr></thead></table></div><div class="panel-body"><div class="second-list second-list-hover" slimscroll="self.slimscrollOptionsSecond"><table class="table table-condensed"><tbody><tr ng-repeat="(name,item) in self.sheet" ng-class="{selected:self.energy_current===item.energy}" ng-click="self.energy(item.energy)"><td style="width:20%" ng-bind="name"></td><td style="width:20%" ng-bind="item.nowSum.toFixed(2)"></td><td style="width:20%" ng-bind="item.nowRate.toFixed(2)"></td><td style="width:20%" ng-bind="item.yoySum.toFixed(2)"></td><td style="width:20%" ng-bind="item.yoyRate.toFixed(2)"></td></tr></tbody></table></div></div></div></div></div></div></div></div></div><div class="col-sm-12"><div class="row subContent"><div class="panel-heading"><span class="subTitle">能耗实时曲线图</span></div><div class="panel-body"><highcharts class="highcharts-panel text-center" config="self.chart.timeline"></highcharts></div></div></div>'),EMAPP.templateCache.put("dist/html/project/analyze/socities.html?rev=e021e0894c",'<div class="row"><div class="col-sm-4"><div class="row"><div class="panel-heading"><span class="subTitle">社会属性能耗收入</span></div><div class="panel-body"><div class="subContent text-center"><div class="panel-body btn-group"><a class="btn btn-primary" ng-repeat="(key,val) in self.timetype" ng-class="{active:self.timetype_current===key}" ng-click="self.timetypeChange(key)" ng-bind="val"></a></div><div class="panel-body"><div class="first-list" slimscroll="self.slimscrollOptionsFirst"><div class="media" ng-repeat="(key,item) in self.socityData" ng-click="self.socity(item.socityid)"><div class="media-left badge" ng-class="{\'badge-primary\':self.socity_current===item.socityid||self.socity_current===\'\'}" ng-bind="item.consumption.toFixed(0)+\'kWh\'"></div><div class="media-body"><div ng-bind="item.name"></div></div><div class="media-right media-middle" ng-bind="\'¥\'+item.cost.toFixed(0)"></div></div></div></div></div></div></div></div><div class="col-sm-8 content-right"><div class="row"><div class="panel-heading"><span class="subTitle">能耗收入比</span></div><div class="panel-body"><div class="subContent clearfix"><div class="row second-chart"><div class="col-sm-4"><div class="col-sm-6"><highcharts class="highcharts-panel text-center" config="self.chart.nowyoy"></highcharts></div><div class="col-sm-6" ng-if="self.pie.nowyoy"><div class="consumptionPerAreaPrime">{{self.pie.nowyoy.now.toFixed(0)}} KWh</div><div class="consumptionPerAreaSub">总能耗</div><div class="seprator"></div><div class="incomeTargetPeriodPrime">{{self.pie.nowyoy.yoy.toFixed(0)}} kWh</div><div class="incomeTargetPeriodSub">同期能耗</div></div></div><div class="col-sm-4"><div class="col-sm-6"><highcharts class="highcharts-panel text-center" config="self.chart.electric"></highcharts></div><div class="col-sm-6" ng-if="self.pie.electric"><div class="consumptionPerAreaPrime">{{self.pie.electric.now.toFixed(0)}} KWh</div><div class="consumptionPerAreaSub">电总能耗</div><div class="seprator"></div><div class="incomeTargetPeriodPrime">{{self.pie.electric.yoy.toFixed(0)}} kWh</div><div class="incomeTargetPeriodSub">同期电能耗</div></div></div><div class="col-sm-4"><div class="col-sm-6"><highcharts class="highcharts-panel text-center" config="self.chart.third"></highcharts></div><div class="col-sm-6" ng-if="self.pie.third"><div class="consumptionPerAreaPrime">{{self.pie.third.now.toFixed(0)}} {{self.pie.third.unitTitle}}</div><div class="consumptionPerAreaSub">{{self.pie.third.nowTitle}}</div><div class="seprator"></div><div class="incomeTargetPeriodPrime">{{self.pie.third.yoy.toFixed(0)}} {{self.pie.third.unitTitle}}</div><div class="incomeTargetPeriodSub">{{self.pie.third.yoyTitle}}</div></div></div></div><div class="col-sm-12"><div class="row text-center"><div class="panel-heading" ng-if="self.sheet"><table class="table second-list-head"><thead><tr><th style="width:12%">社会属性</th><th style="width:11%">水</th><th style="width:11%">电</th><th style="width:11%">气</th><th style="width:11%">合计<br>(kWh)</th><th style="width:11%">占比<br>(%)</th><th style="width:11%">费用<br>(元)</th><th style="width:11%">同期用量<br>(kWh)</th><th style="width:11%">同期比<br>(%)</th></tr></thead></table></div><div class="panel-body"><div class="second-list second-list-hover" slimscroll="self.slimscrollOptionsSecond"><table class="table table-condensed"><tbody><tr ng-repeat="item in self.sheet" ng-class="{selected:self.socity_current===item.socity}" ng-click="self.socity(item.socity)"><td style="width:12%" ng-bind="item.name"></td><td style="width:11%" ng-bind="item.water.toFixed(2)"></td><td style="width:11%" ng-bind="item.electric.toFixed(2)"></td><td style="width:11%" ng-bind="item.gas.toFixed(2)"></td><td style="width:11%" ng-bind="item.nowconsumption.toFixed(2)"></td><td style="width:11%" ng-bind="item.nowrate.toFixed(2)"></td><td style="width:11%" ng-bind="item.cost.toFixed(0)"></td><td style="width:11%" ng-bind="item.yoyconsumption.toFixed(2)"></td><td style="width:11%" ng-bind="item.yoyrate.toFixed(2)"></td></tr></tbody></table></div></div></div></div></div></div></div></div></div><div class="col-sm-12"><div class="row subContent"><div class="panel-heading"><span class="subTitle">能耗实时曲线图</span></div><div class="panel-body"><highcharts class="highcharts-panel" config="self.chart.timeline"></highcharts></div></div></div>'),EMAPP.register.controller("project.analyze",function(){this.groupmode=EMAPP.User.groupmode}),EMAPP.register.controller("project.analyze.group",["$filter","$api",function(e,t){var i=this;return i.slimscrollOptionsFirst={color:"rgba(0,0,0,0.5)",height:230,alwaysVisible:!0},i.slimscrollOptionsSecond={color:"rgba(0,0,0,0.5)",height:290,alwaysVisible:!0},i.timetype={DAY:"日",WEEK:"周",MONTH:"月",YEAR:"年"},i.chart={},i.timetypeChange=function(e){i.building_current="",i.energy_current="",i.timetype_current=e,i.groupanalysis()},i.groupanalysis=function(){t.business.groupanalysis({time:e("date")(new Date,"yyyyMMdd"),type:i.timetype_current||"DAY",project:EMAPP.Project.ids},function(e){i.data=e.result,i.check(i.current)})},i.current="consumption",i.check=function(e){i.current=e,i.sheet=[];var t=[],r=[],n=[];angular.forEach(i.data.detail,function(o,c){t.push(o.name=EMAPP.Project[c].title),i.sheet.push(o),angular.forEach(o,function(t,i){"now"===i&&r.push(t[e]),"yoy"===i&&n.push(t[e])})}),i.chart.timeline={chart:{type:"column"},title:!1,xAxis:{categories:t},yAxis:{title:!1},tooltip:{shared:!0},series:[{name:"当前",data:r},{name:"同期",data:n}]}},i.timetypeChange("DAY"),i}]),EMAPP.register.controller("project.analyze.building",["$filter","$api","analyzePieOptions",function(e,t,i){var r=this;return r.slimscrollOptionsFirst={color:"rgba(0,0,0,0.5)",height:230,alwaysVisible:!0},r.slimscrollOptionsSecond={color:"rgba(0,0,0,0.5)",height:185,alwaysVisible:!0},r.timetype={DAY:"日",WEEK:"周",MONTH:"月",YEAR:"年"},r.chart={},r.timetypeChange=function(e){r.building_current="",r.energy_current="",r.timetype_current=e,r.buildingstatistic(),r.incomerate(),r.timeline()},r.building_current="",r.building=function(e){r.energy_current="",r.building_current=r.building_current===e?"":e,r.incomerate(),r.timeline()},r.energy_current="",r.energy=function(e){r.energy_current=r.energy_current===e?"":e,r.timeline()},r.buildingstatistic=function(){t.business.buildingstatistic({timetype:r.timetype_current,time:e("date")(new Date,"yyyyMMdd"),project:EMAPP.Project.current._id},function(e){r.buildingData=e.result[EMAPP.Project.current._id]})},r.incomerate=function(){t.business.energyincomerate({timetype:r.timetype_current,time:e("date")(new Date,"yyyyMMdd"),project:{project:EMAPP.Project.current._id,building:r.building_current}},function(e){e=e.result[EMAPP.Project.current._id],r.pie=e.pie,r.sheet=e.sheet,r.chart.nowyoy=i(e.pie.nowyoy.now,e.pie.nowyoy.yoy),r.chart.nowbudget=i(e.pie.nowbudget.now,e.pie.nowbudget.budget),r.chart.nowincome=i(e.pie.nowincome.now,e.pie.nowincome.income)})},r.timeline=function(){t.business.energytimeline({timetype:r.timetype_current,time:e("date")(new Date,"yyyyMMdd"),project:[{project:EMAPP.Project.current._id,energytype:r.energy_current,building:r.building_current}]},function(t){var i=[],n=[];angular.forEach(t.result[EMAPP.Project.current._id]||{},function(e,t,r){Object.keys(e).length>i.length&&(r=0,i=[]),angular.forEach(e,function(e,t){this.push(parseFloat(e.toFixed(2))),0===r&&i.push(1*t)},e=[]),n.push({data:e,name:{now:"当前能耗",yoy:"同期能耗"}[t]||t})}),r.chart.timeline={chart:{type:"spline"},title:!1,xAxis:{type:"datetime",categories:i,labels:{formatter:function(){return e("date")(this.value,{DAY:"H时",WEEK:"M-d",MONTH:"M-d",YEAR:"M月"}[r.timetype_current])}}},yAxis:{title:!1},tooltip:{xDateFormat:{DAY:"%H时",WEEK:"%m月%d号",MONTH:"%m月%d号",YEAR:"%m月"}[r.timetype_current],pointFormat:'{series.name}: <span style="color:{point.color};font-weight:700;">{point.y:.2f} kWh</span>'},series:n}})},r.timetypeChange("DAY"),r}]),EMAPP.register.controller("project.analyze.socities",["$filter","$api","analyzePieOptions",function(e,t,i){var r=this;return r.slimscrollOptionsFirst={color:"rgba(0,0,0,0.5)",height:250,alwaysVisible:!0},r.slimscrollOptionsSecond={color:"rgba(0,0,0,0.5)",height:185,alwaysVisible:!0},r.timetype={DAY:"日",WEEK:"周",MONTH:"月",YEAR:"年"},r.socity_current="",r.socity=function(e){r.socity_current=r.socity_current===e?"":e,r.timeline()},r.timetypeChange=function(n){r.socity_current="",r.timetype_current=n,r.chart={},t.business.socitystatistic({timetype:r.timetype_current,time:e("date")(new Date,"yyyyMMdd"),project:EMAPP.Project.current._id},function(e){r.socityData=e.result[EMAPP.Project.current._id]}),t.business.socitydetail({timetype:r.timetype_current,time:e("date")(new Date,"yyyyMMdd"),project:EMAPP.Project.current._id},function(e){e=e.result[EMAPP.Project.current._id],r.pie=e.pie,r.sheet=e.sheet,r.pie.third=r.pie.water||r.pie.gas,r.pie.water?(r.pie.third.unitTitle="吨",r.pie.third.nowTitle="水当期总量",r.pie.third.yoyTitle="水同期总量"):r.pie.gas&&(r.pie.third.unitTitle="立方米",r.pie.third.nowTitle="气当期总量",r.pie.third.yoyTitle="气同期总量"),r.chart.nowyoy=i(e.pie.nowyoy.now,e.pie.nowyoy.yoy),r.chart.electric=i(e.pie.electric.now,e.pie.electric.yoy),r.chart.third=i(e.pie.third.now,e.pie.third.yoy)}),r.timeline()},r.timeline=function(){t.business.socitytimeline({timetype:r.timetype_current,time:e("date")(new Date,"yyyyMMdd"),project:[{project:EMAPP.Project.current._id,socity:r.socity_current}]},function(t){var i=[],n=[];angular.forEach(t.result[EMAPP.Project.current._id]||{},function(e,t,r){Object.keys(e).length>i.length&&(r=0,i=[]),angular.forEach(e.detail,function(e,t){this.push(parseFloat(e.toFixed(2))),0===r&&i.push(1*t)},e=[]),n.push({data:e,name:t})}),r.chart.timeline={chart:{type:"spline"},title:!1,xAxis:{type:"datetime",categories:i,labels:{formatter:function(){return e("date")(this.value,{DAY:"H时",WEEK:"M-d",MONTH:"M-d",YEAR:"M月"}[r.timetype_current])}}},yAxis:{title:!1},tooltip:{xDateFormat:{DAY:"%H时",WEEK:"%m月%d号",MONTH:"%m月%d号",YEAR:"%m月"}[r.timetype_current],pointFormat:'{series.name}: <span style="color:{point.color};font-weight:700;">{point.y:.2f} kWh</span>'},series:n}})},r.timetypeChange("DAY"),r}]);