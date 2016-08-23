EMAPP.templateCache.put('assets/html/login.html?rev=f86da396e5', '<div class="login-container"><div class="login-position text-center"><form class="login-form" ng-submit="self.login()" novalidate><div class="form-group"><img ng-src="assets/img/logo.png" title="智慧云能源用户平台" ng-if="!self.isBasic"> <img src="assets/img/logo_basic.png" title="柏诚智能云能源用户平台" ng-if="self.isBasic"></div><div class="form-group has-feedback"><input type="text" class="form-control login-field" ng-model="self.user" maxlength="50" placeholder="用户名"> <i class="form-control-feedback emweb web-card"></i></div><div class="form-group has-feedback"><input type="password" class="form-control login-field" ng-model="self.passwd" maxlength="18" placeholder="密码"> <i class="form-control-feedback emweb web-key"></i></div><div class="input-group show"><label class="checkbox pull-left" for="remember" role="button"><input type="checkbox" id="remember" checked="checked" ng-model="self.remember" data-toggle="checkbox"> 保存一个月</label><button type="submit" class="btn btn-primary pull-right">登录 <i class="emweb web-login"></i></button></div></form></div></div>');

angular.module('EMAPP').controller('EMAPP.login', ["$state", "$stateParams", "$api", "$cookies", "md5", "SweetAlert", function($state, $stateParams, $api, $cookies, md5, SweetAlert) {

    $(':checkbox').radiocheck();

    var self = this,
        remember,
        action = $stateParams.action || 'logout',
        domain = /cloudenergy\.me/.test(location.hostname) ? '.cloudenergy.me' : location.hostname,
        //登录验证
        validate = function(data) {

            //错误代码提示
            (function(code, message) {
                code && angular.forEach(EMAPP.ErrorCode, function(val, key) {
                    if (parseInt(code) === parseInt(key)) {
                        message = val;
                    }
                });
                message && SweetAlert.error.apply(SweetAlert, angular.isArray(message) ? message : [message]);
            }(data.code || data.err, data.message));

            //赋值到User对象中
            EMAPP.User = data && data.result || EMAPP.User || {};
            //写入cookie
            angular.forEach(['token', 'user'], function(key) {
                EMAPP.User[key] && $cookies.put(key, EMAPP.User[key] || false, {
                    path: '/',
                    domain: domain,
                    expires: remember && moment().add(1, 'months')._d || undefined
                });
            });
            if (EMAPP.User.token) {
                $state.go($state.prev.state || 'dashboard.main', EMAPP.User.groupuser && $state.prev.params || {});
            } else {
                $state.go('auth', {
                    action: 'login'
                });
            }

        };

    delete sessionStorage.projectid;

    self.isBasic = /^basic\./.test(location.host);

    //登录
    self.login = function() {

        var user = this && this.user,
            passwd = this && this.passwd,
            msg = [];
        remember = self.remember;
        !user && msg.push('帐号');
        !passwd && msg.push('密码');

        msg = msg.join('与');
        msg && SweetAlert.warning('请输入您的' + msg);

        !msg && $api.auth.login({
            user: user,
            passwd: md5.createHash(passwd).toUpperCase()
        }, validate, function(result) {
            validate(result.data);
        });

    };

    //注销
    self.logout = function() {
        $api.auth.logout({
            redirect: '/'
        }, function() {

            EMAPP.User = {};

            angular.forEach(['token', 'user'], function(key) {
                $cookies.remove(key, {
                    path: '/'
                });
                $cookies.remove(key, {
                    path: '/',
                    domain: domain
                });
                $cookies.remove(key, {
                    path: '/',
                    domain: '.www' + domain
                });
            });

            $state.go('auth', {
                action: 'login'
            });

        });
    };

    action === 'logout' && self.logout();

}]);