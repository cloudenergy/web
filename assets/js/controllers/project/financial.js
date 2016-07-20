EMAPP.templateCache.put('assets/html/project/financial/view.html?rev=54c02b78aa', '<div class="app-view-project-statistic"><div financial-main></div><div class="modal fade" id="financialModal" ng-if="self.tabActive!==\'deficit\'&&self.modalForm" financial-modal><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span>&times;</span></button><h4 class="modal-title" ng-bind="self.modal.departmentname||self.modal.title||\'&nbsp;\'"></h4></div><div class="modal-body" ng-include="\'assets/html/project/financial/main.html?rev=66a99744d3\'"></div></div></div></div></div>');
EMAPP.templateCache.put('assets/html/project/financial/main.html?rev=66a99744d3', '<ul class="nav nav-tabs"><li ng-if="self.modal" class="active"><a href="javascript:void(0)" ng-bind="self.modal.modaltitle"></a></li><li ng-if="!self.modal" ng-repeat="(key,name) in self.tabs" ng-class="{active:self.tabActive===key}"><a ui-sref="{tab:key}" ng-bind="name"></a></li><li class="pull-right form-inline"><div class="tool-group" ng-if="self.tabActive===\'nearest\'||self.tabActive===\'usage\'" ng-include="\'assets/html/project/financial/tool.html?rev=e3cda57015\'"></div><div class="input-group btn-group-sm"><button type="button" class="btn btn-info" ng-click="self.filter()">筛选<i class="emweb web-filter"></i></button></div><div class="input-group btn-group-sm"><button type="button" class="btn btn-info" ng-click="self.export()">导出<i class="emweb web-export-excel"></i></button></div></li></ul><div class="tab-content"><div class="tab-pane subContent active" auto-height="self.autoHeight" ui-i18n="\'zh-cn\'"><div ui-grid="self.gridOptions" class="grid" ui-grid-auto-resize ui-grid-exporter ui-grid-move-columns ui-grid-resize-columns ui-grid-infinite-scroll></div></div></div>');
EMAPP.templateCache.put('assets/html/project/financial/tool.html?rev=e3cda57015', '<div class="form-group form-group-sm has-feedback date"><input type="text" class="form-control" ng-model="self.fromDate" datetimepicker="{linkRight:\'#\'+self.toDate_ID}" id="{{self.fromDate_ID}}"> <i class="emweb web-calendar form-control-feedback"></i></div><div class="input-group">至</div><div class="form-group form-group-sm has-feedback date"><input type="text" class="form-control" ng-model="self.toDate" datetimepicker="{linkLeft:\'#\'+self.fromDate_ID}" id="{{self.toDate_ID}}" data-use-current="false"> <i class="emweb web-calendar form-control-feedback"></i></div><div class="input-group" ng-if="self.tabActive===\'nearest\'"><div class="btn-group btn-group-sm"><button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown"><span ng-bind="self.manual.selected.title||\'所有充值\'">所有充值</span> <span class="caret"></span></button><ul class="dropdown-menu"><li ng-repeat="item in self.manual" ng-class="{active:self.manual.selected.id===item.id}" ng-click="self.manual.selected=item;"><a href="javascript:void(0)" ng-bind="item.title"></a></li></ul></div></div><div class="input-group btn-group-sm"><button type="button" class="btn btn-success" ng-click="self.tabList();"><i class="emweb web-search"></i> 查询</button></div><div class="input-group btn-group-sm">&nbsp;</div><div class="input-group btn-group-sm">&nbsp;</div>');

