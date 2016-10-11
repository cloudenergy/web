angular.module('EMAPP').controller('project.statistic', ["$templateCache", "$api", "$filter", "$timeout", "$stateParams", "uiGridConstants", function ($templateCache, $api, $filter, $timeout, $stateParams, uiGridConstants) {

    var self = this,
        nowDate = new Date(),
        projectId = EMAPP.Project.current && EMAPP.Project.current._id;

    self.groupmode = EMAPP.User.groupmode;

    !self.groupmode && $api.energy.info({
        project: EMAPP.Project.ids
    }, function (data) {
        angular.forEach(data.result.energy || {}, function (item) {
            this.push(item)
        }, self.energyData = [])
    });

    self.filter = function () {
        self.gridOptions.enableFiltering = !self.gridOptions.enableFiltering;
        self.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
    };

    self.export = function () {

        switch (self.tabActive) {
            case 'settlereport':
            case 'monthlyreport':
            case 'projectreport':
                self.gridOptions.exporterCsvFilename = EMAPP.title + '_统计_' + self.tabs[self.tabActive] + '_' + self.startDate.replace(/\-/g, '') + '_' + self.endDate.replace(/\-/g, '') + '.csv';
                break;
            case 'dailyreport':
                self.gridOptions.exporterCsvFilename = EMAPP.title + '_统计_' + self.tabs[self.tabActive] + '_' + self.startDate.replace(/\-/g, '') + '.csv';
                break;
        }

        self.gridApi.exporter.csvExport('visible', 'visible', angular.element(document.querySelectorAll('.subContent')));

    };

    (self.grid_timetype = function (key) {
        self.grid_timetype_current = key;
        self.rebuildData && self.rebuildData(self.gridOptions.data);
    })('usage');

    self.rebuildData = function (data) {
        // if (self.tabActive === 'settlereport') {
        //     angular.forEach(data, function(item) {
        //         item.min = (Math.round(item.min * 100) / 100);
        //         item.max = (Math.round(item.max * 100) / 100);
        //         item.sum = (Math.round(item.sum * 100) / 100);
        //     })
        // }
        if (self.tabActive === 'monthlyreport') {
            angular.forEach(data, function (item) {
                item.monthlySum = (Math.round(item.monthlySum * 100) / 100);
                angular.forEach(item[self.grid_timetype_current], function (val, key) {
                    item['day' + $filter('date')(key, 'yyyyMMdd')] = val;
                })
            })
        }
        if (self.tabActive === 'dailyreport') {
            angular.forEach(data, function (item) {
                item.dailysum = (Math.round(item.dailysum * 100) / 100);
                angular.forEach(item[self.grid_timetype_current], function (val, key) {
                    item['hour' + $filter('date')(key, 'H')] = val;
                })
            })
        }
        self.gridOptions.data = data;
    };

    self.gridOptions = {
        onRegisterApi: function (gridApi) {
            self.gridApi = gridApi;
        },
        rowHeight: 34,
        enableColumnResizing: true,
        exporterOlderExcelCompatibility: true,
        exporterHeaderFilter: function (displayName) {
            if (displayName === '能耗总值') {
                return displayName + '(合计：' + self.statistic.sum + ')';
            }
            if (displayName === '费用') {
                return displayName + '(合计：' + self.statistic.cost + ')';
            }
            return displayName;
        },
        exporterFieldCallback: function (grid, row, col, value) {
            return {
                name: true,
                'id.substr(12,12)': true,
                'channeldid.substr(12,12)': true
            }[col.field] ? '="' + (value || '') + '"' : value
        }
    };

    self.tabs = self.groupmode ? {
        projectreport: '项目总用能'
    } : {
        settlereport: '结算报表',
        monthlyreport: '月报表',
        dailyreport: '日报表'
    };

    self.tabClick = function (tabKey) {

        self.startDate = $filter('date')(nowDate, tabKey === 'dailyreport' ? 'yyyy-MM-dd' : 'yyyy-MM-01');
        self.endDate = $filter('date')(nowDate, 'yyyy-MM-dd');

        self.rangeDay = {
            settlereport: 183,
            monthlyreport: 31
        }[tabKey] || 0;

        self.tabActive = tabKey;

        self.report(tabKey);

    };

    self.report = function (tabKey) {

        var energy = self.energyData && self.energyData.selected && self.energyData.selected.id,
            headerCellTemplate = $templateCache.get('ui-grid/uiGridHeaderCell'),
            data = {
                project: []
            };

        angular.forEach(EMAPP.Project, function (item) {
            data.project.push({
                id: item._id,
                energy: energy || undefined
            })
        });

        switch (tabKey) {
            case 'settlereport':
            case 'monthlyreport':
            case 'projectreport':
                data.from = self.startDate.replace(/\-/g, '');
                data.to = self.endDate.replace(/\-/g, '');
                break;
            case 'dailyreport':
                data.time = self.startDate.replace(/\-/g, '');
                break;
        }

        switch (tabKey) {
            case 'settlereport':
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
                    displayName: '传感器名称',
                    name: 'name',
                    width: '*',
                    minWidth: 260
                }, {
                    displayName: moment(self.startDate).format('YYYY年M月D日'),
                    name: 'min',
                    type: 'number',
                    width: '*',
                    minWidth: 80,
                    headerCellClass: 'text-right',
                    cellClass: 'text-right'
                }, {
                    displayName: moment(self.endDate).format('YYYY年M月D日'),
                    name: 'max',
                    type: 'number',
                    width: '*',
                    minWidth: 80,
                    headerCellClass: 'text-right',
                    cellClass: 'text-right'
                }, {
                    displayName: '能耗总值',
                    name: 'sum',
                    type: 'number',
                    width: '*',
                    minWidth: 130,
                    headerCellClass: 'text-right',
                    cellClass: 'text-right',
                    headerCellTemplate: function () {
                        return headerCellTemplate.replace('</sub></span></div><div role="button" tabindex="0"', '</sub></span><div class="text-info">合计：{{grid.appScope.self.statistic.sum}}</div></div><div role="button" tabindex="0"');
                    }
                }, {
                    displayName: '单价',
                    name: 'price',
                    type: 'number',
                    width: '*',
                    minWidth: 200,
                    headerCellClass: 'text-right',
                    cellClass: 'text-right'
                }, {
                    displayName: '费用',
                    name: 'cost',
                    type: 'number',
                    width: '*',
                    minWidth: 130,
                    headerCellClass: 'text-right',
                    cellClass: 'text-right',
                    headerCellTemplate: function () {
                        return headerCellTemplate.replace('</sub></span></div><div role="button" tabindex="0"', '</sub></span><div class="text-info">合计：{{grid.appScope.self.statistic.cost}}</div></div><div role="button" tabindex="0"');
                    }
                }];
                break;
            case 'monthlyreport':
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
                    displayName: '传感器名称',
                    name: 'name',
                    width: '*',
                    minWidth: 180
                }, {
                    displayName: '月能耗',
                    type: "number",
                    name: 'monthlySum',
                    width: '*',
                    minWidth: 70,
                    headerCellClass: 'text-right',
                    cellClass: 'text-right'
                }, {
                    displayName: '日平均',
                    type: "number",
                    name: 'dailyAvg',
                    width: '*',
                    minWidth: 70,
                    headerCellClass: 'text-right',
                    cellClass: 'text-right'
                }];
                break;
            case 'dailyreport':
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
                    displayName: '传感器名称',
                    name: 'name',
                    width: '*',
                    minWidth: 200
                }, {
                    displayName: '日能耗',
                    type: "number",
                    name: 'dailysum',
                    width: '*',
                    minWidth: 70,
                    headerCellClass: 'text-right',
                    cellClass: 'text-right'
                }];
                break;
            case 'projectreport':
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
                    minWidth: 260
                }, {
                    displayName: '总用能',
                    type: "number",
                    name: 'consumption',
                    width: '*',
                    minWidth: 160,
                    headerCellClass: 'text-right',
                    cellClass: 'text-right'
                }, {
                    displayName: '总费用',
                    type: "number",
                    name: 'cost',
                    width: '*',
                    minWidth: 160,
                    headerCellClass: 'text-right',
                    cellClass: 'text-right'
                }, {
                    displayName: '单位用能',
                    type: "number",
                    name: 'uaec',
                    width: '*',
                    minWidth: 160,
                    headerCellClass: 'text-right',
                    cellClass: 'text-right'
                }, {
                    displayName: '单位电能',
                    type: "number",
                    name: 'uaeec',
                    width: '*',
                    minWidth: 160,
                    headerCellClass: 'text-right',
                    cellClass: 'text-right'
                }];
                break;
        }

        $api.business[tabKey](data, function (data) {
            switch (tabKey) {
                case 'settlereport':
                    data = data.result[projectId] || {};
                    self.statistic = data.statistic || {};
                    data = data.detail || [];
                    self.gridOptions.columnDefs.push({
                        displayName: '设备ID',
                        name: 'id.substr(12,12)',
                        type: 'number',
                        width: '*',
                        minWidth: 120
                    }, {
                        //     displayName: '设备编号',
                        //     name: 'gatewayid',
                        //     width: '*',
                        //     minWidth: 100
                        // }, {
                        displayName: '设备编码',
                        name: 'tag',
                        width: '*',
                        minWidth: 160,
                        enableColumnMenu: false
                    }, {
                        displayName: '能耗分类',
                        name: 'energy',
                        width: '*',
                        minWidth: 100
                    });
                    break;
                case 'monthlyreport':
                    data = data.result[projectId] || [];
                    if (data.length) {
                        angular.forEach(data[0].usage, function (val, key) {
                            this.push({
                                displayName: $filter('date')(key, 'M-d'),
                                name: 'day' + $filter('date')(key, 'yyyyMMdd'),
                                width: '*',
                                minWidth: 60,
                                headerCellClass: 'text-right',
                                cellClass: 'text-right'
                            })
                        }, self.gridOptions.columnDefs);
                        self.gridOptions.columnDefs.push({
                            displayName: '设备ID',
                            type: "number",
                            name: 'channeldid.substr(12,12)',
                            width: '*',
                            minWidth: 120
                        }, {
                            //     displayName: '设备编号',
                            //     name: 'gatewayid',
                            //     width: '*',
                            //     minWidth: 100
                            // }, {
                            displayName: '设备编码',
                            name: 'tag',
                            width: '*',
                            minWidth: 160,
                            enableColumnMenu: false
                        }, {
                            displayName: '能耗分类',
                            name: 'energy',
                            width: '*',
                            minWidth: 100
                        });
                    }
                    break;
                case 'dailyreport':
                    data = data.result[projectId] || [];
                    if (data.length) {
                        angular.forEach(data[0].usage, function (val, key) {
                            key = $filter('date')(key, 'H');
                            this.push({
                                displayName: key + '时',
                                name: 'hour' + key,
                                width: '*',
                                minWidth: 50,
                                headerCellClass: 'text-right',
                                cellClass: 'text-right'
                            });
                        }, self.gridOptions.columnDefs);
                    }
                    self.gridOptions.columnDefs.push({
                        displayName: '设备ID',
                        type: "number",
                        name: 'channeldid.substr(12,12)',
                        width: '*',
                        minWidth: 120
                    }, {
                        //     displayName: '设备编号',
                        //     name: 'gatewayid',
                        //     width: '*',
                        //     minWidth: 100
                        // }, {
                        displayName: '设备编码',
                        name: 'tag',
                        width: '*',
                        minWidth: 160,
                        enableColumnMenu: false
                    }, {
                        displayName: '能耗分类',
                        name: 'energy',
                        width: '*',
                        minWidth: 100
                    });
                    break;
                case 'projectreport':
                    angular.forEach(data.result, function (items) {
                        angular.forEach(items, function (val, key) {
                            items[key] = key === 'name' ? val : (Math.round(val * 100) / 100)
                        });
                        this.push(items);
                    }, data = []);
                    break;
            }

            self.rebuildData(data);

        });

    };

    self.tabClick(self.groupmode ? 'projectreport' : $stateParams.tab || 'settlereport');

    return self;

}]);