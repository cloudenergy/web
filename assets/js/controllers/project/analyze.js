EMAPP.templateCache.put('assets/html/project/analyze/view.html?rev=634a03a343', '<div class="app-view-project-analyze ng-cloak"><ul class="nav nav-tabs" ng-if="!self.groupmode"><li class="active"><a data-toggle="tab" href="#building">建筑</a></li><li><a data-toggle="tab" href="#socities">社会属性</a></li></ul><div class="tab-content"><div analyze-group ng-if="self.groupmode" id="group" class="tab-pane clearfix active" ng-include="\'assets/html/project/analyze/group.html?rev=3f74b1ca65\'"></div><div analyze-building ng-if="!self.groupmode" id="building" class="tab-pane clearfix active" ng-include="\'assets/html/project/analyze/building.html?rev=75737be0d3\'"></div><div analyze-socities ng-if="!self.groupmode" id="socities" class="tab-pane clearfix" ng-include="\'assets/html/project/analyze/socities.html?rev=35ebcf2cab\'"></div></div></div>');
EMAPP.templateCache.put('assets/html/project/analyze/group.html?rev=3f74b1ca65', '<div class="row"><div class="col-sm-4"><div class="row"><div class="panel-heading"><span class="subTitle">建筑能耗收入</span></div><div class="panel-body"><div class="subContent text-center"><div class="panel-heading btn-group"><a class="btn btn-primary" href="javascript:void(0)" ng-repeat="(key,val) in self.timetype" ng-class="{active:self.timetype_current===key}" ng-click="self.timetypeChange(key)" ng-bind="val"></a></div><div class="panel-body"><div class="first-list"><div class="media" ng-click="self.check(\'consumption\')"><div class="media-left badge" ng-class="{\'badge-primary\':self.current===\'consumption\'}">总用能</div><div class="media-body"><div></div></div><div class="media-right media-middle" ng-bind="self.data.consumption"></div></div><div class="media" ng-click="self.check(\'electric\')"><div class="media-left badge" ng-class="{\'badge-primary\':self.current===\'electric\'}">总电能</div><div class="media-body"><div></div></div><div class="media-right media-middle" ng-bind="self.data.electric"></div></div><div class="media" ng-click="self.check(\'eer\')"><div class="media-left badge" ng-class="{\'badge-primary\':self.current===\'eer\'}">能效比</div><div class="media-body"><div></div></div><div class="media-right media-middle" ng-bind="self.data.eer"></div></div></div></div></div></div></div></div><div class="col-sm-8 content-right"><div class="row"><div class="panel-heading"><span class="subTitle">能耗收入比</span></div><div class="panel-body"><div class="subContent clearfix"><div class="col-sm-12"><div class="row text-center"><div class="panel-heading second-list-top"><table class="table second-list-head"><thead><tr><th style="width:20%">项目名称</th><th style="width:16%">总用量</th><th style="width:16%" ng-if="self.current===\'consumption\'">总用量比</th><th style="width:16%" ng-if="self.current===\'consumption\'">同期用量</th><th style="width:16%" ng-if="self.current===\'consumption\'">同期用量比</th><th style="width:16%" ng-if="self.current!==\'consumption\'">总电能</th><th style="width:16%" ng-if="self.current!==\'consumption\'">总收入</th><th style="width:16%" ng-if="self.current!==\'consumption\'">能效比</th><th style="width:16%">建筑面积</th></tr></thead></table></div><div class="panel-body"><div class="second-list relative overflow-hidden nowrap" perfect-scrollbar="self.sheet.length"><table class="table table-condensed"><tbody><tr ng-repeat="item in self.sheet"><td style="width:20%" class="text-left" ng-bind="item.name"></td><td style="width:16%" ng-bind="item.now.consumption"></td><td style="width:16%" ng-if="self.current===\'consumption\'" ng-bind="item.now.rate"></td><td style="width:16%" ng-if="self.current===\'consumption\'" ng-bind="item.yoy.consumption"></td><td style="width:16%" ng-if="self.current===\'consumption\'" ng-bind="item.yoy.rate"></td><td style="width:16%" ng-if="self.current!==\'consumption\'" ng-bind="item.now.electric"></td><td style="width:16%" ng-if="self.current!==\'consumption\'" ng-bind="item.now.earning"></td><td style="width:16%" ng-if="self.current!==\'consumption\'" ng-bind="item.now.eer"></td><td style="width:16%" ng-bind="item.area"></td></tr></tbody></table></div></div></div></div></div></div></div></div></div><div class="col-sm-12"><div class="row subContent"><div class="panel-heading"><span class="subTitle">项目能耗曲线图</span></div><div class="panel-body"><highcharts class="highcharts-panel text-center" config="self.chart.timeline"></highcharts></div></div></div>');
EMAPP.templateCache.put('assets/html/project/analyze/building.html?rev=75737be0d3', '<div class="row"><div class="col-sm-4"><div class="row"><div class="panel-heading"><span class="subTitle">建筑能耗收入</span></div><div class="panel-body"><div class="subContent text-center"><div class="panel-heading btn-group"><a class="btn btn-primary" href="javascript:void(0)" ng-repeat="(key,val) in self.timetype" ng-class="{active:self.timetype_current===key}" ng-click="self.timetypeChange(key)" ng-bind="val"></a></div><div class="panel-body"><div class="first-list relative overflow-hidden nowrap" perfect-scrollbar="self.buildingData.length"><div class="media" ng-repeat="item in self.buildingData" ng-click="self.building(item.buildingid)"><div class="media-left badge" ng-class="{\'badge-primary\':self.building_current===item.buildingid||self.building_current===\'\'}" ng-bind="item.consumption.toFixed(0)+\'kWh\'"></div><div class="media-body"><div ng-bind="item.name"></div></div><div class="media-right media-middle" ng-bind="\'¥\'+item.cost.toFixed(0)"></div></div></div></div></div></div></div></div><div class="col-sm-8 content-right"><div class="row"><div class="panel-heading"><span class="subTitle">能耗收入比</span></div><div class="panel-body"><div class="subContent clearfix"><div class="row second-chart"><div class="col-sm-4"><div class="col-sm-6"><highcharts class="highcharts-panel text-center" config="self.chart.nowyoy"></highcharts></div><div class="col-sm-6" ng-if="self.pie.nowyoy"><div class="consumptionPerAreaPrime" ng-bind="self.pie.nowyoy.now.toFixed(0)+\' KWh\'"></div><div class="consumptionPerAreaSub">总能耗</div><div class="seprator"></div><div class="incomeTargetPeriodPrime" ng-bind="self.pie.nowyoy.yoy.toFixed(0)+\' kWh\'"></div><div class="incomeTargetPeriodSub">同期能耗</div></div></div><div class="col-sm-4"><div class="col-sm-6"><highcharts class="highcharts-panel text-center" config="self.chart.nowbudget"></highcharts></div><div class="col-sm-6" ng-if="self.pie.nowbudget"><div class="consumptionPerAreaPrime" ng-bind="self.pie.nowbudget.now.toFixed(0)+\' KWh\'"></div><div class="consumptionPerAreaSub">总能耗</div><div class="seprator"></div><div class="incomeTargetPeriodPrime" ng-bind="self.pie.nowbudget.budget.toFixed(0)+\' kWh\'"></div><div class="incomeTargetPeriodSub">预算指标</div></div></div><div class="col-sm-4"><div class="col-sm-6"><highcharts class="highcharts-panel text-center" config="self.chart.nowincome"></highcharts></div><div class="col-sm-6" ng-if="self.pie.nowincome"><div class="consumptionPerAreaPrime" ng-bind="self.pie.nowincome.now.toFixed(0)+\' KWh\'"></div><div class="consumptionPerAreaSub">总能耗</div><div class="seprator"></div><div class="incomeTargetPeriodPrime" ng-bind="self.pie.nowincome.income.toFixed(0)+\' 元\'"></div><div class="incomeTargetPeriodSub">收入</div></div></div></div><div class="col-sm-12"><div class="row text-center"><div class="panel-heading" ng-if="self.sheet"><table class="table second-list-head"><thead><tr><th style="width:20%">能耗名称</th><th style="width:20%">总用量(kWh)</th><th style="width:20%">总用量比(%)</th><th style="width:20%">同期用量(kWh)</th><th style="width:20%">同期比(%)</th></tr></thead></table></div><div class="panel-body"><div class="second-list second-list-hover relative overflow-hidden nowrap" perfect-scrollbar="self.sheet.length"><table class="table table-condensed"><tbody><tr ng-repeat="item in self.sheet" ng-class="{selected:self.energy_current===item.energy}" ng-click="self.energy(item.energy)"><td style="width:20%" ng-bind="item.name"></td><td style="width:20%" ng-bind="item.nowSum.toFixed(2)"></td><td style="width:20%" ng-bind="item.nowRate.toFixed(2)"></td><td style="width:20%" ng-bind="item.yoySum.toFixed(2)"></td><td style="width:20%" ng-bind="item.yoyRate.toFixed(2)"></td></tr></tbody></table></div></div></div></div></div></div></div></div></div><div class="col-sm-12"><div class="row subContent"><div class="panel-heading"><span class="subTitle">能耗实时曲线图</span></div><div class="panel-body"><highcharts class="highcharts-panel text-center" config="self.chart.timeline"></highcharts></div></div></div>');
EMAPP.templateCache.put('assets/html/project/analyze/socities.html?rev=35ebcf2cab', '<div class="row"><div class="col-sm-4"><div class="row"><div class="panel-heading"><span class="subTitle">社会属性能耗收入</span></div><div class="panel-body"><div class="subContent text-center"><div class="panel-heading btn-group"><a class="btn btn-primary" ng-repeat="(key,val) in self.timetype" ng-class="{active:self.timetype_current===key}" ng-click="self.timetypeChange(key)" ng-bind="val"></a></div><div class="panel-body"><div class="first-list relative overflow-hidden nowrap" perfect-scrollbar="self.socityData.length"><div class="media" ng-repeat="item in self.socityData" ng-click="self.socity(item.socityid)"><div class="media-left badge" ng-class="{\'badge-primary\':self.socity_current===item.socityid||self.socity_current===\'\'}" ng-bind="item.consumption.toFixed(0)+\'kWh\'"></div><div class="media-body"><div ng-bind="item.name"></div></div><div class="media-right media-middle" ng-bind="\'¥\'+item.cost.toFixed(0)"></div></div></div></div></div></div></div></div><div class="col-sm-8 content-right"><div class="row"><div class="panel-heading"><span class="subTitle">能耗收入比</span></div><div class="panel-body"><div class="subContent clearfix"><div class="row second-chart"><div class="col-sm-4"><div class="col-sm-6"><highcharts class="highcharts-panel text-center" config="self.chart.nowyoy"></highcharts></div><div class="col-sm-6" ng-if="self.pie.nowyoy"><div class="consumptionPerAreaPrime">{{self.pie.nowyoy.now.toFixed(0)}} KWh</div><div class="consumptionPerAreaSub">总能耗</div><div class="seprator"></div><div class="incomeTargetPeriodPrime">{{self.pie.nowyoy.yoy.toFixed(0)}} kWh</div><div class="incomeTargetPeriodSub">同期能耗</div></div></div><div class="col-sm-4"><div class="col-sm-6"><highcharts class="highcharts-panel text-center" config="self.chart.electric"></highcharts></div><div class="col-sm-6" ng-if="self.pie.electric"><div class="consumptionPerAreaPrime">{{self.pie.electric.now.toFixed(0)}} KWh</div><div class="consumptionPerAreaSub">电总能耗</div><div class="seprator"></div><div class="incomeTargetPeriodPrime">{{self.pie.electric.yoy.toFixed(0)}} kWh</div><div class="incomeTargetPeriodSub">同期电能耗</div></div></div><div class="col-sm-4"><div class="col-sm-6"><highcharts class="highcharts-panel text-center" config="self.chart.third"></highcharts></div><div class="col-sm-6" ng-if="self.pie.third"><div class="consumptionPerAreaPrime">{{self.pie.third.now.toFixed(0)}} {{self.pie.third.unitTitle}}</div><div class="consumptionPerAreaSub">{{self.pie.third.nowTitle}}</div><div class="seprator"></div><div class="incomeTargetPeriodPrime">{{self.pie.third.yoy.toFixed(0)}} {{self.pie.third.unitTitle}}</div><div class="incomeTargetPeriodSub">{{self.pie.third.yoyTitle}}</div></div></div></div><div class="col-sm-12"><div class="row text-center"><div class="panel-heading" ng-if="self.sheet"><table class="table second-list-head"><thead><tr><th style="width:12%">社会属性</th><th style="width:11%">水</th><th style="width:11%">电</th><th style="width:11%">气</th><th style="width:11%">合计<br>(kWh)</th><th style="width:11%">占比<br>(%)</th><th style="width:11%">费用<br>(元)</th><th style="width:11%">同期用量<br>(kWh)</th><th style="width:11%">同期比<br>(%)</th></tr></thead></table></div><div class="panel-body"><div class="second-list second-list-hover relative overflow-hidden nowrap" perfect-scrollbar="self.sheet.length"><table class="table table-condensed"><tbody><tr ng-repeat="item in self.sheet" ng-class="{selected:self.socity_current===item.socity}" ng-click="self.socity(item.socity)"><td style="width:12%" ng-bind="item.name"></td><td style="width:11%" ng-bind="item.water.toFixed(2)"></td><td style="width:11%" ng-bind="item.electric.toFixed(2)"></td><td style="width:11%" ng-bind="item.gas.toFixed(2)"></td><td style="width:11%" ng-bind="item.nowconsumption.toFixed(2)"></td><td style="width:11%" ng-bind="item.nowrate.toFixed(2)"></td><td style="width:11%" ng-bind="item.cost.toFixed(0)"></td><td style="width:11%" ng-bind="item.yoyconsumption.toFixed(2)"></td><td style="width:11%" ng-bind="item.yoyrate.toFixed(2)"></td></tr></tbody></table></div></div></div></div></div></div></div></div></div><div class="col-sm-12"><div class="row subContent"><div class="panel-heading"><span class="subTitle">能耗实时曲线图</span></div><div class="panel-body"><highcharts class="highcharts-panel" config="self.chart.timeline"></highcharts></div></div></div>');

