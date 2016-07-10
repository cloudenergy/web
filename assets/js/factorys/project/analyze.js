angular.module('EMAPP').factory('analyzePieOptions', function() {
    return function(now, yoy) {

        var percent = Math.max(-100, Math.round(100, (now - yoy) / yoy * 100 || 0)),
            data = [{
                // name: '',
                // color: '#7CB5EC',
                y: Math.abs(percent)
            }, {
                // name: '',
                // color: '#8085E9',
                y: 100 - Math.abs(percent)
            }];

        return {
            chart: {
                margin: [0, 0, 0, 0],
                style: {
                    textAlign: 'center'
                },
                type: 'pie'
            },
            title: {
                text: '<span style="' + (percent > 0 ? 'color:#e74c3c;' : 'color:#17bac1;') + '"><span style="font-size: 26px;">' + Math.abs(percent) + '</span><span style="font-size:14px;">%</span></span>',
                verticalAlign: 'middle',
                useHTML: true,
                y: 2
            },
            tooltip: false,
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: false,
                        color: '#000',
                        connectorColor: '#000',
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    },
                    innerSize: '80%'
                }
            },
            series: [{
                data: data
            }]
        };

    }
});