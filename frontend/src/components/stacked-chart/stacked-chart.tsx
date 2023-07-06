import { Component, Host, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'stacked-chart',
  styleUrl: 'stacked-chart.css',
  shadow: true,
})
export class StackedChart {
  @Prop() first: string = '';
  @Prop() chartSeries: any[] = [];

  @Prop() options: any = {
    color: ['#6ab04c', '#2980b9'],
    chart: {
      background: 'transparent',
      type: 'bar', //bar, line
      height: 350,
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: '13px',
              fontWeight: 900,
              color: localStorage.getItem('dark') ? '#ededed' : '',
            },
          },
        },
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      labels: {
        style: {
          colors: localStorage.getItem('dark') ? '#ededed' : [],
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: localStorage.getItem('dark') ? '#ededed' : [],
        },
      },
    },
    legend: {
      position: 'top',
      labels: {
        colors: localStorage.getItem('dark') ? '#ededed' : [],
        useSeriesColors: false,
      },
    },
    tooltip: {
      enabled: true,
      enabledOnSeries: undefined,
      shared: true,
      followCursor: false,
      intersect: false,
      inverseOrder: false,
      custom: undefined,
      fillSeriesColor: false,
      theme: 'dark',
      style: {
        fontSize: '12px',
        fontFamily: undefined,
        colors: localStorage.getItem('dark') ? '#ededed' : [],
      },
      fixed: {
        enabled: false,
        position: 'topRight',
        offsetX: 0,
        offsetY: 0,
      },
    },
    grid: {
      show: true,
    },
    fill: {
      opacity: 1,
    },
    title: {
      text: 'Total Production',
      align: 'left',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        //   fontFamily:  undefined,
        color: localStorage.getItem('dark') ? '#ededed' : '263238',
      },
    },
    annotations: {
      yaxis: [
        {
          y: 60,
          borderColor: '#F00',
          label: {
            borderColor: '#F00',
            style: {
              color: '#fff',
              background: '#F00',
            },
            text: 'Target',
          },
        },
      ],
    },
  };

  render() {
    return (
      <div>
        <apex-chart type="bar" series={this.chartSeries} options={this.options} />
      </div>
    );
  }
}
