let configAppUsed = {
    chart: {
        type: 'column',
        // backgroundColor:'#e3f2fd'
    },
    credits: {
        enabled: false
    },
    title: {
        text: '',
        style: {
            color: '#0d47a1'
        }
    },
    subtitle: {
        text: '',
        style: {
            color: '#0d47a1'
        }
    },
    xAxis: {
        categories: [],
        labels: {
            style: {
                color: '#0d47a1'
            }
        }
    },
    tooltip: {
        // valueDecimals: 3
    },
    yAxis: {
        allowDecimals: false,
        title: {
            text: ''
        },
        labels: {
            style: {
                color: '#0d47a1',
            },
            formatter: function () {
                return this.value + '';
            }
        },
        gridLineWidth: 0.1,
        gridLineColor: '#bbdefb',
        gridLineDashStyle: 'longdash'

    },
    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                color: '#000000',
                inside: false,
                format: '{point.y}'
            },
            animation: {
                duration: 2000
            }
        },
        bar: {
            depth: 75
        }
    },
    colors: ['#01579b'],
    series: [],
};

export {
    configAppUsed
}