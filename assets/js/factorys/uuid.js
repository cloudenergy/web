/*  uuid  */
angular.module('EMAPP').factory('uuid', function() {
    return function(len, radix) {

        var uuid = [],
            i,
            num,
            chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        radix = radix || chars.length;

        if (len) {
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
        } else {
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-',
                uuid[14] = '4';
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    num = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (num & 0x3) | 0x8 : num];
                }
            }
        }

        return uuid.join('')

    }
});