angular.module('EMAPP').controller('project.analyze', function() {
    this.groupmode = EMAPP.User.groupmode;
});

angular.module('EMAPP').controller('project.analyze.group', ["$filter", "$api", function($filter, $api) {

    var self = this;

    //时间类型
    self.timetype = {
        DAY: '日',
        WEEK: '周',
        MONTH: '月',
        YEAR: '年'
    };

    self.chart = {};

    //时间选择
    self.timetypeChange = function(timetype) {

        self.building_current = '';
        self.energy_current = '';
        self.timetype_current = timetype;

        self.groupanalysis();

    };

    //加载数据
    self.groupanalysis = function() {
        $api.business.groupanalysis({
            time: $filter('date')(new Date(), 'yyyyMMdd'),
            type: self.timetype_current || 'DAY',
            project: EMAPP.Project.ids
        }, function(data) {
            self.data = data.result;
            self.check(self.current);
        });
    };

    //类型选择
    self.current = 'consumption'
    self.check = function(type) {

        self.current = type;

        //能耗收入比
        self.sheet = [];

        //项目能耗曲线图
        var categories = [],
            nowData = [],
            yoyData = [];

        angular.forEach(self.data.detail, function(items, key) {
            categories.push(items.name = EMAPP.Project[key].title);
            self.sheet.push(items);
            angular.forEach(items, function(item, key) {
                key === 'now' && nowData.push(item[type]);
                key === 'yoy' && yoyData.push(item[type]);
            });
        });

        self.chart.timeline = {
            chart: {
                type: 'column'
            },
            title: false,
            xAxis: {
                categories: categories
            },
            yAxis: {
                title: false
            },
            tooltip: {
                shared: true
            },
            series: [{
                name: '当前',
                data: nowData
            }, {
                name: '同期',
                data: yoyData
            }]
        };

    };

    self.timetypeChange('DAY');

    return self;

}]);

