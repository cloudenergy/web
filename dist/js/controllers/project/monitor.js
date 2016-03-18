EMAPP.templateCache.put("dist/html/project/monitor.html?rev=67c80fb0b3",'<div class="app-view-project-monitor text-center ng-cloak"><div class="nav nav-tabs"><div ng-if="!self.groupmode" class="btn-group"><a href="javascript:void(0)" class="btn btn-sm btn-primary" ng-class="{active:self.energyData.selected.id===item.id}" ng-repeat="item in self.energyData" ng-click="self.energyData.select(item)" ng-bind="item.title"></a></div><div class="pull-right form-inline"><div ng-if="!self.groupmode" class="btn-group"><b style="vertical-align:middle">状态：</b><div class="bootstrap-switch-square"><input type="checkbox" flatui-switch flatui-switch-change="self.exceptionChange" ng-checked="self.showException" data-toggle="switch" data-on-color="warning" data-off-color="primary" data-on-text="异常" data-off-text="正常"></div></div><div ng-show="self.groupmode" class="form-group form-group-sm has-feedback date ng-hide"><input type="text" class="form-control" id="calendar" ng-model="self.date" data-format="YYYY-MM" datetimepicker> <i class="form-control-feedback em em-calendar"></i></div><div ng-if="self.groupmode" class="form-group form-group-sm"><select class="form-control select select-primary select-block" monitor-select><option value="">全部</option><option value="1">0-1.8 KWh</option><option value="2">1.8-3.8 KWh</option><option value="3">3.8-5.7 KWh</option><option value="4">5.7-7.7 KWh</option><option value="5">7.7-∞ KWh</option></select></div><div class="input-group btn-group-sm"><button type="button" class="btn btn-info" ng-click="self.filter()">筛选<i class="em em-filter"></i></button></div><div class="input-group btn-group-sm"><button type="button" class="btn btn-info" ng-click="self.export()">导出<i class="em em-export-excel"></i></button></div></div></div><div class="tab-content row"><div class="tab-pane active" ng-class="{true:\'col-xs-10\',false:\'col-xs-12\'}[!!self.showCustomer]" auto-height ui-i18n="\'zh-cn\'"><div ui-grid="self.gridOptions" class="grid text-left" ui-grid-exporter ui-grid-auto-resize ui-grid-move-columns ui-grid-resize-columns ui-grid-infinite-scroll></div></div><div class="tab-pane col-xs-2 text-left" ng-class="{active:self.showCustomer}" style="padding-left:0"><input type="text" class="form-control input-sm" placeholder="🔍关键字搜索" ng-model="self.jstreeSearch"><div auto-height jstree="self.jstree" jstree-search="self.jstreeSearch" style="overflow:auto"></div></div></div><div class="modal fade" id="curveModal"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span>&times;</span></button><h4 class="modal-title" ng-bind="self.curveModal.title"></h4></div><div class="modal-body"><div class="form-inline text-right"><div class="form-group form-group-sm has-feedback date"><input type="text" class="form-control" id="modalCalendar" ng-model="self.date" datetimepicker> <i class="form-control-feedback em em-calendar"></i></div><div class="btn-group btn-group-sm"><a class="btn btn-primary" href="javascript:void(0)" ng-repeat="(key,val) in self.timetype" ng-class="{active:self.timetype_current===key}" ng-click="self.timetypeChange(key)" ng-bind="val"></a></div><div class="btn-group btn-group-sm"><a class="btn btn-info" href="javascript:void(0)" ng-class="{active:self.curveModal.type===\'diff\'}" ng-click="self.lineType(\'diff\');">差值 <i class="em em-curve-area"></i></a> <a class="btn btn-info" href="javascript:void(0)" ng-class="{active:self.curveModal.type===\'scale\'}" ng-click="self.lineType(\'scale\');">刻度 <i class="em em-line-spacing"></i></a></div></div><div class="panel-body text-center"><div class="highcharts-panel" highcharts="self.timeline"></div></div></div></div></div></div></div>'),EMAPP.register.controller("project.monitor",["$scope","$q","$api","$filter","$timeout","uiGridConstants",function(e,t,i,n,a,l){var r=this,o=EMAPP.Project.current&&EMAPP.Project.current._id,d=new Date,s=$("#curveModal"),c=$("#calendar"),p=$("#modalCalendar");return r.groupmode=EMAPP.User.groupmode,r.showException=0,r.exceptionChange=function(e,t){r.showException=t,r.energyData.select(r.energyData.selected)},r.filter=function(){r.gridOptions.enableFiltering=!r.gridOptions.enableFiltering,r.gridApi.core.notifyDataChange(l.dataChange.COLUMN)},r["export"]=function(){r.groupmode?r.gridOptions.exporterCsvFilename=EMAPP.title+"_监控_"+r.date.replace(/\-/g,"")+".csv":r.gridOptions.exporterCsvFilename=EMAPP.title+"_监控_"+r.energyData.selected.title+"_"+n("date")(d,"yyyyMMddHHmmss")+".csv",r.gridApi.exporter.csvExport("visible","visible",angular.element(document.querySelectorAll(".subContent")))},r.gridOptions={onRegisterApi:function(i){i.infiniteScroll.on.needLoadMoreData(e,function(){var e=t.defer(),n=function(){e.resolve()},a=function(){i.infiniteScroll.dataLoaded(),e.reject()};return function(e){e?e.then(function(){i.infiniteScroll.saveScrollPercentage(),i.infiniteScroll.dataLoaded(!1,!0).then(n,a)},a):a()}(r.list(!0)),e.promise}),r.gridApi=i},infiniteScrollDown:!0,enableColumnResizing:!0,exporterOlderExcelCompatibility:!0,exporterFieldCallback:function(e,t,i,n){return'="'+n+'"'}},r.groupmode?(r.gridOptions.columnDefs=[{displayName:"",name:"$index",type:"number",width:50,minWidth:50,enableColumnMenu:!1,exporterSuppressExport:!0,headerCellClass:"text-center",headerCellTemplate:'<div class="ui-grid-cell-contents">序号</div>',cellClass:"text-center",cellTemplate:'<div class="ui-grid-cell-contents" ng-bind="grid.renderContainers.body.visibleRowCache.indexOf(row)+1"></div>'},{displayName:"项目名称",name:"name",width:"*",minWidth:260,enableColumnMenu:!1,enableSorting:!1,cellTemplate:'<div class="ui-grid-cell-contents"><a target="_blank" ng-href="/dashboard{{row.entity.id}}/control" ng-bind="COL_FIELD"></a></div>'},{displayName:"单位面积能耗",name:"uaec",width:"*",minWidth:120},{displayName:"节能等级",name:"ecslevel",width:"*",minWidth:120},{displayName:"节能标准",name:"ecsdesc",width:"*",minWidth:150}],a(function(){r.list()})):r.gridOptions.columnDefs=[{displayName:"",name:"$index",type:"number",width:50,minWidth:50,enableColumnMenu:!1,exporterSuppressExport:!0,headerCellClass:"text-center",headerCellTemplate:'<div class="ui-grid-cell-contents">序号</div>',cellClass:"text-center",cellTemplate:'<div class="ui-grid-cell-contents" ng-bind="grid.renderContainers.body.visibleRowCache.indexOf(row)+1"></div>'},{displayName:"设备标识",name:"addr",width:"*",minWidth:120},{displayName:"设备名称",name:"title",width:"*",minWidth:260,enableColumnMenu:!1,enableSorting:!1,cellTemplate:'<div class="ui-grid-cell-contents"><a href="javascript:void(0)" ng-click="grid.appScope.self.channeldetail(grid.appScope.self.curveModal=row.entity)" ng-bind="COL_FIELD"></a></div>'},{displayName:"通道名称",name:"channel",width:"*",minWidth:150,enableColumnMenu:!1,enableSorting:!1},{displayName:"能耗分类",name:"energycategory",width:"*",minWidth:120,enableColumnMenu:!1,enableSorting:!1},{displayName:"设备读数",name:"lastvalue",width:"*",minWidth:120,enableColumnMenu:!1,enableSorting:!1,cellTemplate:'<div class="ui-grid-cell-contents"><a href="javascript:void(0)" ng-click="grid.appScope.self.channeldetail(grid.appScope.self.curveModal=row.entity)" ng-bind="COL_FIELD"></a></div>'},{displayName:"通讯时间",name:"time",width:"*",minWidth:120,cellTemplate:'<div class="ui-grid-cell-contents" ng-if="COL_FIELD">{{COL_FIELD*1|date:\'yyyy/MM/dd HH:mm:ss\'}}</div>'},{displayName:"状态",name:"status",width:"*",minWidth:120,enableColumnMenu:!1,enableSorting:!1,headerCellClass:"text-center",cellClass:"text-center",cellTemplate:function(){return['<div class="ui-grid-cell-contents">','<b ng-show="COL_FIELD===0" class="ng-hide" style="color:#16a085;">正常</b>','<b ng-show="COL_FIELD===1" class="ng-hide" style="color:#c0392b;">数据异常</b>','<b ng-show="COL_FIELD===2" class="ng-hide" style="color:#8e44ad;">通讯异常</b>',"</div>"].join("")}}],o&&i.energy.info({project:o},function(e){angular.forEach(e.result.energy||{},function(e){this.push(e)},r.energyData=[]),r.energyData.length&&(r.energyData.select=function(e){r.energyData.selected=e,r.list()})(r.energyData[0])}),r.list=function(e){return e&&r.gridOptions.paging&&r.gridOptions.paging.count<=r.gridOptions.paging.pageindex*r.gridOptions.paging.pagesize?void 0:r.groupmode?i.business.projectdetail({time:n("date")(r.date,"yyyyMM"),project:EMAPP.Project.ids,level:r.level||void 0},function(t){return angular.forEach(t=t.result,function(e,t){e.id=t,this.push(e)},t=[]),e?r.gridOptions.data=r.gridOptions.data.concat(t):(r.gridOptions.data=t,r.gridOptions.data.length&&a(function(){r.gridApi.core.scrollTo(r.gridOptions.data[0],r.gridOptions.columnDefs[0])})),r.gridOptions.paging=t.paging,t}).$promise:i.business.monitor({energytype:r.energyData.selected.id,project:o,showexception:r.showException?1:0,pageindex:(e&&r.gridOptions.paging?r.gridOptions.paging.pageindex:0)+1,pagesize:100},function(t){return t=t.result[o]||{},angular.forEach(t.sensor,function(e){this.push(e)},t.detail=[]),e?r.gridOptions.data=r.gridOptions.data.concat(t.detail||[]):(r.gridOptions.data=t.detail||[],r.gridOptions.data.length&&a(function(){r.gridApi.core.scrollTo(r.gridOptions.data[0],r.gridOptions.columnDefs[0])})),r.gridOptions.paging=t.paging,t}).$promise},s.bind("shown.bs.modal",function(){a(r.buildLine)}).bind("hidden.bs.modal",function(){delete r.curveModal,delete r.timeline}),r.date=n("date")(d,r.groupmode?"yyyy-MM":"yyyy-MM-dd"),c.bind("dp.change",function(e){e.oldDate&&a(r.list)}),p.bind("dp.change",function(e){e.oldDate&&a(r.channeldetail)}),r.timetype={DAY:"日",WEEK:"周",MONTH:"月",YEAR:"年"},r.timetype_current="DAY",r.timetypeChange=function(e){r.timetype_current=e,p.data("DateTimePicker").format({DAY:"YYYY-MM-DD",WEEK:"YYYY-MM-DD",MONTH:"YYYY-MM",YEAR:"YYYY"}[e]).viewMode({DAY:"days",WEEK:"days",MONTH:"months",YEAR:"years"}[e]).defaultDate(r.date),r.channeldetail()},r.lineType=function(e){r.curveModal.type=e,r.buildLine()},r.buildLine=function(){r.curveModal.enable&&(r.timeline={chart:{type:"spline"},title:!1,xAxis:{type:"datetime",categories:r.curveModal.categories,labels:{formatter:function(){return n("date")(this.value,{DAY:"H",WEEK:"M-dd",MONTH:"M-dd",YEAR:"yyyy-MM"}[r.timetype_current])}}},yAxis:{title:!1},tooltip:{xDateFormat:"%m月%d日",pointFormat:'{series.name}: <span style="color:{point.color};font-weight:700;">{point.y:.2f} '+r.curveModal.unit+"</span>"},series:[{name:r.curveModal.title,data:r.curveModal[r.curveModal.type]}]})},r.channeldetail=function(){r.curveModal.type=r.curveModal.type||"diff",r.curveModal.categories=[],r.curveModal.diff=[],r.curveModal.scale=[],r.curveModal.enable=!1,i.business.channeldetail({id:r.curveModal.id,timeformat:r.timetype_current,from:r.date.replace(/-/g,""),to:r.date.replace(/-/g,"")},function(e){e.result&&(angular.forEach(e.result.detail,function(e){r.curveModal.categories.push(e.timepoint),r.curveModal.diff.push(e.value),r.curveModal.scale.push(e.total)}),r.curveModal.enable=!0,r.curveModal.start=e.result.start,r.curveModal.unit=e.result.unit,s.hasClass("in")?r.buildLine():s.modal("show"))})},r}]);