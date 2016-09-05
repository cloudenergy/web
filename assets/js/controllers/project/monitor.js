EMAPP.templateCache.put('assets/html/project/monitor.html?rev=7a409d1cb9', '<div class="app-view-project-monitor text-center ng-cloak"><div class="nav nav-tabs"><div ng-if="!self.groupmode" class="btn-group"><a href="javascript:void(0)" class="btn btn-sm btn-primary" ng-class="{active:self.deviceType.selected.id===item.id}" ng-repeat="item in self.deviceType" ng-click="self.deviceType.select(item)" ng-bind="item.name"></a></div><div class="pull-right form-inline"><div ng-if="!self.groupmode" class="btn-group"><b style="vertical-align:middle">状态：</b><div class="bootstrap-switch-square"><input type="checkbox" flatui-switch flatui-switch-change="self.exceptionChange" ng-checked="self.showException" data-toggle="switch" data-on-color="warning" data-off-color="primary" data-on-text="异常" data-off-text="正常"></div></div><div ng-show="self.groupmode" class="form-group form-group-sm has-feedback date ng-hide"><input type="text" class="form-control" id="calendar" ng-model="self.date" datetimepicker="{format:\'YYYY-MM\'}"> <i class="form-control-feedback emweb web-calendar"></i></div><div ng-if="self.groupmode" class="form-group form-group-sm"><select class="form-control select select-primary select-block" monitor-select><option value="">全部</option><option value="1">0-1.8 KWh</option><option value="2">1.8-3.8 KWh</option><option value="3">3.8-5.7 KWh</option><option value="4">5.7-7.7 KWh</option><option value="5">7.7-∞ KWh</option></select></div><div ng-show="self.groupmode" class="input-group btn-group-sm"><button type="button" class="btn btn-success" ng-click="self.list();"><i class="emweb web-search"></i> 查询</button></div><div ng-show="self.groupmode" class="input-group btn-group-sm">&nbsp;</div><div ng-show="self.groupmode" class="input-group btn-group-sm">&nbsp;</div><div class="input-group btn-group-sm"><button type="button" class="btn btn-info" ng-click="self.filter()">筛选<i class="emweb web-filter"></i></button></div><div class="input-group btn-group-sm"><button type="button" class="btn btn-info" ng-click="self.export()">导出<i class="emweb web-export-excel"></i></button></div></div></div><div class="tab-content row"><div class="tab-pane active col-xs-12" auto-height ui-i18n="\'zh-cn\'"><div ui-grid="self.gridOptions" class="grid text-left" ui-grid-exporter ui-grid-auto-resize ui-grid-move-columns ui-grid-resize-columns ui-grid-infinite-scroll></div></div><div class="right-side text-left" customer><button class="btn btn-primary">社会属性</button> <input type="text" class="form-control input-sm" placeholder="🔍关键字搜索" ng-model="self.customer.search"><div auto-height="20" jstree="self.customer" jstree-search="self.customer.search" style="overflow:auto"></div></div></div><div class="modal fade" id="curveModal"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span>&times;</span></button><h4 class="modal-title" ng-bind="self.curveModal.title"></h4></div><div class="modal-body"><div class="form-inline text-right"><div class="form-group form-group-sm has-feedback date"><input type="text" class="form-control" id="modalCalendar" ng-model="self.date" datetimepicker> <i class="form-control-feedback emweb web-calendar"></i></div><div class="btn-group btn-group-sm"><a class="btn btn-primary" href="javascript:void(0)" ng-click="self.channeldetail()">查询</a></div><div class="btn-group btn-group-sm"><a class="btn btn-primary" href="javascript:void(0)" ng-repeat="(key,val) in self.timetype" ng-class="{active:self.timetype_current===key}" ng-click="self.timetypeChange(key)" ng-bind="val"></a></div><div class="btn-group btn-group-sm"><a class="btn btn-info" href="javascript:void(0)" ng-class="{active:self.curveModal.type===\'diff\'}" ng-click="self.lineType(\'diff\');">差值 <i class="emweb web-curve-area"></i> </a><a class="btn btn-info" href="javascript:void(0)" ng-class="{active:self.curveModal.type===\'scale\'}" ng-click="self.lineType(\'scale\');">刻度 <i class="emweb web-line-spacing"></i></a></div></div><div class="panel-body text-center"><div class="highcharts-panel" highcharts="self.timeline"></div></div></div></div></div></div></div>');

