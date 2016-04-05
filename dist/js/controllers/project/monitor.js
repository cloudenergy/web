EMAPP.templateCache.put("dist/html/project/monitor.html?rev=4068718495",'<div class="app-view-project-monitor text-center ng-cloak"><div class="nav nav-tabs"><div ng-if="!self.groupmode" class="btn-group"><a href="javascript:void(0)" class="btn btn-sm btn-primary" ng-class="{active:self.deviceType.selected.id===item.id}" ng-repeat="item in self.deviceType" ng-click="self.deviceType.select(item)" ng-bind="item.name"></a></div><div class="pull-right form-inline"><div ng-if="!self.groupmode" class="btn-group"><b style="vertical-align:middle">树形列表：</b> <input type="checkbox" flatui-switch flatui-switch-change="self.customerChange" ng-checked="self.showCustomer" data-toggle="switch" data-on-color="info" data-off-color="primary" data-on-text="显示" data-off-text="隐藏"></div><div ng-if="!self.groupmode" class="btn-group"><b style="vertical-align:middle">状态：</b><div class="bootstrap-switch-square"><input type="checkbox" flatui-switch flatui-switch-change="self.exceptionChange" ng-checked="self.showException" data-toggle="switch" data-on-color="warning" data-off-color="primary" data-on-text="异常" data-off-text="正常"></div></div><div ng-show="self.groupmode" class="form-group form-group-sm has-feedback date ng-hide"><input type="text" class="form-control" id="calendar" ng-model="self.date" data-format="YYYY-MM" datetimepicker> <i class="form-control-feedback em em-calendar"></i></div><div ng-if="self.groupmode" class="form-group form-group-sm"><select class="form-control select select-primary select-block" monitor-select><option value="">全部</option><option value="1">0-1.8 KWh</option><option value="2">1.8-3.8 KWh</option><option value="3">3.8-5.7 KWh</option><option value="4">5.7-7.7 KWh</option><option value="5">7.7-∞ KWh</option></select></div><div class="input-group btn-group-sm"><button type="button" class="btn btn-info" ng-click="self.filter()">筛选<i class="em em-filter"></i></button></div><div class="input-group btn-group-sm"><button type="button" class="btn btn-info" ng-click="self.export()">导出<i class="em em-export-excel"></i></button></div></div></div><div class="tab-content row"><div class="tab-pane active" ng-class="{true:\'col-xs-10\',false:\'col-xs-12\'}[!!self.showCustomer]" auto-height ui-i18n="\'zh-cn\'"><div ui-grid="self.gridOptions" class="grid text-left" ui-grid-exporter ui-grid-auto-resize ui-grid-move-columns ui-grid-resize-columns ui-grid-infinite-scroll></div></div><div class="tab-pane col-xs-2 text-left" ng-class="{active:self.showCustomer}" style="padding-left:0"><input type="text" class="form-control input-sm" placeholder="🔍关键字搜索" ng-model="self.customer.search"><div auto-height jstree="self.customer" jstree-search="self.customer.search" style="overflow:auto"></div></div></div><div class="modal fade" id="curveModal"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span>&times;</span></button><h4 class="modal-title" ng-bind="self.curveModal.title"></h4></div><div class="modal-body"><div class="form-inline text-right"><div class="form-group form-group-sm has-feedback date"><input type="text" class="form-control" id="modalCalendar" ng-model="self.date" datetimepicker> <i class="form-control-feedback em em-calendar"></i></div><div class="btn-group btn-group-sm"><a class="btn btn-primary" href="javascript:void(0)" ng-repeat="(key,val) in self.timetype" ng-class="{active:self.timetype_current===key}" ng-click="self.timetypeChange(key)" ng-bind="val"></a></div><div class="btn-group btn-group-sm"><a class="btn btn-info" href="javascript:void(0)" ng-class="{active:self.curveModal.type===\'diff\'}" ng-click="self.lineType(\'diff\');">差值 <i class="em em-curve-area"></i></a> <a class="btn btn-info" href="javascript:void(0)" ng-class="{active:self.curveModal.type===\'scale\'}" ng-click="self.lineType(\'scale\');">刻度 <i class="em em-line-spacing"></i></a></div></div><div class="panel-body text-center"><div class="highcharts-panel" highcharts="self.timeline"></div></div></div></div></div></div></div>'),EMAPP.register.controller("project.monitor",["$scope","$q","$api","$filter","$timeout","uiGridConstants",function(e,t,i,n,l,a){var d=this,o=EMAPP.Project.current&&EMAPP.Project.current._id,r=new Date,c=$("#curveModal"),s=$("#calendar"),p=$("#modalCalendar");return d.groupmode=EMAPP.User.groupmode,d.groupmode||(d.showCustomer=1,d.customerChange=function(e,t){d.showCustomer=t}),d.showException=0,d.exceptionChange=function(e,t){d.showException=t,d.deviceType.select(d.deviceType.selected)},d.filter=function(){d.gridOptions.enableFiltering=!d.gridOptions.enableFiltering,d.gridApi.core.notifyDataChange(a.dataChange.COLUMN)},d["export"]=function(){d.groupmode?d.gridOptions.exporterCsvFilename=EMAPP.title+"_监控_"+d.date.replace(/\-/g,"")+".csv":d.gridOptions.exporterCsvFilename=EMAPP.title+"_监控_"+d.deviceType.selected.name+"_"+n("date")(r,"yyyyMMddHHmmss")+".csv",d.gridApi.exporter.csvExport("visible","visible",angular.element(document.querySelectorAll(".subContent")))},d.gridOptions={onRegisterApi:function(i){i.infiniteScroll.on.needLoadMoreData(e,function(){var e=t.defer(),n=function(){e.resolve()},l=function(){i.infiniteScroll.dataLoaded(),e.reject()};return function(e){e?e.then(function(){i.infiniteScroll.saveScrollPercentage(),i.infiniteScroll.dataLoaded(!1,!0).then(n,l)},l):l()}(d.list(!0)),e.promise}),d.gridApi=i},infiniteScrollDown:!0,enableColumnResizing:!0,exporterOlderExcelCompatibility:!0,exporterFieldCallback:function(e,t,i,n){return{name:!0,addr:!0,title:!0,time:!0}[i.field]?'="'+(n||"")+'"':n}},d.groupmode?(d.gridOptions.columnDefs=[{displayName:"",name:"$index",type:"number",width:50,minWidth:50,enableColumnMenu:!1,exporterSuppressExport:!0,headerCellClass:"text-center",headerCellTemplate:'<div class="ui-grid-cell-contents">序号</div>',cellClass:"text-center",cellTemplate:'<div class="ui-grid-cell-contents" ng-bind="grid.renderContainers.body.visibleRowCache.indexOf(row)+1"></div>'},{displayName:"项目名称",name:"name",width:"*",minWidth:260,enableColumnMenu:!1,enableSorting:!1,cellTemplate:'<div class="ui-grid-cell-contents"><a target="_blank" ng-href="/dashboard{{row.entity.id}}/control" ng-bind="COL_FIELD"></a></div>'},{displayName:"单位面积能耗",name:"uaec",width:"*",minWidth:120,headerCellClass:"text-right",cellClass:"text-right"},{displayName:"节能等级",name:"ecslevel",width:"*",minWidth:120,headerCellClass:"text-right",cellClass:"text-right"},{displayName:"节能标准",name:"ecsdesc",width:"*",minWidth:150,headerCellClass:"text-right",cellClass:"text-right"}],l(function(){d.list()})):d.gridOptions.columnDefs=[{displayName:"",name:"$index",type:"number",width:50,minWidth:50,enableColumnMenu:!1,exporterSuppressExport:!0,headerCellClass:"text-center",headerCellTemplate:'<div class="ui-grid-cell-contents">序号</div>',cellClass:"text-center",cellTemplate:'<div class="ui-grid-cell-contents" ng-bind="grid.renderContainers.body.visibleRowCache.indexOf(row)+1"></div>'},{displayName:"设备标识",name:"addr",width:"*",minWidth:120},{displayName:"设备名称",name:"title",width:"*",minWidth:260,enableColumnMenu:!1,enableSorting:!1,cellTemplate:'<div class="ui-grid-cell-contents"><a href="javascript:void(0)" ng-click="grid.appScope.self.channeldetail(grid.appScope.self.curveModal=row.entity)" ng-bind="COL_FIELD"></a></div>'},{displayName:"通道名称",name:"channel",width:"*",minWidth:150,enableColumnMenu:!1,enableSorting:!1},{displayName:"能耗分类",name:"energycategory",width:"*",minWidth:120,enableColumnMenu:!1,enableSorting:!1},{displayName:"设备读数",name:"lastvalue",width:"*",minWidth:120,headerCellClass:"text-right",cellClass:"text-right",cellTemplate:'<div class="ui-grid-cell-contents"><a href="javascript:void(0)" ng-click="grid.appScope.self.channeldetail(grid.appScope.self.curveModal=row.entity)" ng-bind="COL_FIELD"></a></div>'},{displayName:"通讯时间",name:"time",width:"*",minWidth:120,headerCellClass:"text-right",cellClass:"text-right",cellTemplate:'<div class="ui-grid-cell-contents" ng-if="COL_FIELD">{{COL_FIELD*1|date:\'yyyy年MM月dd日 HH:mm:ss\'}}</div>'},{displayName:"状态",name:"status",width:"*",minWidth:120,enableColumnMenu:!1,enableSorting:!1,headerCellClass:"text-center",cellClass:"text-center",cellTemplate:function(){return['<div class="ui-grid-cell-contents">','<b ng-show="COL_FIELD===0" class="ng-hide" style="color:#16a085;">正常</b>','<b ng-show="COL_FIELD===1" class="ng-hide" style="color:#c0392b;">数据异常</b>','<b ng-show="COL_FIELD===2" class="ng-hide" style="color:#8e44ad;">通讯异常</b>',"</div>"].join("")}}],o&&i.device.type({project:o},function(e){d.deviceType=e.result,d.deviceType.length&&(d.deviceType.select=function(e){d.deviceType.selected=e,d.list()})(d.deviceType[0])}),o&&i.customer.info({project:o,onlynode:1},function(e){d.customer={core:{data:[]},conditionalselect:function(e,t){return"root"===e.id?d.customer.selected=void 0:d.customer.selected=e.id,d.list(),!0},plugins:["search","conditionalselect"]},function t(e,i){angular.forEach(e,function(e,n){e.parent=i,e.text=e.title,"#"===i&&0===n&&(e.state={selected:!0,opened:!0}),Object.keys(e.child).length?e.icon="glyphicon glyphicon-th-list":e.icon="glyphicon glyphicon-file",t(e.child,e.id),d.customer.core.data.push(e)})}(e.result,"#")}),d.list=function(e){return e&&d.gridOptions.paging&&d.gridOptions.paging.count<=d.gridOptions.paging.pageindex*d.gridOptions.paging.pagesize?void 0:d.groupmode?void i.business.projectdetail({time:n("date")(d.date,"yyyyMM"),project:EMAPP.Project.ids,level:d.level||void 0},function(e){angular.forEach(e=e.result,function(e,t){e.id=t,this.push(e)},e=[]),d.gridOptions.data=e}):i.business.monitor({devicetype:d.deviceType.selected.id,project:o,showexception:d.showException?1:0,groupby:"TREE",filter:d.customer&&d.customer.selected||void 0,pageindex:(e&&d.gridOptions.paging?d.gridOptions.paging.pageindex:0)+1,pagesize:100},function(t){return t=t.result[o]||{},angular.forEach(t.detail,function(e){this.push(e)},t.detail=[]),e?d.gridOptions.data=d.gridOptions.data.concat(t.detail||[]):(d.gridOptions.data=t.detail||[],d.gridOptions.data.length&&l(function(){d.gridApi.core.scrollTo(d.gridOptions.data[0],d.gridOptions.columnDefs[0])})),d.gridOptions.paging=t.paging,t}).$promise},c.bind("shown.bs.modal",function(){l(d.buildLine)}).bind("hidden.bs.modal",function(){delete d.curveModal,delete d.timeline}),d.date=n("date")(r,d.groupmode?"yyyy-MM":"yyyy-MM-dd"),s.bind("dp.change",function(e){e.oldDate&&l(d.list)}),p.bind("dp.change",function(e){e.oldDate&&l(d.channeldetail)}),d.timetype={DAY:"日",WEEK:"周",MONTH:"月",YEAR:"年"},d.timetype_current="DAY",d.timetypeChange=function(e){d.timetype_current=e,p.data("DateTimePicker").format({DAY:"YYYY-MM-DD",WEEK:"YYYY-MM-DD",MONTH:"YYYY-MM",YEAR:"YYYY"}[e]).viewMode({DAY:"days",WEEK:"days",MONTH:"months",YEAR:"years"}[e]).defaultDate(d.date),d.channeldetail()},d.lineType=function(e){d.curveModal.type=e,d.buildLine()},d.buildLine=function(){d.curveModal.enable&&(d.timeline={chart:{type:"spline"},title:!1,xAxis:{type:"datetime",categories:d.curveModal.categories,labels:{formatter:function(){return n("date")(this.value,{DAY:"H",WEEK:"M-dd",MONTH:"M-dd",YEAR:"yyyy-MM"}[d.timetype_current])}}},yAxis:{title:!1},tooltip:{xDateFormat:"%m月%d日",pointFormat:'{series.name}: <span style="color:{point.color};font-weight:700;">{point.y:.2f} '+d.curveModal.unit+"</span>"},series:[{name:d.curveModal.title,data:d.curveModal[d.curveModal.type]}]})},d.channeldetail=function(){d.curveModal.type=d.curveModal.type||"diff",d.curveModal.categories=[],d.curveModal.diff=[],d.curveModal.scale=[],d.curveModal.enable=!1,i.business.channeldetail({id:d.curveModal.id,timeformat:d.timetype_current,from:d.date.replace(/-/g,""),to:d.date.replace(/-/g,"")},function(e){e.result&&(angular.forEach(e.result.detail,function(e){d.curveModal.categories.push(e.timepoint),d.curveModal.diff.push(e.value),d.curveModal.scale.push(e.total)}),d.curveModal.enable=!0,d.curveModal.start=e.result.start,d.curveModal.unit=e.result.unit,c.hasClass("in")?d.buildLine():c.modal("show"))})},d}]);