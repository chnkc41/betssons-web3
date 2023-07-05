import { Component, Host, Prop, State, h } from '@stencil/core'; 

@Component({
  tag: 'stacked-chart',
  styleUrl: 'stacked-chart.css',
  shadow: true,
})
export class StackedChart {
  @Prop() first: string = '';
  @Prop() series: any[] = [
    {
      name: 'PRODUCT A',
      data: [31, 40, 28, 51, 42, 109, 100,  28, 51],
    },
    {
      name: 'PRODUCT B',
      data: [11, 32, 45, 32, 34, 52, 41, 45, 32],
    },
    {
      name: 'PRODUCT C',
      data: [11, 32, 45, 32, 34, 52, 41, 45, 32],
    },
  ];

  @Prop() options: any = {
    series: this.series,
    color: ['#6ab04c', '#2980b9'],
    chart: {
      background: 'transparent',
      type: 'line', //bar, line
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
            },
          },
        },
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    },
    legend: {
      position: 'top',
    },
    grid: {
      show: true,
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
        color: '#263238', // '#263238',
      },
    },
    // annotations: {
    //   yaxis: [
    //     {
    //       y: 60,
    //       borderColor: '#F00',
    //       label: {
    //         borderColor: '#F00',
    //         style: {
    //           color: '#fff',
    //           background: '#F00',
    //         },
    //         text: 'Target',
    //       },
    //     },
    //   ],
    // },
  };

  render() {
    return (
      <div>
        <apex-chart
          type="bar"
          series={this.series}
          options={this.options}
        />
      </div>
    );
  }
}