angular.module('EMAPP').controller('project.monitor', ["$scope", "$q", "$api", "$filter", "$timeout", "uiGridConstants", function($scope, $q, $api, $filter, $timeout, uiGridConstants) {

    var self = this,
        projectId = EMAPP.Project.current && EMAPP.Project.current._id,
        nowDate = new Date(),
        curveModal = $('#curveModal'),
        // calendar = $('#calendar'),
        modalCalendar = $('#modalCalendar');

    self.groupmode = EMAPP.User.groupmode;

    //显示状态切换
    self.showException = 0;
    self.exceptionChange = function(event, state) {
        self.showException = state;
        self.deviceType.select(self.deviceType.selected);
    };

    self.filter = function() {
        self.gridOptions.enableFiltering = !self.gridOptions.enableFiltering;
        self.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
    };

    self.export = function() {

        if (self.groupmode) {
            self.gridOptions.exporterCsvFilename = EMAPP.title + '_监控_' + self.date.replace(/\-/g, '') + '.csv';
        } else {
            self.gridOptions.exporterCsvFilename = EMAPP.title + '_监控_' + self.deviceType.selected.name + '_' + $filter('date')(nowDate, 'yyyyMMddHHmmss') + '.csv';
        }

        self.gridApi.exporter.csvExport('visible', 'visible', angular.element(document.querySelectorAll('.subContent')));

    };

    //ui-grid配置
    self.gridOptions = {
        onRegisterApi: function(gridApi) {
            gridApi.infiniteScroll.on.needLoadMoreData($scope, function() {
                var defer = $q.defer(),
                    resolve = function() {
                        defer.resolve();
                    },
                    reject = function() {
                        gridApi.infiniteScroll.dataLoaded();
                        defer.reject();
                    };
                (function(promise) {
                    if (promise) {
                        promise.then(function() {
                            gridApi.infiniteScroll.saveScrollPercentage();
                            gridApi.infiniteScroll.dataLoaded(false, true).then(resolve, reject);
                        }, reject);
                    } else {
                        reject();
                    }
                }(self.list(true)));
                return defer.promise;
            });
            self.gridApi = gridApi;
        },
        rowHeight: 34,
        infiniteScrollDown: true,
        enableColumnResizing: true,
        exporterOlderExcelCompatibility: true,
        exporterFieldCallback: function(grid, row, col, value) {
            return {
                name: true,
                addr: true,
                title: true,
                // channel: true,
                // energycategory: true,
                time: true
            }[col.field] ? '="' + (value || '') + '"' : value;
        }
    };

    if (self.groupmode) {
        self.gridOptions.columnDefs = [{
            displayName: '',
            name: '$index',
            type: 'number',
            width: 50,
            minWidth: 50,
            enableColumnMenu: false,
            exporterSuppressExport: true,
            headerCellClass: 'text-center',
            headerCellTemplate: '<div class="ui-grid-cell-contents">序号</div>',
            cellClass: 'text-center',
            cellTemplate: '<div class="ui-grid-cell-contents" ng-bind="grid.renderContainers.body.visibleRowCache.indexOf(row)+1"></div>'
        }, {
            displayName: '项目名称',
            name: 'name',
            width: '*',
            minWidth: 260,
            enableColumnMenu: false,
            enableSorting: false,
            cellTemplate: '<div class="ui-grid-cell-contents"><a target="_blank" ui-sref="dashboard.control({projectid:row.entity.id})" ng-bind="COL_FIELD"></a></div>'
        }, {
            displayName: '单位面积能耗',
            type: "number",
            name: 'uaec',
            width: '*',
            minWidth: 120,
            headerCellClass: 'text-right',
            cellClass: 'text-right'
        }, {
            displayName: '节能等级',
            type: "number",
            name: 'ecslevel',
            width: '*',
            minWidth: 120,
            headerCellClass: 'text-right',
            cellClass: 'text-right'
        }, {
            displayName: '节能标准',
            name: 'ecsdesc',
            width: '*',
            minWidth: 150,
            headerCellClass: 'text-right',
            cellClass: 'text-right'
        }];
        $timeout(function() {
            self.list();
        });
    } else {
        self.gridOptions.columnDefs = [{
            displayName: '',
            name: '$index',
            type: 'number',
            width: 50,
            minWidth: 50,
            enableColumnMenu: false,
            exporterSuppressExport: true,
            headerCellClass: 'text-center',
            headerCellTemplate: '<div class="ui-grid-cell-contents">序号</div>',
            cellClass: 'text-center',
            cellTemplate: '<div class="ui-grid-cell-contents" ng-bind="grid.renderContainers.body.visibleRowCache.indexOf(row)+1"></div>'
        }, {
            displayName: '设备编号',
            type: "number",
            name: 'gatewayid',
            width: '*',
            minWidth: 100
        }, {
            displayName: '设备标识',
            type: "number",
            name: 'addr',
            width: '*',
            minWidth: 120
        }, {
            displayName: '设备编码',
            name: 'tag',
            width: '*',
            minWidth: 160,
            enableColumnMenu: false
        }, {
            displayName: '设备名称',
            name: 'title',
            width: '*',
            minWidth: 300,
            enableColumnMenu: false,
            enableSorting: false,
            cellTemplate: '<div class="ui-grid-cell-contents"><a href="javascript:void(0)" ng-click="grid.appScope.self.channeldetail(grid.appScope.self.curveModal=row.entity)" ng-bind="COL_FIELD"></a></div>'
        }, {
            displayName: '通道名称',
            name: 'channel',
            width: '*',
            minWidth: 150,
            enableColumnMenu: false,
            enableSorting: false
        }, {
            displayName: '设备读数',
            name: 'lastvalue',
            type: 'number',
            width: '*',
            minWidth: 120,
            // enableColumnMenu: false,
            // enableSorting: false,
            headerCellClass: 'text-right',
            cellClass: 'text-right',
            cellTemplate: '<div class="ui-grid-cell-contents"><a href="javascript:void(0)" ng-click="grid.appScope.self.channeldetail(grid.appScope.self.curveModal=row.entity)" ng-bind="COL_FIELD"></a></div>'
        }, {
            displayName: '通讯时间',
            name: 'time',
            width: '*',
            minWidth: 200,
            headerCellClass: 'text-right',
            cellClass: 'text-right',
            cellTemplate: '<div class="ui-grid-cell-contents" ng-if="COL_FIELD">{{COL_FIELD*1|date:\'yyyy年M月dd日 H:mm:ss\'}}</div>'
        }, {
            displayName: '状态',
            name: 'status',
            width: '*',
            minWidth: 120,
            enableColumnMenu: false,
            enableSorting: false,
            headerCellClass: 'text-center',
            cellClass: 'text-center',
            cellTemplate: function() {
                return [
                    '<div class="ui-grid-cell-contents">',
                    '<b ng-show="COL_FIELD===0" class="ng-hide" style="color:#16a085;">正常</b>',
                    '<b ng-show="COL_FIELD===1" class="ng-hide" style="color:#c0392b;">数据异常</b>',
                    '<b ng-show="COL_FIELD===2" class="ng-hide" style="color:#8e44ad;">通讯异常</b>',
                    '</div>'
                ].join('');
            }
        }];
    }

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
                //     }
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

    //获取能耗列表信息
    self.list = function(loadMore) {
        if (loadMore && self.gridOptions.paging && self.gridOptions.paging.count <= (self.gridOptions.paging.pageindex * self.gridOptions.paging.pagesize)) return;
        if (self.groupmode) {
            $api.business.projectdetail({
                time: $filter('date')(self.date, 'yyyyMM'),
                project: EMAPP.Project.ids,
                level: self.level || undefined
            }, function(data) {
                angular.forEach(data = data.result, function(item, id) {
                    item.id = id;
                    this.push(item);
                }, data = []);
                self.gridOptions.data = data;
            });
        } else {
            return $api.business.monitor({
                devicetype: self.deviceType.selected.id,
                project: projectId,
                showexception: self.showException ? 1 : 0,
                mode: 'CHANNEL',
                usesocity: self.customer && self.customer.selected ? 1 : undefined,
                socitynode: self.customer && self.customer.selected,
                pageindex: (loadMore && self.gridOptions.paging ? self.gridOptions.paging.pageindex : 0) + 1,
                pagesize: 50
            }, function(data) {
                data = data.result[projectId] || {};
                angular.forEach(data.detail, function(item) {
                    this.push(item);
                }, data.detail = []);
                if (loadMore) {
                    self.gridOptions.data = self.gridOptions.data.concat(data.detail || []);
                } else {
                    self.gridOptions.data = data.detail || [];
                    self.gridOptions.data.length && $timeout(function() {
                        self.gridApi.core.scrollTo(self.gridOptions.data[0], self.gridOptions.columnDefs[0]);
                    });
                }
                self.gridOptions.paging = data.paging;
                return data;
            }).$promise;
        }
    };

    //modal事件操作
    curveModal.bind('shown.bs.modal', function() {
        $timeout(self.buildLine);
    }).bind('hidden.bs.modal', function() {
        delete self.curveModal;
        delete self.timeline;
    });

    //日期初始值
    self.date = $filter('date')(nowDate, self.groupmode ? 'yyyy-MM' : 'yyyy-MM-dd');

    //日历事件操作
    // calendar.bind('dp.change', function(event) {
    //     event.oldDate && $timeout(self.list);
    // });
    modalCalendar.bind('dp.change', function(event) {
        event.oldDate && $timeout(self.channeldetail);
    });

    //年月日切换
    self.timetype = {
        DAY: '日',
        WEEK: '周',
        MONTH: '月',
        YEAR: '年'
    };
    self.timetype_current = 'DAY';
    self.timetypeChange = function(key) {
        self.timetype_current = key;
        modalCalendar.data('DateTimePicker').format({
            DAY: 'YYYY-MM-DD',
            WEEK: 'YYYY-MM-DD',
            MONTH: 'YYYY-MM',
            YEAR: 'YYYY'
        }[key]).viewMode({
            DAY: 'days',
            WEEK: 'days',
            MONTH: 'months',
            YEAR: 'years'
        }[key]).defaultDate(self.date);
        self.channeldetail();
    };

    //差值与刻度切换
    self.lineType = function(val) {
        self.curveModal.type = val;
        self.buildLine();
    };

    //构建图表
    self.buildLine = function() {
        if (self.curveModal.enable) {
            self.timeline = {
                chart: {
                    type: 'spline'
                },
                title: false,
                xAxis: {
                    type: 'datetime',
                    categories: self.curveModal.categories,
                    labels: {
                        formatter: function() {
                            return $filter('date')(this.value, {
                                DAY: 'H',
                                WEEK: 'M-dd',
                                MONTH: 'M-dd',
                                YEAR: 'yyyy-MM'
                            }[self.timetype_current]);
                        }
                    }
                },
                yAxis: {
                    title: false
                },
                tooltip: {
                    xDateFormat: '%m月%d日',
                    pointFormat: '{series.name}: <span style="color:{point.color};font-weight:700;">{point.y:.2f} ' + self.curveModal.unit + '</span>'
                },
                series: [{
                    name: self.curveModal.title,
                    data: self.curveModal[self.curveModal.type]
                }]
            };

        }
    };

    //获取曲线图信息
    self.channeldetail = function() {

        self.curveModal.type = self.curveModal.type || 'diff';
        self.curveModal.categories = [];
        self.curveModal.diff = [];
        self.curveModal.scale = [];
        self.curveModal.enable = false;

        $api.business.channeldetail({
            id: self.curveModal.id,
            timeformat: self.timetype_current,
            from: self.date.replace(/-/g, ''),
            to: self.date.replace(/-/g, '')
        }, function(data) {

            if (data.result) {
                angular.forEach(data.result.detail, function(item) {
                    self.curveModal.categories.push(item.timepoint);
                    self.curveModal.diff.push(item.value);
                    self.curveModal.scale.push(item.total);
                });

                self.curveModal.enable = true;
                self.curveModal.start = data.result.start;
                self.curveModal.unit = data.result.unit;

                curveModal.hasClass('in') ? self.buildLine() : curveModal.modal('show');
            }

        });

    };

    return self;

}]);