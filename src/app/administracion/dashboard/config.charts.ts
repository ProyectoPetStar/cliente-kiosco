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

let configAppUsedGral = {
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
            color: '#43a047'
        }
    },
    subtitle: {
        text: '',
        style: {
            color: '#43a047'
        }
    },
    xAxis: {
        categories: [],
        labels: {
            style: {
                color: '#43a047'
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
                color: '#43a047',
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
    colors: ['#43a047'],
    series: [],
};

let configByTurn = {
    chart: {
        height: null,
        type: 'line',
        borderWidth: 0,
        borderRadius: 0,
        plotBackgroundColor: null,
        plotShadow: false,
        plotBorderWidth: 0,
        options3d: {
            enabled: false,
            alpha: 10,
            beta: 2,
            depth: 95
        }
    },
    exporting: {
        enabled: true
    },
    credits: {
        enabled: false
    },
    title: {
        text: '',
        style: {
            color: '#156ab1'
        }
    },
    subtitle: {
        text: '',
        style: {
            color: '#156ab1'
        }
    },
    xAxis: {
        categories: [],
        labels: {
            style: {
                color: '#000'
            }
        }
    },
    yAxis: {
        allowDecimals: false,
        title: {
            text: ''
        },
        labels: {
            style: {
                color: '#000',
            },
            formatter: function () {
                return this.value + '';
            }
        },
        gridLineWidth: .5,
        gridLineColor: '#4987BB',
        gridLineDashStyle: 'dot'

    },
    tooltip: {
        //valueDecimals: 3
    },
    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                color: '#000',
                inside: false,
                y: 0,
                distance: -10,
                format: '{y}',
                style: {
                    fontWeight: 'bold',
                    color: '#000',
                    textOutline: '1px',
                    fontSize: '10px'
                }
            }
        },
        bar: {
            depth: 75
        }
    },
    colors: ['#156ab1'],
    series: [],
};


export {
    configAppUsed,
    configByTurn,
    configAppUsedGral
}