angular.module('EMAPP').controller('project.analyze.building', ["$filter", "$api", "analyzePieOptions", function($filter, $api, analyzePieOptions) {

    var self = this;

    //时间类型
    self.timetype = {
        DAY: '日',
        WEEK: '周',
        MONTH: '月',
        YEAR: '年'
    };

    self.chart = {};

    //时间－》建筑－》收入比－》曲线图
    //时间选择
    self.timetypeChange = function(timetype) {

        self.building_current = '';
        self.energy_current = '';
        self.timetype_current = timetype;

        self.buildingstatistic();

        self.incomerate();

        self.timeline();

    };

    //建筑选择
    self.building_current = '';
    self.building = function(buildingid) {
        self.energy_current = '';
        self.building_current = self.building_current === buildingid ? '' : buildingid;
        self.incomerate();
        self.timeline();
    };

    //收入比选择
    self.energy_current = '';
    self.energy = function(energy) {
        self.energy_current = self.energy_current === energy ? '' : energy;
        self.timeline();
    };

    //建筑数据
    self.buildingstatistic = function() {
        $api.business.buildingstatistic({
            timetype: self.timetype_current,
            time: $filter('date')(new Date(), 'yyyyMMdd'),
            project: EMAPP.Project.current._id
        }, function(data) {
            angular.forEach(data.result[EMAPP.Project.current._id], function(item) {
                this.push(item);
            }, self.buildingData = []);
        })
    };

    //收入比数据
    self.incomerate = function() {
        $api.business.energyincomerate({
            timetype: self.timetype_current,
            time: $filter('date')(new Date(), 'yyyyMMdd'),
            project: {
                project: EMAPP.Project.current._id,
                building: self.building_current
            }
        }, function(data) {

            data = data.result[EMAPP.Project.current._id];

            self.pie = data.pie;

            angular.forEach(data.sheet, function(item) {
                this.push(item);
            }, self.sheet = []);

            ///chart1
            self.chart.nowyoy = analyzePieOptions(data.pie.nowyoy.now, data.pie.nowyoy.yoy);

            ///chart2
            self.chart.nowbudget = analyzePieOptions(data.pie.nowbudget.now, data.pie.nowbudget.budget);

            ///chart3
            self.chart.nowincome = analyzePieOptions(data.pie.nowincome.now, data.pie.nowincome.income);

        })
    };

    //曲线图数据
    self.timeline = function() {
        $api.business.energytimeline({
            timetype: self.timetype_current,
            time: $filter('date')(new Date(), 'yyyyMMdd'),
            project: [{
                project: EMAPP.Project.current._id,
                energytype: self.energy_current,
                building: self.building_current
            }]
        }, function(data) {

            var categories = [],
                series = [];

            angular.forEach(data.result[EMAPP.Project.current._id] || {}, function(items, name, bool) {
                if (Object.keys(items).length > categories.length) {
                    bool = 0;
                    categories = [];
                }
                angular.forEach(items, function(val, key) {
                    this.push(Math.round(val * 100) / 100);
                    bool === 0 && categories.push(key * 1);
                }, items = []);
                series.push({
                    data: items,
                    name: {
                        now: '当前能耗',
                        yoy: '同期能耗'
                    }[name] || name
                });
            });

            ///chart4
            self.chart.timeline = {
                chart: {
                    type: 'spline'
                },
                title: false,
                xAxis: {
                    type: 'datetime',
                    categories: categories,
                    labels: {
                        formatter: function() {
                            return $filter('date')(this.value, {
                                DAY: 'H时',
                                WEEK: 'M-d',
                                MONTH: 'M-d',
                                YEAR: 'M月'
                            }[self.timetype_current]);
                        }
                    }
                },
                yAxis: {
                    title: false
                },
                tooltip: {
                    xDateFormat: {
                        DAY: '%H时',
                        WEEK: '%m月%d号',
                        MONTH: '%m月%d号',
                        YEAR: '%m月'
                    }[self.timetype_current],
                    pointFormat: '{series.name}: <span style="color:{point.color};font-weight:700;">{point.y:.2f} kWh</span>'
                },
                series: series
            };

        })
    };

    self.timetypeChange('DAY');

    return self;

}]);

