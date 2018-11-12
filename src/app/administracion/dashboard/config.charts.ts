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
            color: '#00796b'
        }
    },
    subtitle: {
        text: '',
        style: {
            color: '#00796b'
        }
    },
    xAxis: {
        categories: [],
        labels: {
            style: {
                color: '#00796b'
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
                color: '#00796b',
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
    colors: ['#00796b'],
    series: [],
};

let configByTurn = {
    chart: {
        height: null,
        type: 'column',
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
            color: '#b71c1c'
        }
    },
    subtitle: {
        text: '',
        style: {
            color: '#b71c1c'
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
        gridLineColor: '#e57373',
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
    colors: ['#ef5350'],
    series: [],
};


export {
    configAppUsed,
    configByTurn,
    configAppUsedGral
}