(function(controllerFn) {

    angular.module('EMAPP').controller('project.financial', ["$stateParams", "$scope", "$q", "$api", "$filter", "$timeout", "uiGridConstants", "uuid", function($stateParams, $scope, $q, $api, $filter, $timeout, uiGridConstants, uuid) {
        controllerFn.apply(this, arguments);
    }]);

    angular.module('EMAPP').controller('project.financial.modal', ["$stateParams", "$scope", "$q", "$api", "$filter", "$timeout", "uiGridConstants", "uuid", function($stateParams, $scope, $q, $api, $filter, $timeout, uiGridConstants, uuid) {
        arguments[0].modal = true;
        controllerFn.apply(this, arguments);
    }]);

}(function($stateParams, $scope, $q, $api, $filter, $timeout, uiGridConstants, uuid) {

    var self = this,
        nowDate = new Date();

    self.autoHeight = 15;

    //tabs - start
    self.tabs = {
        nearest: '最近充值',
        deficit: '欠费商户',
        all: '全部商户'
    };
    self.tabActive = $stateParams.tab || 'nearest';
    //tabs - end

    //toolbar - start
    //日期选择
    self.fromDate_ID = 'form_' + uuid(8);
    self.toDate_ID = 'to_' + uuid(8);
    self.fromDate = $filter('date')(nowDate, 'yyyy-MM-01');
    self.toDate = $filter('date')(nowDate, 'yyyy-MM-dd');
    // $timeout(function(fromDate, toDate, change) {

    //     fromDate = $('#' + self.fromDate_ID);
    //     toDate = $('#' + self.toDate_ID);

    //     change = function(event) {
    //         $timeout(function() {
    //             event.date && event.oldDate && event.date.format('YYYYMMDD') !== event.oldDate.format('YYYYMMDD') && self.load[self.tabActive]();
    //         });
    //     };

    //     fromDate.bind('dp.change', change);
    //     toDate.bind('dp.change', change);

    // });

    //充值方式
    self.manual = [{
        id: 0,
        title: '所有充值',
        val: undefined
    }, {
        id: 1,
        title: '自助充值',
        val: 0
    }, {
        id: 2,
        title: '人工充值',
        val: 1
    }];
    self.manual.selected = self.manual[0];

    //订单状态
    self.status = [{
        key: undefined,
        title: '所有状态'
    }, {
        key: 'CHECKING',
        title: '等待支付'
    }, {
        key: 'CHECKFAILED',
        title: '支付失败'
    }, {
        key: 'PROCESSING',
        title: '正在处理'
    }, {
        key: 'FAILED',
        title: '处理失败'
    }, {
        key: 'SUCCESS',
        title: '支付完成'
    }];
    self.status.selected = self.status[0];
    angular.forEach(self.status, function(item) {
        this[item.key] = item.title;
    }, self.status);

    //筛选
    self.filter = function() {
        self.gridOptions.enableFiltering = !self.gridOptions.enableFiltering;
        self.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
    };

    //导出
    self.export = function() {
        var name = $filter('date')(new Date(), 'yyyyMMdd_HHmmss');
        if (self.tabActive === 'nearest') {
            name = [
                self.fromDate.replace(/-/g, ''),
                self.toDate.replace(/-/g, '')
            ].join('_');
        }
        self.gridOptions.exporterCsvFilename = EMAPP.title + '_财务_' + (self.modal ? ((self.modal.departmentname || self.modal.title || '') + '_' + self.modal.modaltitle) : self.tabs[self.tabActive]) + '_' + name + '.csv';
        self.gridApi.exporter.csvExport('visible', 'visible', angular.element(document.querySelectorAll('.subContent')));
    };
    //toolbar - end

    //催缴欠费
    self.reminder = function(entity) {
        $api.message.arreargereminder({
            uid: entity.departmentaccount,
            project: EMAPP.Project.current._id,
            gateway: 'EMAIL'
        }, function() {
            entity.remindercount += 1;
        });
    };

    self.openModel = function(entity, tab, title) {
        self.modalForm = entity;
        self.modalForm.tab = tab;
        self.modalForm.modaltitle = title;
    };

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
                }(self.load[self.tabActive](true)));
                return defer.promise;
            });

            self.gridApi = gridApi;

        },
        rowHeight: 34,
        infiniteScrollDown: true,
        enableColumnResizing: true,
        exporterOlderExcelCompatibility: true,
        exporterHeaderFilter: function(displayName) {
            if (displayName === '充值金额(元)') {
                return displayName + '(合计：' + self.statistic.sumOfAmount + ')';
            }
            if (displayName === '欠费金额(元)') {
                return displayName + '(合计：' + self.statistic.sumOfArrears + ')';
            }
            if (displayName === '商户余额(元)') {
                return displayName + '(合计：' + self.statistic.sumOfBalance + ')';
            }
            return displayName;
        },
        exporterFieldCallback: function(grid, row, col, value) {
            return {
                title: true,
                account: true,
                timepaid: true,
                timecreate: true,
                departmentname: true,
                departmentaccount: true,
                arrearagetime: true,
                consists: true,
                timepoint: true
            }[col.field] ? '="' + (value || '') + '"' : value;
        }
    };

    self.load = {
        nearest: function(loadMore) {
            if (loadMore && self.gridOptions.paging && self.gridOptions.paging.count <= (self.gridOptions.paging.pageindex * self.gridOptions.paging.pagesize)) return;
            return $api.business.recentchargelog({
                from: self.fromDate.replace(/-/g, ''),
                to: self.toDate.replace(/-/g, ''),
                // status: self.status.selected.key,
                pageindex: (loadMore && self.gridOptions.paging ? self.gridOptions.paging.pageindex : 0) + 1,
                pagesize: 50,
                project: [{
                    id: EMAPP.Project.current._id,
                    ismanual: self.manual.selected.val,
                    department: self.modal ? self.modal.departmentaccount || self.modal.account : undefined
                }]
            }, function(data) {
                data = data.result[EMAPP.Project.current._id] || {};
                angular.forEach(data.detail, function(item) {
                    item.status = self.status[item.status] || item.status;
                    item.timepaid = item.timepaid && $filter('date')(item.timepaid * 1000, 'yyyy年M月dd日 H:mm:ss') || '';
                    item.timecreate = item.timecreate && $filter('date')(item.timecreate * 1000, 'yyyy年M月dd日 H:mm:ss') || '';
                });
                if (loadMore) {
                    self.gridOptions.data = self.gridOptions.data.concat(data.detail || []);
                } else {
                    self.gridOptions.data = data.detail || [];
                    self.gridOptions.data.length && $timeout(function() {
                        self.gridApi.core.scrollTo(self.gridOptions.data[0], self.gridOptions.columnDefs[0]);
                    });
                }
                self.gridOptions.paging = data.paging;
                self.statistic = data.statistic;
                return data;
            }).$promise;
        },
        deficit: function(loadMore) {
            return self.load.departments(loadMore);
        },
        all: function(loadMore) {
            return self.load.departments(loadMore);
        },
        departments: function(loadMore) {
            if (loadMore && self.gridOptions.paging && self.gridOptions.paging.count <= (self.gridOptions.paging.pageindex * self.gridOptions.paging.pagesize)) return;
            return $api.business.departments({
                project: EMAPP.Project.current._id,
                amount: self.tabActive === 'all' ? undefined : 0,
                pageindex: (loadMore && self.gridOptions.paging ? self.gridOptions.paging.pageindex : 0) + 1,
                pagesize: 50
            }, function(data) {
                data = data.result[EMAPP.Project.current._id] || {};
                angular.forEach(data.detail, function(item) {
                    item.arrearagetime = item.arrearagetime && $filter('date')(item.arrearagetime * 1000, 'yyyy年M月dd日 H:mm:ss') || '';
                });
                if (loadMore) {
                    self.gridOptions.data = self.gridOptions.data.concat(data.detail || []);
                } else {
                    self.gridOptions.data = data.detail || [];
                    self.gridOptions.data.length && $timeout(function() {
                        self.gridApi.core.scrollTo(self.gridOptions.data[0], self.gridOptions.columnDefs[0]);
                    });
                }
                self.gridOptions.paging = data.paging;
                self.statistic = data.statistic;
                return data;
            }).$promise;
        },
        usage: function(loadMore) {
            if (loadMore && self.gridOptions.paging && self.gridOptions.paging.count <= (self.gridOptions.paging.pageindex * self.gridOptions.paging.pagesize)) return;
            return $api.business.departmentusage({
                from: self.fromDate.replace(/-/g, ''),
                to: self.toDate.replace(/-/g, ''),
                pageindex: (loadMore && self.gridOptions.paging ? self.gridOptions.paging.pageindex : 0) + 1,
                pagesize: 50,
                project: [{
                    id: EMAPP.Project.current._id,
                    account: self.modal ? self.modal.departmentaccount || self.modal.account : undefined
                }]
            }, function(data) {
                data = data.result[EMAPP.Project.current._id] || {};
                if (loadMore) {
                    self.gridOptions.data = self.gridOptions.data.concat(data.detail || []);
                } else {
                    self.gridOptions.data = data.detail || [];
                    self.gridOptions.data.length && $timeout(function() {
                        self.gridApi.core.scrollTo(self.gridOptions.data[0], self.gridOptions.columnDefs[0]);
                    });
                }
                angular.forEach(self.gridOptions.data, function(item) {
                    item.timepoint = item.timepoint && $filter('date')(item.timepoint * 1000, 'yyyy年M月dd日 H:mm:ss') || '';
                });
                self.gridOptions.paging = data.paging;
                return data;
            }).$promise;
        }
    };

    self.tabList = function() {
        var headerCellTemplate = EMAPP.templateCache.get('ui-grid/uiGridHeaderCell');
        switch (self.tabActive) {
            case 'nearest':
                self.gridOptions.columnDefs = [{
                    displayName: '',
                    name: '$index',
                    type: 'number',
                    width: 50,
                    minWidth: 50,
                    enablePinning: false,
                    enableColumnMenu: false,
                    exporterSuppressExport: true,
                    headerCellClass: 'text-center',
                    headerCellTemplate: '<div class="ui-grid-cell-contents">序号</div>',
                    cellClass: 'text-center',
                    cellTemplate: '<div class="ui-grid-cell-contents" ng-bind="grid.renderContainers.body.visibleRowCache.indexOf(row)+1"></div>'
                }, {
                    displayName: '商户名称',
                    name: 'title',
                    width: '*',
                    minWidth: 200,
                    enablePinning: false,
                    enableColumnMenu: false,
                    enableSorting: false,
                    cellTemplate: '<div class="ui-grid-cell-contents"><a href="javascript:void(0)" data-toggle="modal" data-target="#financialModal" ng-click="grid.appScope.self.openModel(row.entity,\'nearest\',\'充值记录\')">{{COL_FIELD}}</a></div>'
                }, {
                    displayName: '商户账号',
                    type: "number",
                    name: 'account',
                    width: '*',
                    minWidth: 120,
                    enableColumnMenu: false
                }, {
                    displayName: '联系电话',
                    type: "number",
                    name: 'mobile',
                    width: '*',
                    minWidth: 100,
                    enableColumnMenu: false
                }, {
                    displayName: '充值金额(元)',
                    name: 'amount',
                    type: 'number',
                    width: '*',
                    minWidth: 200,
                    headerCellTemplate: function() {
                        return headerCellTemplate.replace('</sub></span></div><div role="button" tabindex="0"', '</sub></span><div class="text-info">合计：{{grid.appScope.self.statistic.sumOfAmount}}</div></div><div role="button" tabindex="0"');
                    }
                }, {
                    displayName: '本次余额(元)',
                    name: 'balance',
                    type: 'number',
                    width: '*',
                    minWidth: 120
                }, {
                    displayName: '充值方式',
                    name: 'channel',
                    width: '*',
                    minWidth: 120,
                    enableColumnMenu: false
                }, {
                    displayName: '充值时间',
                    name: 'timepaid',
                    type: 'date',
                    width: '*',
                    minWidth: 200
                }, {
                    displayName: '操作账号',
                    type: "number",
                    name: 'operator',
                    width: '*',
                    minWidth: 120,
                    enableColumnMenu: false
                }, {
                    displayName: '订单状态',
                    name: 'status',
                    width: '*',
                    minWidth: 100,
                    headerCellClass: 'text-center',
                    cellClass: 'text-center',
                    cellTemplate: '<div class="ui-grid-cell-contents" ng-class="{\'text-danger\':COL_FIELD!==\'支付完成\'}">{{COL_FIELD}}</div>'
                }, {
                    displayName: '订单时间',
                    name: 'timecreate',
                    type: 'date',
                    width: '*',
                    minWidth: 200,
                    enablePinning: false
                }];
                self.modal && self.gridOptions.columnDefs.splice(1, 3);
                break;
            case 'deficit':
                self.gridOptions.rowHeight = 38;
                self.gridOptions.columnDefs = [{
                    displayName: '',
                    name: '$index',
                    type: 'number',
                    width: 50,
                    minWidth: 50,
                    enablePinning: false,
                    enableColumnMenu: false,
                    exporterSuppressExport: true,
                    headerCellClass: 'text-center',
                    headerCellTemplate: '<div class="ui-grid-cell-contents">序号</div>',
                    cellClass: 'text-center',
                    cellTemplate: '<div class="ui-grid-cell-contents" ng-bind="grid.renderContainers.body.visibleRowCache.indexOf(row)+1"></div>'
                }, {
                    displayName: '商户名称',
                    name: 'departmentname',
                    width: '*',
                    minWidth: 200,
                    enablePinning: false,
                    enableColumnMenu: false
                }, {
                    displayName: '商户账号',
                    name: 'departmentaccount',
                    width: '*',
                    minWidth: 120,
                    enableColumnMenu: false
                }, {
                    displayName: '联系电话',
                    type: "number",
                    name: 'mobile',
                    width: '*',
                    minWidth: 100,
                    enableColumnMenu: false
                }, {
                    displayName: '欠费金额(元)',
                    type: "number",
                    name: 'amount',
                    width: '*',
                    minWidth: 200,
                    headerCellTemplate: function() {
                        return headerCellTemplate.replace('</sub></span></div><div role="button" tabindex="0"', '</sub></span><div class="text-info">合计：{{grid.appScope.self.statistic.sumOfArrears}}</div></div><div role="button" tabindex="0"');
                    }
                }, {
                    displayName: '欠费时间',
                    name: 'arrearagetime',
                    type: 'date',
                    width: '*',
                    minWidth: 200
                }, {
                    displayName: '已催次数',
                    type: "number",
                    name: 'remindercount',
                    width: 100,
                    minWidth: 100
                }, {
                    displayName: '',
                    name: 'send',
                    width: 100,
                    minWidth: 100,
                    enablePinning: false,
                    enableColumnMenu: false,
                    exporterSuppressExport: true,
                    headerCellClass: 'text-center',
                    headerCellTemplate: '<div class="ui-grid-cell-contents">催缴通知</div>',
                    cellClass: 'text-center',
                    cellTemplate: '<div class="ui-grid-cell-contents"><a href="javascript:void(0)" class="btn btn-xs btn-info" ng-click="grid.appScope.self.reminder(row.entity)">催缴欠费</a></div>'
                }];
                break;
            case 'all':
                self.gridOptions.columnDefs = [{
                    displayName: '',
                    name: '$index',
                    type: 'number',
                    width: 50,
                    minWidth: 50,
                    enablePinning: false,
                    enableColumnMenu: false,
                    exporterSuppressExport: true,
                    headerCellClass: 'text-center',
                    headerCellTemplate: '<div class="ui-grid-cell-contents">序号</div>',
                    cellClass: 'text-center',
                    cellTemplate: '<div class="ui-grid-cell-contents" ng-bind="grid.renderContainers.body.visibleRowCache.indexOf(row)+1"></div>'
                }, {
                    displayName: '商户名称',
                    name: 'departmentname',
                    width: '*',
                    minWidth: 200,
                    enablePinning: false,
                    enableColumnMenu: false
                }, {
                    displayName: '商户账号',
                    name: 'departmentaccount',
                    width: '*',
                    minWidth: 120,
                    enableColumnMenu: false
                }, {
                    displayName: '联系电话',
                    type: "number",
                    name: 'mobile',
                    width: '*',
                    minWidth: 100,
                    enableColumnMenu: false
                }, {
                    displayName: '商户余额(元)',
                    type: "number",
                    name: 'amount',
                    width: '*',
                    minWidth: 200,
                    headerCellTemplate: function() {
                        return headerCellTemplate.replace('</sub></span></div><div role="button" tabindex="0"', '</sub></span><div class="text-info">合计：{{grid.appScope.self.statistic.sumOfBalance}}</div></div><div role="button" tabindex="0"');
                    }
                }, {
                    displayName: '',
                    name: 'nearest',
                    width: 100,
                    minWidth: 100,
                    enableColumnMenu: false,
                    exporterSuppressExport: true,
                    headerCellClass: 'text-center',
                    headerCellTemplate: '<div class="ui-grid-cell-contents">充值记录</div>',
                    cellClass: 'text-center',
                    cellTemplate: '<div class="ui-grid-cell-contents"><a href="javascript:void(0)" data-toggle="modal" data-target="#financialModal" ng-click="grid.appScope.self.openModel(row.entity,\'nearest\',\'充值记录\')">充值记录</a></div>'
                }, {
                    displayName: '',
                    name: 'usage',
                    width: 100,
                    minWidth: 100,
                    enablePinning: false,
                    enableColumnMenu: false,
                    exporterSuppressExport: true,
                    headerCellClass: 'text-center',
                    headerCellTemplate: '<div class="ui-grid-cell-contents">消费清单</div>',
                    cellClass: 'text-center',
                    cellTemplate: '<div class="ui-grid-cell-contents"><a href="javascript:void(0)" data-toggle="modal" data-target="#financialModal" ng-click="grid.appScope.self.openModel(row.entity,\'usage\',\'消费清单\')">消费清单</a></div>'
                }];
                break;
            case 'usage':
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
                    displayName: '消费项目',
                    name: 'consists',
                    width: '*',
                    minWidth: 200,
                    enableColumnMenu: false
                }, {
                    displayName: '消费金额(元)',
                    type: "number",
                    name: 'cost',
                    width: '*',
                    minWidth: 120
                }, {
                    displayName: '记账时间',
                    name: 'timepoint',
                    type: 'date',
                    width: '*',
                    minWidth: 200
                }];
                break;
        }

        self.load[self.tabActive]();

    };

    !$stateParams.modal && self.tabList();

    return self;

}));