angular.module('EMAPP').controller('project.analyze.socities', ["$filter", "$api", "analyzePieOptions", function($filter, $api, analyzePieOptions) {

    var self = this;

    self.timetype = {
        DAY: '日',
        WEEK: '周',
        MONTH: '月',
        YEAR: '年'
    };

    self.socity_current = '';
    self.socity = function(socity) {
        self.socity_current = self.socity_current === socity ? '' : socity;
        self.timeline();
    };

    self.timetypeChange = function(key) {

        self.socity_current = '';
        self.timetype_current = key;
        self.chart = {};

        $api.business.socitystatistic({
            timetype: self.timetype_current,
            time: $filter('date')(new Date(), 'yyyyMMdd'),
            project: EMAPP.Project.current._id
        }, function(data) {
            angular.forEach(data.result[EMAPP.Project.current._id], function(item) {
                this.push(item);
            }, self.socityData = []);
        });

        $api.business.socitydetail({
            timetype: self.timetype_current,
            time: $filter('date')(new Date(), 'yyyyMMdd'),
            project: EMAPP.Project.current._id
        }, function(data) {

            data = data.result[EMAPP.Project.current._id];

            self.pie = data.pie;

            angular.forEach(data.sheet, function(item) {
                this.push(item);
            }, self.sheet = []);

            //优先级： 水>气
            self.pie.third = self.pie.water || self.pie.gas;
            if (self.pie.water) {
                self.pie.third.unitTitle = '吨';
                self.pie.third.nowTitle = '水当期总量';
                self.pie.third.yoyTitle = '水同期总量';
            } else if (self.pie.gas) {
                self.pie.third.unitTitle = '立方米';
                self.pie.third.nowTitle = '气当期总量';
                self.pie.third.yoyTitle = '气同期总量';
            }

            ///chart1
            self.chart.nowyoy = analyzePieOptions(data.pie.nowyoy.now, data.pie.nowyoy.yoy);

            ///chart2
            self.chart.electric = analyzePieOptions(data.pie.electric.now, data.pie.electric.yoy);

            ///chart3
            self.chart.third = analyzePieOptions(data.pie.third.now, data.pie.third.yoy);

        });

        self.timeline();

    };

    self.timeline = function() {
        $api.business.socitytimeline({
            timetype: self.timetype_current,
            time: $filter('date')(new Date(), 'yyyyMMdd'),
            project: [{
                project: EMAPP.Project.current._id,
                socity: self.socity_current
            }]
        }, function(data) {

            var categories = [],
                series = [];

            angular.forEach(data.result[EMAPP.Project.current._id] || {}, function(items, name, bool) {
                if (Object.keys(items).length > categories.length) {
                    bool = 0;
                    categories = [];
                }
                angular.forEach(items.detail, function(val, key) {
                    this.push(Math.round(val * 100) / 100);
                    bool === 0 && categories.push(key * 1);
                }, items = []);
                series.push({
                    data: items,
                    name: name
                });
            });

            ///chart4
            self.chart.timeline = {
                chart: {
                    type: 'spline'
                },
                title: false,
                xAxis: {
                    type: 'datetime',
                    categories: categories,
                    labels: {
                        formatter: function() {
                            return $filter('date')(this.value, {
                                DAY: 'H时',
                                WEEK: 'M-d',
                                MONTH: 'M-d',
                                YEAR: 'M月'
                            }[self.timetype_current]);
                        }
                    }
                },
                yAxis: {
                    title: false
                },
                tooltip: {
                    xDateFormat: {
                        DAY: '%H时',
                        WEEK: '%m月%d号',
                        MONTH: '%m月%d号',
                        YEAR: '%m月'
                    }[self.timetype_current],
                    pointFormat: '{series.name}: <span style="color:{point.color};font-weight:700;">{point.y:.2f} kWh</span>'
                },
                series: series
            };

        })
    };

    self.timetypeChange('DAY');

    return self;

}]);