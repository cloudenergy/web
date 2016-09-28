EMAPP.templateCache.put('assets/html/login.html?rev=b288df85ce', '<div class="login-container"><div class="login-position text-center"><form class="login-form" name="loginForm" ng-submit="self.login()" login-form><div class="form-group"><img ng-src="assets/img/logo.png" title="智慧云能源用户平台" ng-if="!self.isBasic"> <img src="assets/img/logo_basic.png" title="柏诚智能云能源用户平台" ng-if="self.isBasic"></div><div class="form-group"><input type="text" class="form-control login-field" name="user" ng-model="self.user" maxlength="50" placeholder="账号/用户名" required><label class="login-field-icon fui-user"></label><span class="form-control-feedback"><a href="javascript:void(0)" class="fui-cross text-muted" ng-if="loginForm.user.$viewValue" ng-click="self.clearUserInput()"></a> <i class="fui-question-circle text-warning" ng-if="loginForm.user.$dirty&&loginForm.user.$error.required"></i></span></div><div class="form-group"><input type="password" class="form-control login-field" name="password" ng-model="self.passwd" maxlength="18" placeholder="密码" readonly="readonly" required><label class="login-field-icon fui-lock"></label><span class="form-control-feedback"><a href="javascript:void(0)" class="fui-cross text-muted" ng-if="loginForm.password.$viewValue" ng-click="self.clearPasswdInput()"></a> <i class="fui-question-circle text-warning" ng-if="loginForm.password.$dirty&&loginForm.password.$error.required"></i></span></div><div class="input-group show"><label class="checkbox pull-left" role="button"><input type="checkbox" name="remember" ng-model="self.remember" data-toggle="checkbox"> 一个月免登录</label><button type="submit" class="btn btn-primary pull-right">登录 <i class="fui-exit"></i></button></div></form></div></div>');

angular.module('EMAPP').controller('EMAPP.login', ["$state", "$stateParams", "$api", "$cookies", "md5", "SweetAlert", function ($state, $stateParams, $api, $cookies, md5, SweetAlert) {

    var self = this,
        remember,
        action = $stateParams.action || 'logout',
        domain = /cloudenergy\.me/.test(location.hostname) ? '.cloudenergy.me' : location.hostname,
        //登录验证
        validate = function (data) {

            //错误代码提示
            (function (code, message) {
                code && angular.forEach({
                    20000001: '用户不存在',
                    90000001: '服务器错误',
                    90000002: '拒绝访问',
                    90000003: '登录失败',
                    90000004: '权限不足',
                    90000005: '未登录',
                    90000006: ['验证失败', '账号或密码有误'],
                    90000007: '签名校验失败'
                }, function (val, key) {
                    if (parseInt(code) === parseInt(key)) {
                        message = val;
                    }
                });
                message && SweetAlert.error.apply(SweetAlert, angular.isArray(message) ? message : [message]);
            }(data.code || data.err, data.message));

            //赋值到User对象中
            EMAPP.User = data && data.result || EMAPP.User || {};
            EMAPP.User.groupmode = EMAPP.User.groupuser;

            //写入cookie
            angular.forEach(['token', 'user'], function (key) {
                EMAPP.User[key] && $cookies.put(key, EMAPP.User[key] || false, {
                    path: '/',
                    domain: domain,
                    expires: remember && moment().add(1, 'months')._d || undefined
                });
            });

            if (EMAPP.User.token) {
                $state.go($state.prev.state || 'dashboard.main', EMAPP.User.groupmode && $state.prev.params || {});
            } else {
                $state.go('auth', {
                    action: 'login'
                });
            }

        };

    self.isBasic = /^basic\./.test(location.host);

    //输入框
    self.user = localStorage.loginUser;
    self.passwd = localStorage.loginPasswd;
    self.remember = !!localStorage.loginRemember;
    self.clearUserInput = function () {
        delete localStorage.loginUser;
        delete self.user;
        delete localStorage.loginPasswd;
        delete self.passwd;
        delete localStorage.loginRemember;
        delete self.remember;
    };
    self.clearPasswdInput = function () {
        delete localStorage.loginPasswd;
        delete self.passwd;
        delete localStorage.loginRemember;
        delete self.remember;
    };

    //登录
    self.login = function () {

        var user = this && this.user,
            passwd = this && this.passwd,
            msg = [];
        remember = self.remember;
        !user && msg.push('账号/用户名');
        !passwd && msg.push('密码');

        msg = msg.join('与');
        if (msg) {
            SweetAlert.warning('请输入您的' + msg);
        } else {
            delete localStorage.loginUser;
            delete localStorage.loginPasswd;
            delete localStorage.loginRemember;
            //存储登录参数
            localStorage.loginUser = self.user;
            if (self.remember) {
                localStorage.loginPasswd = self.passwd;
                localStorage.loginRemember = self.remember;
            }
        }

        !msg && $api.auth.login({
            user: user,
            passwd: md5.createHash(passwd).toUpperCase()
        }, validate, function (result) {
            validate(result.data);
        });

    };

    //注销
    self.logout = function () {
        $api.auth.logout({
            redirect: '/'
        }, function () {

            EMAPP.User = {};

            angular.forEach(['token', 'user'], function (key) {
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

}]).directive('loginForm', ["$timeout", function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            //input user
            element.find('input[name=user]').on('invalid', function () {
                $timeout(scope.loginForm.user.$setDirty);
                return false;
            });

            //input password
            element.find('input[name=password]').on('invalid', function () {
                $timeout(scope.loginForm.password.$setDirty);
                return false;
            });
            $timeout(function () {
                element.find('input[name=password]').removeAttr('readonly');
            }, 500);

            //input remember
            element.find('input[name=remember]').radiocheck();

        }
    };
}]);