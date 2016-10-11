angular.module('EMAPP').controller('project.control', ["$scope", "$timeout", "$api", "SweetAlert", function ($scope, $timeout, $api, SweetAlert) {

    var self = this,
        projectId = EMAPP.Project.current && EMAPP.Project.current._id;

    //设备接口
    projectId && $api.device.type({
        project: projectId
    }, function (data) {

        self.deviceType = data.result;

        self.deviceType.length && (self.deviceType.select = function (item) {
            self.deviceType.selected = item;
            self.monitorData = [];
            self.list();
        })(self.deviceType[0]);

    });

    //查询社会属性
    projectId && $api.customer.info({
        project: projectId,
        onlynode: 1
    }, function (data) {
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
            conditionalselect: function (node, event) {
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
            angular.forEach(list, function (item, index) {
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
        flow: function (event) {
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
    self.list = function (loadMore) {

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
            }, function (data) {

                data = data.result[projectId] || {};

                self.monitorData = loadMore ? self.monitorData.concat(data.detail) : data.detail;
                self.paging.total = data.paging.count;

            });

        }

    };

    self.modalSend = function (item) {
        self.modalForm = {
            sensorid: item.id
        };
        // self.modalForm.command = self.modalSensor.id;
        // self.modalForm.data = self.modalSensor.id;
    };

    self.modalReset = function () {
        delete self.modalForm.command;
        delete self.modalForm.data;
    };

    self.sendCommand = function () {
        $api.control.through(self.modalForm, function (data) {
            //错误代码提示
            (function (code, message) {
                if (code) {
                    angular.forEach({
                        60000001: '发送超时',
                        60000002: '发送超时',
                        60000003: '发送超时'
                    }, function (val, key) {
                        if (parseInt(code) === parseInt(key)) {
                            message = val;
                        }
                    });
                    message && SweetAlert.warning.apply(SweetAlert, angular.isArray(message) ? message : [message]);
                } else {
                    SweetAlert.success('发送成功');
                }
            }(data.code, data.message));
        });
    };

    $('#controlSendCommand').on('hidden.bs.modal', function () {
        $timeout(function () {
            delete self.modalForm;
            $scope.formSendCommand.$setPristine();
        });
        return false;
    });
    $('#controlSendCommand input[name=command]').on('invalid', function () {
        $timeout($scope.formSendCommand.command.$setDirty);
        return false;
    });
    $('#controlSendCommand input[name=data]').on('invalid', function () {
        $timeout($scope.formSendCommand.data.$setDirty);
        return false;
    });

}]);