angular.module('EMAPP').controller('project.main', ["$api", "$filter", "$timeout", function ($api, $filter, $timeout) {

    var self = this;

    self.viewDate = new Date();
    self.chart = {};
    self.groupmode = EMAPP.User.groupmode;

    //绑定日历
    $timeout(function (element) {
        element = $('datetimepicker').bind('dp.show', function () {
            $timeout(function () {
                element.data('DateTimePicker').maxDate(new Date());
            });
        }).bind('dp.change', function (event) {
            var sameMonth = angular.equals(event.date.format('YYYYMM'), $filter('date')(self.viewDate, 'yyyyMM')),
                sameDate = angular.equals(event.date.format('YYYYMMDD'), $filter('date')(self.viewDate, 'yyyyMMdd'));
            if (!sameDate) {
                self.viewDate = event.date._d;
            }
            sameMonth && !sameDate && self.bindTD();
            !sameMonth && self.calendar(self.viewDate);
            !sameDate && self.dailycost(self.viewDate);
            !sameMonth && self.monthlykgce(self.viewDate);
            !sameMonth && !self.groupmode && self.energyconstitute(self.viewDate);
            !sameMonth && !self.groupmode && self.dailysensordetail(self.viewDate);
            !sameMonth && self.groupmode && self.energyeffectiverate(self.viewDate);
            !sameMonth && self.groupmode && self.projectdetail(self.viewDate);
        }).bind('dp.update', function (event) {
            if (angular.equals(event.viewDate.format('YYYYMM'), $filter('date')(self.viewDate, 'yyyyMM'))) {
                self.bindTD();
            } else {
                element.data('DateTimePicker').maxDate(new Date()).defaultDate(event.viewDate.format('YYYYMMDD') > $filter('date')(new Date(), 'yyyyMMdd') ? new Date() : event.viewDate._d);
            }
        });
        self.calendar(self.viewDate);
        self.dailycost(self.viewDate);
        self.monthlykgce(self.viewDate);
        !self.groupmode && self.energyconstitute(self.viewDate);
        !self.groupmode && self.dailysensordetail(self.viewDate);
        self.groupmode && self.energyeffectiverate(self.viewDate);
        self.groupmode && self.projectdetail(self.viewDate);
    });

    //绑定ID
    self.bindTD = function () {
        self.calendarData && $('datetimepicker .datepicker-days table tbody td.day').each(function () {
            if (!/old|new/i.test(this.className)) {
                var $this = $(this),
                    day = $this.data('day');
                $this.removeClass('emstatus-up').removeClass('emstatus-down').removeClass('emstatus-keep');
                self.calendarData.detail[day] && $this.addClass(self.calendarData.detail[day] > self.calendarData.average ? 'emstatus-up' : (self.calendarData.detail[day] < self.calendarData.average ? 'emstatus-down' : 'emstatus-keep'));
            }
        });
        $('datetimepicker .datepicker-days table tbody td.active').click(function () {
            return false;
        });
    };

    //日历显示
    self.calendar = function (viewDate) {
        $api.business.calendar({
            time: $filter('date')(viewDate, 'yyyyMM'),
            project: EMAPP.Project.ids,
            assemble: self.groupmode
        }, function (data) {
            data = self.groupmode ? data.result : data.result[EMAPP.Project.current._id];
            self.calendarData = data || {};
            self.calendarData.detail = self.calendarData.detail;
            if (self.groupmode) {
                self.calendarData.average = self.calendarData.buildingConsumption / (self.calendarData.detail && Object.keys(self.calendarData.detail).length || 0);
            } else {
                self.calendarData.average = self.calendarData.buildingConsumption / (self.calendarData.detail && self.calendarData.detail.length || 0);
            }
            angular.forEach(self.calendarData.detail, function (item, key) {
                if (self.groupmode) {
                    this[$filter('date')(key, 'yyyy-MM-dd')] = item;
                } else {
                    this[$filter('date')(item._id, 'yyyy-MM-dd')] = item.value;
                }
            }, self.calendarData.detail = {});
            self.bindTD();
        });
    };

    //今日费用
    self.dailycost = function (viewDate) {
        $api.business.dailycost({
            time: $filter('date')(viewDate, 'yyyyMMdd'),
            project: EMAPP.Project.ids,
            assemble: self.groupmode
        }, function (data) {

            if (self.groupmode) {
                data = data.result || {};
            } else {
                data = data.result[EMAPP.Project.current._id] || {};
            }

            data.cost = Math.round(data.cost);

            self.currentDayqoq = Math.round(data.qoqPercent * 100) / 100;
            self.currentDayyoy = Math.round(data.yoyPercent * 100) / 100;

            self.chart.dailycost = {
                chart: {
                    margin: [0, 0, 0, 0],
                    style: {
                        textAlign: 'center'
                    },
                    type: 'pie'
                },
                title: {
                    text: '<div class="pieTitle">今日费用</div><div class="pieNumber">' + data.cost + '</div><div class="pieUnit">元</div>',
                    verticalAlign: 'middle',
                    useHTML: true,
                    y: -12
                },
                tooltip: false,
                plotOptions: {
                    pie: {
                        dataLabels: false,
                        innerSize: '85%'
                    }
                },
                series: [{
                    data: [data.cost]
                }]
            };

        });
    };

    //总能耗
    self.monthlykgce = function (viewDate) {
        $api.business.monthlykgce({
            time: $filter('date')(viewDate, 'yyyyMM'),
            project: EMAPP.Project.ids
        }, function (data) {

            var series = [],
                total = 0,
                kgceperunitarea = 0,
                kwhperunitarea = 0;

            if (self.groupmode) {
                angular.forEach(data.result, function (item, key) {
                    this.push([EMAPP.Project[key].title, item.kgce]);
                    total += item.kgce;
                    kgceperunitarea += item.kgceperunitarea;
                    kwhperunitarea += item.kwhperunitarea;
                }, data.detail = []);
                series.push({
                    data: data.detail
                });
            } else {
                data = data.result[EMAPP.Project.current._id] || {};
                angular.forEach(data.detail, function (val, key) {
                    this.push([key, val]);
                }, data.detail = []);
                series.push({
                    data: data.detail
                });
                total = data.kgce;
                kgceperunitarea = data.kgceperunitarea;
                kwhperunitarea = data.kwhperunitarea;
            }

            //统计单位面积能耗 & 单位面积电耗
            self.currentMonthKgceperunitarea = Math.round(kgceperunitarea * 100) / 100;
            self.currentMonthKwhperunitarea = Math.round(kwhperunitarea * 100) / 100;

            self.chart.monthlykgce = {
                chart: {
                    marginBottom: 0,
                    marginLeft: 0,
                    marginRight: 140,
                    marginTop: 0,
                    style: {
                        textAlign: 'center'
                    },
                    type: 'pie'
                },
                title: {
                    text: '<div class="pieTitle">月综合能耗</div><div class="pieNumber">' + (Math.round(total * 100) / 100) + '</div><div class="pieUnit">千克煤</div>',
                    verticalAlign: 'middle',
                    useHTML: true,
                    x: -70,
                    y: -12
                },
                tooltip: {
                    pointFormat: ' <b>{point.y}</b> 千克煤'
                },
                plotOptions: {
                    pie: {
                        dataLabels: false,
                        innerSize: '85%',
                        showInLegend: true
                    }
                },
                legend: {
                    verticalAlign: 'middle',
                    layout: 'vertical',
                    labelFormatter: function () {
                        return '<div style="text-align:left;">' + (Math.round(this.percentage * 10) / 10) + '% ' + this.name + '</div><div style="color:#BBB;text-align:left;">' + this.y + 'KGce</div>';
                    },
                    itemWidth: 100,
                    useHTML: true,
                    x: 140
                },
                series: series
            };

        });
    };

    //水电气构成
    self.energyconstitute = function (viewDate) {
        $api.business.energyconstitute({
            time: $filter('date')(viewDate, 'yyyyMM'),
            project: EMAPP.Project.current._id
        }, function (data) {

            var categories = [],
                series = [];

            angular.forEach(data.result[EMAPP.Project.current._id] || {}, function (item, name, bool) {
                if (Object.keys(item).length > categories.length) {
                    bool = 0;
                    categories = [];
                }
                angular.forEach(item, function (val, key) {
                    this.push(val);
                    bool === 0 && categories.push(parseInt(key));
                }, item = []);
                series.push({
                    data: item,
                    name: name
                });
            });

            self.chart.energyconstitute = {
                chart: {
                    type: 'spline'
                },
                title: false,
                xAxis: {
                    type: 'datetime',
                    categories: categories,
                    labels: {
                        formatter: function () {
                            return $filter('date')(this.value, 'M-dd');
                        }
                    }
                },
                yAxis: {
                    title: false
                },
                tooltip: {
                    xDateFormat: '%m月%d日',
                    pointFormat: '{series.name}: <span style="color:{point.color};font-weight:700;">{point.y}元</span>'
                },
                series: series
            };

        });
    };

    //能耗细分
    self.dailysensordetail = function (viewDate) {
        $api.business.dailysensordetail({
            time: $filter('date')(viewDate, 'yyyyMM'),
            project: EMAPP.Project.current._id
        }, function (data) {

            data = data.result[EMAPP.Project.current._id] || {};

            var total = 0;

            angular.forEach(data, function (val, key) {
                this.push([key, val]);
                total += (val * 100);
            }, data = []);

            self.chart.dailysensordetail = {
                chart: {
                    marginLeft: -10,
                    marginRight: 200,
                    style: {
                        textAlign: 'left'
                    },
                    type: 'pie'
                },
                title: {
                    text: '<div class="pieTitle">' + $filter('date')(viewDate, 'yyyy年MM月') + '能耗</div><div>' + (total / 100) + 'KWh</div>',
                    verticalAlign: 'middle',
                    useHTML: true,
                    x: -100,
                    y: -5
                },
                tooltip: {
                    pointFormat: '<b>{point.y:.2f}kWh {point.percentage:.2f}%</b>'
                },
                plotOptions: {
                    pie: {
                        dataLabels: false,
                        innerSize: '85%',
                        showInLegend: true
                    }
                },
                legend: {
                    align: 'center',
                    verticalAlign: 'middle',
                    layout: 'vertical',
                    labelFormatter: function () {
                        var a = (Math.round(this.percentage * 10) / 10) + '% ' + this.name,
                            b = (Math.round((this.y || 0) * 100) / 100) + 'kWh';
                        return [
                            '<span class="center-block" title="' + a + '">' + a + '</span>',
                            '<span class="center-block text-muted" title="' + b + '">' + b + '</span>'
                        ].join('');
                    },
                    itemWidth: 200,
                    x: 140,
                    useHTML: true
                },
                series: [{
                    cropThreshold: 0,
                    turboThreshold: 0,
                    data: data
                }]
            };

        });
    };

    //能效比曲线
    self.energyeffectiverate = function (viewDate) {
        $api.business.energyeffectiverate({
            time: $filter('date')(viewDate, 'yyyyMM'),
            project: EMAPP.Project.ids,
            assemble: self.groupmode
        }, function (data) {

            var categories = [],
                series = [];

            angular.forEach(data.result || {}, function (items, name, bool) {
                if (Object.keys(items).length > categories.length) {
                    bool = 0;
                    categories = [];
                }
                angular.forEach(items, function (item, key) {
                    this.push(Math.round(item.value * 100) / 100);
                    bool === 0 && categories.push(key * 1000);
                }, items = []);
                series.push({
                    data: items,
                    name: {
                        now: '本月能效',
                        yoy: '同期能效'
                    }[name] || name
                });
            });

            self.chart.energyeffectiverate = {
                chart: {
                    type: 'spline'
                },
                title: false,
                xAxis: {
                    type: 'datetime',
                    categories: categories,
                    labels: {
                        formatter: function () {
                            return $filter('date')(this.value, 'M-dd');
                        }
                    }
                },
                yAxis: {
                    title: false
                },
                tooltip: {
                    xDateFormat: '%m月%d日',
                    pointFormat: '{series.name}: <span style="color:{point.color};font-weight:700;">{point.y}KWh</span>'
                },
                series: series
            };

        });
    };

    //节能星级
    self.projectdetail = function (viewDate) {
        $api.business.projectdetail({
            time: $filter('date')(viewDate, 'yyyyMM'),
            project: EMAPP.Project.ids
        }, function (data) {

            angular.forEach(data.result, function (item) {
                item.data = [0, 0, 0, 0, 0];
                item.data[item.ecslevel - 1] = item.uaec;
                this.push({
                    name: item.name,
                    data: item.data
                });
            }, data.series = []);

            self.chart.projectdetail = {
                chart: {
                    type: 'bar'
                },
                title: false,
                xAxis: {
                    categories: ['0-1.8 KWh', '1.8-3.8 KWh', '3.8-5.7 KWh', '5.7-7.7 KWh', '7.7-∞ KWh']
                },
                yAxis: {
                    title: false
                },
                tooltip: {
                    valueSuffix: ' KWh'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'bottom',
                    y: -20,
                    floating: true,
                    borderWidth: 1
                },
                series: data.series
            };

        });
    };

}]);