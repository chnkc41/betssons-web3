import { Component, Host, Prop, State, h } from '@stencil/core';
import ApexCharts from 'apexcharts';

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
      data: [31, 40, 28, 51, 42, 109, 100]
    },
    {
      name: 'PRODUCT B',
      data: [11, 32, 45, 32, 34, 52, 41]
    }
  ];

  connectedCallback() {
    console.log('this.series');
    console.log(this.series);
  }

  componentDidLoad() {
    console.log(this.first);
    console.log(this.series);

    let options = {
      series: this.series,
      color: ['#6ab04c', '#2980b9'],
      chart: {
        background: 'transparent',
        type: 'area', //bar, line 
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
          color: '#263238',
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

    this.addElement("div", "chart")

    let chart = new ApexCharts(document.querySelector('#chart'), options);

    return chart.render();
  } 


  addElement(element, id) {
    // create a new div element
    const newDiv = document.createElement(element);
    newDiv.setAttribute("id", id); 
    newDiv.setAttribute("class", "card full-height sm:p-7"); 
    
    const currentDiv = document.getElementById("chart1");
    document.body.insertBefore(newDiv, currentDiv);
  }

  render() {
    return (
      <div class="" id="chart1">
         
      </div>
    );
  }
}
