"use strict";!function(e,t){angular.module("EMAPP").config(["$httpProvider",function(t){t.interceptors.push(["$q","$location","SweetAlert",function(t,r,n){var o=function(o){return e--,o.data&&(90000005===o.data.code?r.url("/dashboard/auth/logout").replace():o.data.message&&n[200===o.status?"success":"error"](o.data.message)),200===o.status?o:t.reject(o)};return{request:function(t){return t.url&&/\/api\//i.test(t.url)&&t.method&&(delete(t.data||t.params||{})._api_action,t.url=decodeURIComponent(t.url)),e++,t},requestError:function(e){return t.reject(e)},response:o,responseError:o}}])}]).directive("preloader",["$timeout",function(r){return{restrict:"A",scope:!0,link:function(n){n.$watch(function(){return e},function(e){t&&r.cancel(t),0===e?t=r(function(){n.preloader=e},500):n.preloader=e})}}}])}(0);