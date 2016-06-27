EMAPP.templateCache.put("dist/html/project/statistic.html?rev=24d7cb99f0",'<div class="app-view-project-statistic"><ul class="nav nav-tabs ng-cloak"><li ng-repeat="(key,name) in self.tabs" ng-class="{active:self.tabActive===key}"><a ui-sref="{tab:key}" ng-bind="name"></a></li><li class="pull-right form-inline"><div class="form-group form-group-sm has-feedback date"><input type="text" class="form-control" id="start_date" ng-model="self.startDate" datetimepicker data-link-right="#end_date"> <i class="emweb web-calendar form-control-feedback"></i></div><div class="input-group" ng-show="self.tabActive!==\'dailyreport\'">至</div><div class="form-group form-group-sm has-feedback date" ng-show="self.tabActive!==\'dailyreport\'"><input type="text" class="form-control" id="end_date" ng-model="self.endDate" datetimepicker data-use-current="false" data-link-left="#start_date"> <i class="emweb web-calendar form-control-feedback"></i></div><div class="input-group" ng-if="!self.groupmode"><div class="btn-group btn-group-sm"><button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown"><span ng-bind="self.energyData.selected.title||\'全部\'">全部</span> <span class="caret"></span></button><ul class="dropdown-menu"><li ng-class="{active:!self.energyData.selected}" ng-click="self.energyData.selected=null;"><a href="javascript:void(0)">全部</a></li><li ng-repeat="item in self.energyData" ng-class="{active:self.energyData.selected.id===item.id}" ng-click="self.energyData.selected=item;"><a href="javascript:void(0)" ng-bind="item.title"></a></li></ul></div></div><div class="input-group btn-group-sm"><button type="button" class="btn btn-success" ng-click="self.report(self.tabActive);"><i class="emweb web-search"></i> 查询</button></div><div class="input-group btn-group-sm">&nbsp;</div><div class="input-group btn-group-sm">&nbsp;</div><div class="input-group btn-group btn-group-sm ng-hide" ng-show="self.tabActive===\'monthlyreport\'||self.tabActive===\'dailyreport\'"><a class="btn btn-info" href="javascript:void(0)" ng-class="{active:self.grid_timetype_current===\'usage\'}" ng-click="self.grid_timetype(\'usage\')">用量 <i class="emweb web-curve-area"></i> </a><a class="btn btn-info" href="javascript:void(0)" ng-class="{active:self.grid_timetype_current===\'scale\'}" ng-click="self.grid_timetype(\'scale\')">刻度 <i class="emweb web-line-spacing"></i></a></div><div class="input-group btn-group-sm"><button type="button" class="btn btn-info" ng-click="self.filter()">筛选<i class="emweb web-filter"></i></button></div><div class="input-group btn-group-sm"><button type="button" class="btn btn-info" ng-click="self.export()">导出<i class="emweb web-export-excel"></i></button></div></li></ul><div class="tab-content ng-cloak"><div class="tab-pane subContent active" auto-height ui-i18n="\'zh-cn\'" id="report"><div ui-grid="self.gridOptions" class="grid" ui-grid-auto-resize ui-grid-exporter ui-grid-move-columns ui-grid-resize-columns></div></div></div></div>'),angular.module("EMAPP").controller("project.statistic",["$api","$filter","$timeout","$stateParams","uiGridConstants",function(e,t,a,i,r){var n=this,l=new Date,d=EMAPP.Project.current&&EMAPP.Project.current._id,s=$("#start_date"),o=$("#end_date");return n.groupmode=EMAPP.User.groupmode,s.bind("dp.change",function(e){e.date&&a(function(){if("monthlyreport"===n.tabActive){var a=new Date(Math.min(angular.copy(e.date._d).setDate(e.date.date()+31),l.valueOf())),i=new Date(n.endDate.replace(/\-/g,"/"));i>a&&(o.data("DateTimePicker").clear(),s.data("DateTimePicker").maxDate(a),n.endDate=t("date")(a,"yyyy-MM-dd"))}})}),o.bind("dp.change",function(e){e.date&&a(function(){if("monthlyreport"===n.tabActive){var a=new Date(angular.copy(e.date._d).setDate(e.date.date()-31)),i=new Date(n.startDate.replace(/\-/g,"/"));a>i&&(s.data("DateTimePicker").clear(),o.data("DateTimePicker").minDate(a),n.startDate=t("date")(a,"yyyy-MM-dd"))}})}),!n.groupmode&&e.energy.info({project:EMAPP.Project.ids},function(e){angular.forEach(e.result.energy||{},function(e){this.push(e)},n.energyData=[])}),n.filter=function(){n.gridOptions.enableFiltering=!n.gridOptions.enableFiltering,n.gridApi.core.notifyDataChange(r.dataChange.COLUMN)},n["export"]=function(){switch(n.tabActive){case"settlereport":case"monthlyreport":case"projectreport":n.gridOptions.exporterCsvFilename=EMAPP.title+"_统计_"+n.tabs[n.tabActive]+"_"+n.startDate.replace(/\-/g,"")+"_"+n.endDate.replace(/\-/g,"")+".csv";break;case"dailyreport":n.gridOptions.exporterCsvFilename=EMAPP.title+"_统计_"+n.tabs[n.tabActive]+"_"+n.startDate.replace(/\-/g,"")+".csv"}n.gridApi.exporter.csvExport("visible","visible",angular.element(document.querySelectorAll(".subContent")))},(n.grid_timetype=function(e){n.grid_timetype_current=e,n.rebuildData&&n.rebuildData(n.gridOptions.data)})("usage"),n.rebuildData=function(e){"settlereport"===n.tabActive&&angular.forEach(e,function(e){e.min=Math.round(100*e.min)/100,e.max=Math.round(100*e.max)/100,e.sum=Math.round(100*e.sum)/100}),"monthlyreport"===n.tabActive&&angular.forEach(e,function(e){e.monthlySum=Math.round(100*e.monthlySum)/100,angular.forEach(e[n.grid_timetype_current],function(a,i){e["day"+t("date")(i,"yyyyMMdd")]=Math.round(100*a)/100})}),"dailyreport"===n.tabActive&&angular.forEach(e,function(e){e.dailysum=Math.round(100*e.dailysum)/100,angular.forEach(e[n.grid_timetype_current],function(a,i){e["hour"+t("date")(i,"H")]=Math.round(100*a)/100})}),n.gridOptions.data=e},n.gridOptions={onRegisterApi:function(e){n.gridApi=e},rowHeight:34,enableColumnResizing:!0,exporterOlderExcelCompatibility:!0,exporterFieldCallback:function(e,t,a,i){return{name:!0,"id.substr(12,12)":!0,"channeldid.substr(12,12)":!0}[a.field]?'="'+(i||"")+'"':i}},n.tabs=n.groupmode?{projectreport:"项目总用能"}:{settlereport:"结算报表",monthlyreport:"月报表",dailyreport:"日报表"},n.tabClick=function(e){n.startDate=t("date")(l,"dailyreport"===e?"yyyy-MM-dd":"yyyy-MM-01"),n.endDate=t("date")(l,"yyyy-MM-dd"),n.tabActive=e,n.report(e)},n.report=function(a){var i=n.energyData&&n.energyData.selected&&n.energyData.selected.id,r={project:[]};switch(angular.forEach(EMAPP.Project,function(e){r.project.push({id:e._id,energy:i||void 0})}),a){case"settlereport":case"monthlyreport":case"projectreport":r.from=n.startDate.replace(/\-/g,""),r.to=n.endDate.replace(/\-/g,"");break;case"dailyreport":r.time=n.startDate.replace(/\-/g,"")}switch(a){case"settlereport":n.gridOptions.columnDefs=[{displayName:"",name:"$index",type:"number",width:50,minWidth:50,enableColumnMenu:!1,exporterSuppressExport:!0,headerCellClass:"text-center",headerCellTemplate:'<div class="ui-grid-cell-contents">序号</div>',cellClass:"text-center",cellTemplate:'<div class="ui-grid-cell-contents" ng-bind="grid.renderContainers.body.visibleRowCache.indexOf(row)+1"></div>'},{displayName:"传感器名称",name:"name",width:"*",minWidth:260},{displayName:"设备ID",name:"id.substr(12,12)",type:"number",width:"*",minWidth:120},{displayName:"设备编码",name:"tag",width:"*",minWidth:160,enableColumnMenu:!1},{displayName:"能耗分类",name:"energy",width:"*",minWidth:100},{displayName:n.startDate,name:"min",type:"number",width:"*",minWidth:100,headerCellClass:"text-right",cellClass:"text-right"},{displayName:n.endDate,name:"max",type:"number",width:"*",minWidth:100,headerCellClass:"text-right",cellClass:"text-right"},{displayName:"能耗总值",name:"sum",type:"number",width:"*",minWidth:100,headerCellClass:"text-right",cellClass:"text-right"},{displayName:"单价",name:"price",type:"number",width:"*",minWidth:100,headerCellClass:"text-right",cellClass:"text-right"},{displayName:"费用",name:"cost",type:"number",width:"*",minWidth:100,headerCellClass:"text-right",cellClass:"text-right"}];break;case"monthlyreport":n.gridOptions.columnDefs=[{displayName:"",name:"$index",type:"number",width:50,minWidth:50,enableColumnMenu:!1,exporterSuppressExport:!0,headerCellClass:"text-center",headerCellTemplate:'<div class="ui-grid-cell-contents">序号</div>',cellClass:"text-center",cellTemplate:'<div class="ui-grid-cell-contents" ng-bind="grid.renderContainers.body.visibleRowCache.indexOf(row)+1"></div>'},{displayName:"传感器名称",name:"name",width:"*",minWidth:260},{displayName:"设备ID",type:"number",name:"channeldid.substr(12,12)",width:"*",minWidth:120},{displayName:"设备编码",name:"tag",width:"*",minWidth:160,enableColumnMenu:!1},{displayName:"能耗分类",name:"energy",width:"*",minWidth:100},{displayName:"月能耗",type:"number",name:"monthlySum",width:"*",minWidth:100,headerCellClass:"text-right",cellClass:"text-right"},{displayName:"日平均",type:"number",name:"dailyAvg",width:"*",minWidth:100,headerCellClass:"text-right",cellClass:"text-right"}];break;case"dailyreport":n.gridOptions.columnDefs=[{displayName:"",name:"$index",type:"number",width:50,minWidth:50,enableColumnMenu:!1,exporterSuppressExport:!0,headerCellClass:"text-center",headerCellTemplate:'<div class="ui-grid-cell-contents">序号</div>',cellClass:"text-center",cellTemplate:'<div class="ui-grid-cell-contents" ng-bind="grid.renderContainers.body.visibleRowCache.indexOf(row)+1"></div>'},{displayName:"传感器名称",name:"name",width:"*",minWidth:260},{displayName:"设备ID",type:"number",name:"channeldid.substr(12,12)",width:"*",minWidth:120},{displayName:"设备编码",name:"tag",width:"*",minWidth:160,enableColumnMenu:!1},{displayName:"能耗分类",name:"energy",width:"*",minWidth:100},{displayName:"日能耗",type:"number",name:"dailysum",width:"*",minWidth:100,headerCellClass:"text-right",cellClass:"text-right"}];break;case"projectreport":n.gridOptions.columnDefs=[{displayName:"",name:"$index",type:"number",width:50,minWidth:50,enableColumnMenu:!1,exporterSuppressExport:!0,headerCellClass:"text-center",headerCellTemplate:'<div class="ui-grid-cell-contents">序号</div>',cellClass:"text-center",cellTemplate:'<div class="ui-grid-cell-contents" ng-bind="grid.renderContainers.body.visibleRowCache.indexOf(row)+1"></div>'},{displayName:"项目名称",name:"name",width:"*",minWidth:260},{displayName:"总用能",type:"number",name:"consumption",width:"*",minWidth:160,headerCellClass:"text-right",cellClass:"text-right"},{displayName:"总费用",type:"number",name:"cost",width:"*",minWidth:160,headerCellClass:"text-right",cellClass:"text-right"},{displayName:"单位用能",type:"number",name:"uaec",width:"*",minWidth:160,headerCellClass:"text-right",cellClass:"text-right"},{displayName:"单位电能",type:"number",name:"uaeec",width:"*",minWidth:160,headerCellClass:"text-right",cellClass:"text-right"}]}e.business[a](r,function(e){switch(a){case"settlereport":e=e.result[d]||[];break;case"monthlyreport":e=e.result[d]||[],e.length&&angular.forEach(e[0].usage,function(e,a){this.push({displayName:t("date")(a,"yyyy-M-d"),name:"day"+t("date")(a,"yyyyMMdd"),width:"*",minWidth:110,headerCellClass:"text-right",cellClass:"text-right"})},n.gridOptions.columnDefs);break;case"dailyreport":e=e.result[d]||[],e.length&&angular.forEach(e[0].usage,function(e,a){a=t("date")(a,"H"),this.push({displayName:a+"时",name:"hour"+a,width:"*",minWidth:100,headerCellClass:"text-right",cellClass:"text-right"})},n.gridOptions.columnDefs);break;case"projectreport":angular.forEach(e.result,function(e){angular.forEach(e,function(t,a){e[a]="name"===a?t:Math.round(100*t)/100}),this.push(e)},e=[])}n.rebuildData(e)})},n.tabClick(n.groupmode?"projectreport":i.tab||"settlereport"),n}]);