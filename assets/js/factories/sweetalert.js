/*  sweetalert  */
angular.module('EMAPP').factory('SweetAlert', function() {
    return {
        swal: function() {
            return (window.swal || angular.noop).apply(window.swal || this, arguments);
        },
        success: function(title, message) {
            return this.swal(title, message, 'success');
        },
        error: function(title, message) {
            return this.swal(title, message, 'error');
        },
        warning: function(title, message) {
            return this.swal(title, message, 'warning');
        },
        info: function(title, message) {
            return this.swal(title, message, 'info');
        }
    };
});